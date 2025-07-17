import { createMachine } from 'xstate';

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
    contactNetwork: []
  },
  states: {
    mainMenu: {
      on: {
        START_GAME: 'gameplay',
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
      type: 'parallel',
      states: {
        missionState: {
          initial: 'investigation',
          states: {
            investigation: {
              on: {
                COMBAT_TRIGGERED: 'combat',
                STEALTH_REQUIRED: 'stealth',
                INTEL_GATHERED: {
                  target: 'investigation',
                  actions: ['updateIntel']
                }
              }
            },
            combat: {
              on: {
                COMBAT_RESOLVED: 'investigation',
                PLAYER_DIED: '#nightsBlackAgents.gameOver',
                ESCAPE_INITIATED: 'stealth'
              }
            },
            stealth: {
              on: {
                DETECTED: 'combat',
                STEALTH_SUCCESS: 'investigation',
                GATHER_INTEL: {
                  target: 'investigation',
                  actions: ['updateIntel']
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
                USE_VAMPIRE_POWER: 'vampiricInfluence'
              }
            },
            injured: {
              on: {
                HEAL: 'normal',
                TAKE_DAMAGE: {
                  target: '#nightsBlackAgents.gameOver',
                  cond: 'healthDepleted'
                }
              }
            },
            vampiricInfluence: {
              on: {
                RESIST_INFLUENCE: 'normal',
                SUCCUMB_TO_DARKNESS: '#nightsBlackAgents.gameOver'
              }
            }
          }
        },
        worldState: {
          initial: 'normal',
          states: {
            normal: {
              on: {
                INCREASE_SUSPICION: {
                  target: 'heightenedAlert',
                  cond: 'suspicionThresholdReached'
                }
              }
            },
            heightenedAlert: {
              on: {
                REDUCE_SUSPICION: 'normal',
                FULLY_COMPROMISED: 'exposed'
              }
            },
            exposed: {
              on: {
                GO_DARK: 'normal',
                MISSION_FAILED: '#nightsBlackAgents.gameOver'
              }
            }
          }
        }
      }
    },
    gameOver: {
      on: {
        RESTART: 'mainMenu',
        LOAD_SAVE: 'gameplay'
      }
    }
  }
}, {
  guards: {
    healthDepleted: (context) => context.playerHealth <= 0,
    suspicionThresholdReached: (context) => context.suspicionLevel >= 75
  },
  actions: {
    updateIntel: (context) => {
      context.vampireIntel += 1;
    }
  }
});

export default gameStateMachine;