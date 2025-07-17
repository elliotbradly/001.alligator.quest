import { createMachine, assign } from 'xstate';

const gameStateMachine = createMachine({
  id: 'fateRPG',
  initial: 'mainMenu',
  context: {
    player: {
      aspects: [],
      fatePoints: 3,
      skills: {},
      health: 100,
      stamina: 100,
      inventory: [],
      cooldowns: {
        abilities: {},
        aspects: {},
        fatePointRefresh: 0
      }
    },
    gameTime: {
      inGameTime: 0, // in minutes
      dayNightCycle: 0, // 0-1440 minutes (24 hours)
      timeScale: 1, // time multiplier
      pausedAt: null
    },
    environment: {
      weather: 'clear',
      weatherDuration: 0,
      nextWeatherChange: 0
    },
    currentLocation: null,
    activeQuests: [],
    questTimers: {},
    savedGames: [],
    difficulty: 'normal'
  },
  states: {
    mainMenu: {
      on: {
        NEW_GAME: {
          target: 'characterCreation',
          actions: 'initializeGameTime'
        },
        LOAD_GAME: 'loadGame',
        SETTINGS: 'settings'
      }
    },
    characterCreation: {
      initial: 'selectBackground',
      states: {
        selectBackground: {
          after: {
            30000: 'suggestDefaultBackground' // Auto-suggest after 30 seconds
          },
          on: { 
            NEXT: 'defineAspects',
            USE_DEFAULT: 'defineAspects'
          }
        },
        suggestDefaultBackground: {
          on: {
            ACCEPT: 'defineAspects',
            DECLINE: 'selectBackground'
          }
        },
        defineAspects: {
          meta: {
            timeLimit: 300000 // 5 minute time limit for aspect definition
          },
          on: { 
            NEXT: 'assignSkills',
            BACK: 'selectBackground',
            TIMEOUT: {
              target: 'assignSkills',
              actions: 'assignDefaultAspects'
            }
          }
        },
        assignSkills: {
          on: {
            NEXT: 'reviewCharacter',
            BACK: 'defineAspects'
          }
        },
        reviewCharacter: {
          on: {
            CONFIRM: '#fateRPG.gameplay',
            BACK: 'assignSkills'
          }
        }
      }
    },
    loadGame: {
      on: {
        LOAD_SUCCESS: 'gameplay',
        LOAD_FAIL: 'mainMenu',
        BACK: 'mainMenu'
      }
    },
    settings: {
      on: {
        SAVE_SETTINGS: 'mainMenu',
        BACK: 'mainMenu',
        ADJUST_TIMESCALE: {
          actions: 'updateTimeScale'
        }
      }
    },
    gameplay: {
      id: 'gameplay',
      type: 'parallel',
      states: {
        timeSystem: {
          initial: 'running',
          states: {
            running: {
              invoke: {
                src: 'timeService',
                id: 'timekeeper'
              },
              on: {
                PAUSE: 'paused',
                UPDATE_TIME: {
                  actions: ['updateGameTime', 'checkTimedEvents']
                }
              }
            },
            paused: {
              on: {
                RESUME: 'running'
              }
            }
          }
        },
        gameMode: {
          initial: 'exploration',
          states: {
            exploration: {
              on: {
                ENTER_COMBAT: 'combat',
                START_DIALOGUE: 'dialogue',
                OPEN_MENU: 'menu',
                TIME_EVENT: {
                  actions: 'handleTimedEvent'
                }
              }
            },
            combat: {
              initial: 'preparation',
              states: {
                preparation: {
                  after: {
                    3000: 'turnStart' // 3 second combat prep time
                  }
                },
                turnStart: {
                  entry: 'updateCooldowns',
                  on: {
                    PLAYER_TURN: {
                      target: 'playerAction',
                      cond: 'isPlayerReady'
                    },
                    ENEMY_TURN: 'enemyAction'
                  }
                },
                playerAction: {
                  meta: {
                    turnTimeout: 30000 // 30 second turn timer
                  },
                  on: {
                    USE_FATE_POINT: {
                      target: 'playerAction',
                      actions: ['spendFatePoint', 'startCooldown'],
                      cond: 'canUseFatePoint'
                    },
                    ATTACK: {
                      target: 'resolveAction',
                      actions: 'startCooldown'
                    },
                    USE_SKILL: {
                      target: 'resolveAction',
                      actions: 'startCooldown',
                      cond: 'isSkillReady'
                    },
                    TURN_TIMEOUT: 'enemyAction'
                  }
                },
                enemyAction: {
                  after: {
                    2000: 'resolveAction' // 2 second enemy action time
                  }
                },
                resolveAction: {
                  after: {
                    1500: {
                      target: 'turnStart',
                      cond: 'isCombatActive'
                    }
                  },
                  on: {
                    COMBAT_END: '#gameplay.gameMode.exploration'
                  }
                }
              }
            },
            dialogue: {
              initial: 'conversation',
              states: {
                conversation: {
                  meta: {
                    responseTimeout: 20000 // 20 second response timer
                  },
                  on: {
                    CHOOSE_OPTION: 'processResponse',
                    USE_FATE_POINT: {
                      target: 'conversation',
                      actions: ['spendFatePoint', 'startCooldown'],
                      cond: 'canUseFatePoint'
                    },
                    RESPONSE_TIMEOUT: {
                      target: 'processResponse',
                      actions: 'chooseDefaultResponse'
                    }
                  }
                },
                processResponse: {
                  after: {
                    1000: {
                      target: 'conversation',
                      cond: 'isDialogueActive'
                    }
                  },
                  on: {
                    END_DIALOGUE: '#gameplay.gameMode.exploration'
                  }
                }
              }
            },
            menu: {
              on: {
                CLOSE_MENU: 'exploration',
                SAVE_GAME: {
                  target: 'exploration',
                  actions: 'saveGameState'
                },
                QUIT_TO_MAIN: '#fateRPG.mainMenu'
              }
            }
          }
        },
        aspectSystem: {
          initial: 'idle',
          states: {
            idle: {
              on: {
                INVOKE_ASPECT: {
                  target: 'aspectActive',
                  cond: 'isAspectReady'
                },
                COMPEL_ASPECT: 'aspectCompelled'
              }
            },
            aspectActive: {
              entry: 'startAspectTimer',
              exit: 'startAspectCooldown',
              on: {
                ASPECT_EXPIRE: 'idle'
              },
              after: {
                ASPECT_DURATION: 'idle'
              }
            },
            aspectCompelled: {
              meta: {
                decisionTime: 10000 // 10 second decision window
              },
              on: {
                ACCEPT_COMPEL: {
                  target: 'idle',
                  actions: ['gainFatePoint', 'startCompelCooldown']
                },
                REJECT_COMPEL: {
                  target: 'idle',
                  actions: ['spendFatePoint', 'startCompelCooldown']
                },
                DECISION_TIMEOUT: {
                  target: 'idle',
                  actions: 'autoAcceptCompel'
                }
              }
            }
          }
        },
        environmentSystem: {
          initial: 'active',
          states: {
            active: {
              on: {
                WEATHER_CHANGE: {
                  actions: ['updateWeather', 'scheduleNextWeatherChange']
                },
                DAY_NIGHT_TRANSITION: {
                  actions: ['updateLighting', 'updateNPCSchedules']
                }
              }
            }
          }
        }
      }
    }
  }
}, {
  guards: {
    isPlayerReady: (context) => !Object.values(context.player.cooldowns.abilities).some(cd => cd > 0),
    canUseFatePoint: (context) => context.player.fatePoints > 0 && context.player.cooldowns.fatePointRefresh <= 0,
    isSkillReady: (context, event) => context.player.cooldowns.abilities[event.skill] <= 0,
    isAspectReady: (context, event) => context.player.cooldowns.aspects[event.aspect] <= 0,
    isCombatActive: (context) => context.combat?.isActive,
    isDialogueActive: (context) => context.dialogue?.isActive
  },
  services: {
    timeService: (context) => (callback) => {
      const interval = setInterval(() => {
        callback('UPDATE_TIME');
      }, 1000 / context.gameTime.timeScale);
      
      return () => clearInterval(interval);
    }
  }
});