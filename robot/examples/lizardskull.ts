import { createMachine, assign } from 'xstate';

const werewolfMachine = createMachine({
  id: 'werewolfWarrior',
  initial: 'idle',
  context: {
    health: 100,
    stamina: 100,
    targetCow: null,
    lastKnownCowLocation: null,
    timeSinceLastMeal: 0,
    playerNearby: false,
    moonPhase: 'full', // full, waning, new, waxing
  },
  states: {
    idle: {
      on: {
        BEGIN: {
          target: 'firstStep',
        },
      },
    },
    firstStep: {
      after: {
        3000: 'secondStep',
      },
    },
    secondStep: {
      after: {
        3000: 'thirdStep',
      },
    },
    thirdStep: {
      after: {
        3000: 'firstStep',
      },
    },
    patrolling: {
      entry: ['regenerateStamina'],
      on: {
        DETECT_COW: {
          target: 'tracking',
          actions: assign({
            targetCow: (_, event) => event.cow,
            lastKnownCowLocation: (_, event) => event.location
          })
        },
        PLAYER_SPOTTED: {
          target: 'playerAware',
          actions: assign({ playerNearby: true })
        },
        TOOK_DAMAGE: {
          target: 'defensive',
          actions: ['decreaseHealth']
        }
      },
      after: {
        // Check hunger level every 30 seconds
        30000: {
          target: 'hunting',
          cond: 'isHungry'
        }
      }
    },
    tracking: {
      entry: ['startTrackingAnimation'],
      exit: ['stopTrackingAnimation'],
      on: {
        COW_LOST: {
          target: 'searching',
          actions: assign({ targetCow: null })
        },
        WITHIN_ATTACK_RANGE: 'attacking',
        PLAYER_SPOTTED: {
          target: 'playerAware',
          actions: assign({ playerNearby: true })
        }
      }
    },
    searching: {
      entry: ['activateEnhancedSmell'],
      after: {
        // Give up search after 45 seconds
        45000: {
          target: 'patrolling',
          actions: assign({
            lastKnownCowLocation: null
          })
        }
      },
      on: {
        DETECT_COW: {
          target: 'tracking',
          actions: assign({
            targetCow: (_, event) => event.cow,
            lastKnownCowLocation: (_, event) => event.location
          })
        }
      }
    },
    attacking: {
      entry: ['playAttackAnimation', 'decreaseStamina'],
      after: {
        // Attack animation duration
        2000: [
          {
            target: 'feeding',
            cond: 'attackSuccessful',
            actions: ['killCow']
          },
          {
            target: 'tracking',
            actions: ['missedAttack']
          }
        ]
      },
      on: {
        TOOK_DAMAGE: {
          target: 'defensive',
          actions: ['decreaseHealth']
        }
      }
    },
    feeding: {
      entry: ['playFeedingAnimation', 'regenerateHealth'],
      after: {
        // Feeding duration
        8000: {
          target: 'patrolling',
          actions: [
            assign({
              timeSinceLastMeal: 0,
              targetCow: null,
              lastKnownCowLocation: null
            })
          ]
        }
      },
      on: {
        PLAYER_SPOTTED: {
          target: 'playerAware',
          actions: assign({ playerNearby: true })
        },
        TOOK_DAMAGE: {
          target: 'defensive',
          actions: ['decreaseHealth']
        }
      }
    },
    hunting: {
      entry: ['activateHuntingMode'],
      on: {
        DETECT_COW: {
          target: 'tracking',
          actions: assign({
            targetCow: (_, event) => event.cow,
            lastKnownCowLocation: (_, event) => event.location
          })
        },
        PLAYER_SPOTTED: {
          target: 'playerAware',
          actions: assign({ playerNearby: true })
        }
      },
      after: {
        // Return to patrolling if no prey found
        60000: 'patrolling'
      }
    },
    defensive: {
      entry: ['activateDefensiveStance'],
      on: {
        HEALTH_CRITICAL: 'fleeing',
        THREAT_GONE: 'patrolling',
        PLAYER_SPOTTED: {
          target: 'playerAware',
          actions: assign({ playerNearby: true })
        }
      }
    },
    fleeing: {
      entry: ['playFleeAnimation', 'findEscapeRoute'],
      after: {
        // Attempt to flee for 10 seconds
        10000: {
          target: 'hiding',
          cond: 'successfulEscape'
        }
      },
      on: {
        CAUGHT_BY_PLAYER: 'defensive'
      }
    },
    hiding: {
      entry: ['activateStealthMode'],
      after: {
        // Hide and recover for 30 seconds
        30000: {
          target: 'patrolling',
          cond: 'isHealthRecovered'
        }
      }
    },
    playerAware: {
      entry: ['alertStateAnimation'],
      after: {
        // Return to previous state if player leaves
        5000: {
          target: 'patrolling',
          cond: 'isPlayerGone',
          actions: assign({ playerNearby: false })
        }
      }
    }
  }
}, {
  guards: {
    isHungry: (context) => context.timeSinceLastMeal > 300,
    attackSuccessful: (context) => Math.random() > 0.3, // 70% success rate
    successfulEscape: (context) => Math.random() > 0.2, // 80% escape rate
    isHealthRecovered: (context) => context.health > 50,
    isPlayerGone: (context) => !context.playerNearby
  },
  actions: {
    decreaseHealth: assign({
      health: (context) => Math.max(0, context.health - 20)
    }),
    regenerateHealth: assign({
      health: (context) => Math.min(100, context.health + 30)
    }),
    decreaseStamina: assign({
      stamina: (context) => Math.max(0, context.stamina - 25)
    }),
    regenerateStamina: assign({
      stamina: (context) => Math.min(100, context.stamina + 10)
    }),
    // Other actions would be implemented with game engine specifics
    startTrackingAnimation: () => { },
    stopTrackingAnimation: () => { },
    playAttackAnimation: () => { },
    playFeedingAnimation: () => { },
    playFleeAnimation: () => { },
    activateEnhancedSmell: () => { },
    activateHuntingMode: () => { },
    activateDefensiveStance: () => { },
    activateStealthMode: () => { },
    alertStateAnimation: () => { },
    findEscapeRoute: () => { },
    killCow: () => { },
    missedAttack: () => { }
  }
});

export default werewolfMachine;