import { createMachine, assign } from 'xstate';

const gameStateMachine = createMachine({
  id: 'nightsBlackAgents',
  initial: 'mainMenu',
  context: {
    playerHealth: 100,
    vampireIntel: 0,
    suspicionLevel: 0,
    inventory: [],
    currentLocation: null,
    discoveredClues: [],
    contactNetwork: [],
    // Time-based context
    gameTime: 0, // In minutes since game start
    daysPassed: 0,
    currentHour: 20, // 24-hour format
    timeScale: 1, // For time manipulation abilities
    missionTimeRemaining: null,
    lastVampireFeed: 0, // Time since last vampire feeding
    vampireHungerLevel: 0,
    safeHouseTimeProtection: 0,
    investigationDeadlines: {},
    contactAvailability: {}
  },
  states: {
    mainMenu: {
      on: {
        START_GAME: {
          target: 'gameplay',
          actions: 'initializeGameTime'
        },
        LOAD_GAME: 'gameplay',
        OPEN_SETTINGS: 'settings'
      }
    },
    settings: {
      on: {
        CLOSE_SETTINGS: 'mainMenu'
      }
    },
    gameplay: {
      invoke: {
        src: 'timeService',
        id: 'timekeeper'
      },
      type: 'parallel',
      states: {
        timeState: {
          initial: 'day',
          states: {
            day: {
              after: {
                // Transition to dusk after appropriate game-time has passed
                TIME_UNTIL_DUSK: {
                  target: 'dusk',
                  actions: ['updateLightLevel', 'adjustVampireBehavior']
                }
              },
              on: {
                TIME_TICK: {
                  actions: ['updateGameTime', 'checkDeadlines']
                }
              }
            },
            dusk: {
              after: {
                TIME_UNTIL_NIGHT: {
                  target: 'night',
                  actions: ['updateLightLevel', 'increaseVampireActivity']
                }
              }
            },
            night: {
              after: {
                TIME_UNTIL_DAWN: {
                  target: 'dawn',
                  actions: ['updateLightLevel', 'decreaseVampireActivity']
                }
              },
              on: {
                VAMPIRE_FEEDING: {
                  actions: ['updateVampireHunger', 'increaseLocalSuspicion']
                }
              }
            },
            dawn: {
              after: {
                TIME_UNTIL_DAY: {
                  target: 'day',
                  actions: ['updateLightLevel', 'resetVampireActivity']
                }
              }
            }
          }
        },
        missionState: {
          initial: 'investigation',
          states: {
            investigation: {
              on: {
                COMBAT_TRIGGERED: 'combat',
                STEALTH_REQUIRED: 'stealth',
                INTEL_GATHERED: {
                  target: 'investigation',
                  actions: ['updateIntel', 'updateTimeBasedClues']
                },
                DEADLINE_REACHED: {
                  target: 'missionFailed',
                  cond: 'isDeadlineMissed'
                }
              }
            },
            combat: {
              on: {
                COMBAT_RESOLVED: {
                  target: 'investigation',
                  actions: 'advanceGameTime'
                },
                PLAYER_DIED: '#nightsBlackAgents.gameOver',
                ESCAPE_INITIATED: 'stealth'
              }
            },
            stealth: {
              on: {
                DETECTED: 'combat',
                STEALTH_SUCCESS: {
                  target: 'investigation',
                  actions: 'advanceGameTime'
                }
              }
            },
            missionFailed: {
              on: {
                RESTART_MISSION: {
                  target: 'investigation',
                  actions: 'resetMissionTime'
                }
              }
            }
          }
        },
        playerState: {
          initial: 'normal',
          states: {
            normal: {
              on: {
                TAKE_DAMAGE: 'injured',
                USE_VAMPIRE_POWER: {
                  target: 'vampiricInfluence',
                  actions: 'startCorruptionTimer'
                }
              }
            },
            injured: {
              after: {
                HEALING_TIME: {
                  target: 'normal',
                  cond: 'isInSafeHouse'
                }
              },
              on: {
                TAKE_DAMAGE: {
                  target: '#nightsBlackAgents.gameOver',
                  cond: 'healthDepleted'
                }
              }
            },
            vampiricInfluence: {
              after: {
                CORRUPTION_THRESHOLD: {
                  target: '#nightsBlackAgents.gameOver',
                  cond: 'isFullyCorrupted'
                }
              },
              on: {
                RESIST_INFLUENCE: {
                  target: 'normal',
                  actions: 'resetCorruptionTimer'
                }
              }
            }
          }
        },
        worldState: {
          initial: 'normal',
          states: {
            normal: {
              after: {
                SUSPICION_DECAY_TIME: {
                  actions: 'decreaseSuspicion',
                  cond: 'canDecreaseSuspicion'
                }
              },
              on: {
                INCREASE_SUSPICION: {
                  target: 'heightenedAlert',
                  cond: 'suspicionThresholdReached'
                }
              }
            },
            heightenedAlert: {
              after: {
                ALERT_DURATION: {
                  target: 'normal',
                  cond: 'alertHasExpired'
                }
              },
              on: {
                FULLY_COMPROMISED: 'exposed'
              }
            },
            exposed: {
              after: {
                EXPOSURE_TIMER: {
                  target: '#nightsBlackAgents.gameOver',
                  cond: 'exposureTimerExpired'
                }
              },
              on: {
                GO_DARK: {
                  target: 'normal',
                  actions: ['resetSuspicion', 'applyTimePenalty']
                }
              }
            }
          }
        }
      }
    },
    gameOver: {
      on: {
        RESTART: {
          target: 'mainMenu',
          actions: 'resetGameState'
        },
        LOAD_SAVE: 'gameplay'
      }
    }
  }
}, {
  guards: {
    healthDepleted: (context) => context.playerHealth <= 0,
    suspicionThresholdReached: (context) => context.suspicionLevel >= 75,
    isDeadlineMissed: (context, event) => context.gameTime >= event.deadline,
    isInSafeHouse: (context) => context.currentLocation?.type === 'safehouse',
    isFullyCorrupted: (context) => context.vampiricInfluence >= 100,
    canDecreaseSuspicion: (context) => context.suspicionLevel > 0,
    alertHasExpired: (context) => context.gameTime >= context.alertEndTime,
    exposureTimerExpired: (context) => context.gameTime >= context.exposureEndTime
  },
  actions: {
    initializeGameTime: assign({
      gameTime: 0,
      daysPassed: 0,
      currentHour: 20
    }),
    updateGameTime: assign({
      gameTime: (context) => context.gameTime + 1,
      currentHour: (context) => (context.gameTime / 60) % 24,
      daysPassed: (context) => Math.floor(context.gameTime / (24 * 60))
    }),
    updateLightLevel: assign({
      environmentalConditions: (context, event) => ({
        ...context.environmentalConditions,
        lightLevel: event.lightLevel
      })
    }),
    adjustVampireBehavior: assign({
      vampireActivity: (context) => ({
        ...context.vampireActivity,
        aggressiveness: context.currentHour >= 18 ? 'high' : 'low'
      })
    }),
    updateTimeBasedClues: assign({
      discoveredClues: (context, event) => {
        const newClue = {
          ...event.clue,
          discoveryTime: context.gameTime,
          expirationTime: context.gameTime + event.clue.duration
        };
        return [...context.discoveredClues, newClue];
      }
    }),
    checkDeadlines: (context) => {
      Object.entries(context.investigationDeadlines).forEach(([key, deadline]) => {
        if (context.gameTime >= deadline) {
          // Handle missed deadline consequences
        }
      });
    },
    advanceGameTime: assign({
      gameTime: (context, event) => context.gameTime + event.duration
    }),
    startCorruptionTimer: assign({
      corruptionStartTime: (context) => context.gameTime,
      corruptionLevel: 0
    }),
    resetCorruptionTimer: assign({
      corruptionStartTime: null,
      corruptionLevel: 0
    }),
    applyTimePenalty: assign({
      gameTime: (context) => context.gameTime + 60 // Add one hour penalty
    }),
    updateVampireHunger: assign({
      lastVampireFeed: (context) => context.gameTime,
      vampireHungerLevel: 0
    })
  },
  services: {
    timeService: (context) => (callback) => {
      const interval = setInterval(() => {
        callback('TIME_TICK');
      }, 1000 / context.timeScale); // Real-time seconds per game minute

      return () => clearInterval(interval);
    }
  }
});

export default gameStateMachine;