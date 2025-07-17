import { createMachine } from 'xstate';

const gameStateMachine = createMachine({
  id: 'fateRPG',
  initial: 'mainMenu',
  context: {
    player: {
      aspects: [],
      fatePoints: 3,
      skills: {},
      health: 100,
      inventory: []
    },
    currentLocation: null,
    activeQuests: [],
    savedGames: [],
    difficulty: 'normal'
  },
  states: {
    mainMenu: {
      on: {
        NEW_GAME: 'characterCreation',
        LOAD_GAME: 'loadGame',
        SETTINGS: 'settings'
      }
    },
    characterCreation: {
      initial: 'selectBackground',
      states: {
        selectBackground: {
          on: { NEXT: 'defineAspects' }
        },
        defineAspects: {
          on: { 
            NEXT: 'assignSkills',
            BACK: 'selectBackground'
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
        BACK: 'mainMenu'
      }
    },
    gameplay: {
      id: 'gameplay',
      type: 'parallel',
      states: {
        gameMode: {
          initial: 'exploration',
          states: {
            exploration: {
              on: {
                ENTER_COMBAT: 'combat',
                START_DIALOGUE: 'dialogue',
                OPEN_MENU: 'menu'
              }
            },
            combat: {
              initial: 'turnStart',
              states: {
                turnStart: {
                  on: {
                    PLAYER_TURN: 'playerAction',
                    ENEMY_TURN: 'enemyAction'
                  }
                },
                playerAction: {
                  on: {
                    USE_FATE_POINT: {
                      target: 'playerAction',
                      actions: 'spendFatePoint'
                    },
                    ATTACK: 'resolveAction',
                    USE_SKILL: 'resolveAction'
                  }
                },
                enemyAction: {
                  on: {
                    ACTION_COMPLETE: 'resolveAction'
                  }
                },
                resolveAction: {
                  on: {
                    NEXT_TURN: 'turnStart',
                    COMBAT_END: '#gameplay.gameMode.exploration'
                  }
                }
              }
            },
            dialogue: {
              initial: 'conversation',
              states: {
                conversation: {
                  on: {
                    CHOOSE_OPTION: 'processResponse',
                    USE_FATE_POINT: {
                      target: 'conversation',
                      actions: 'spendFatePoint'
                    }
                  }
                },
                processResponse: {
                  on: {
                    CONTINUE: 'conversation',
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
                INVOKE_ASPECT: 'aspectActive',
                COMPEL_ASPECT: 'aspectCompelled'
              }
            },
            aspectActive: {
              after: {
                ASPECT_DURATION: 'idle'
              }
            },
            aspectCompelled: {
              on: {
                ACCEPT_COMPEL: {
                  target: 'idle',
                  actions: 'gainFatePoint'
                },
                REJECT_COMPEL: {
                  target: 'idle',
                  actions: 'spendFatePoint'
                }
              }
            }
          }
        }
      }
    }
  }
});