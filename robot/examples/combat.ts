import { createMachine, assign } from 'xstate';

const werewolfMachine = createMachine({
  id: 'werewolfWarrior',
  initial: 'patrolling',
  context: {
    health: 100,
    stamina: 100,
    targetCow: null,
    lastKnownCowLocation: null,
    timeSinceLastMeal: 0,
    playerNearby: false,
    moonPhase: 'full',
    // New combat-specific context
    cowHealth: 100,
    stunDuration: 0,
    bleedingApplied: false,
    consecutiveHits: 0
  },
  states: {
    patrolling: {
      entry: ['regenerateStamina'],
      on: {
        DETECT_COW: {
          target: 'tracking',
          actions: assign({
            targetCow: (_, event) => event.cow,
            lastKnownCowLocation: (_, event) => event.location,
            cowHealth: 100
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
        WITHIN_ATTACK_RANGE: 'preparingPounce',
        PLAYER_SPOTTED: {
          target: 'playerAware',
          actions: assign({ playerNearby: true })
        }
      }
    },
    preparingPounce: {
      entry: ['crouchAnimation', 'calculatePounceTrajectory'],
      after: {
        1500: {
          target: 'pouncing',
          cond: 'hasStaminaForPounce'
        }
      },
      on: {
        COW_ESCAPED: 'tracking',
        PLAYER_SPOTTED: 'playerAware'
      }
    },
    pouncing: {
      entry: ['playPounceAnimation', 'decreaseStamina'],
      after: {
        800: [
          {
            target: 'mounting',
            cond: 'pounceSuccessful',
            actions: ['applyStun']
          },
          {
            target: 'tracking',
            actions: ['missedPounce']
          }
        ]
      }
    },
    mounting: {
      entry: ['playMountAnimation', 'preventCowEscape'],
      after: {
        1200: 'hamstringing'
      },
      on: {
        COW_BREAKS_FREE: 'tracking'
      }
    },
    hamstringing: {
      entry: ['playHamstringAttack', 'applyBleedEffect'],
      after: {
        1000: {
          target: 'throatBite',
          cond: 'targetStunned'
        }
      },
      on: {
        ATTACK_MISSED: 'mounting'
      }
    },
    throatBite: {
      entry: ['playThroatBiteAnimation', 'applyCriticalDamage'],
      after: {
        2000: [
          {
            target: 'slaughtering',
            cond: 'cowCriticallyWounded'
          },
          {
            target: 'hamstringing'
          }
        ]
      }
    },
    slaughtering: {
      entry: ['playSlaughterAnimation', 'disableCowMovement'],
      after: {
        3000: {
          target: 'feeding',
          actions: ['killCow', 'triggerGoreEffects']
        }
      },
      on: {
        INTERRUPTED: 'defensive'
      }
    },
    feeding: {
      entry: ['playFeedingAnimation', 'regenerateHealth', 'triggerBloodEffects'],
      after: {
        8000: {
          target: 'patrolling',
          actions: [
            assign({
              timeSinceLastMeal: 0,
              targetCow: null,
              lastKnownCowLocation: null,
              bleedingApplied: false,
              consecutiveHits: 0
            })
          ]
        }
      },
      on: {
        PLAYER_SPOTTED: 'playerAware',
        TOOK_DAMAGE: 'defensive'
      }
    },
    // ... (rest of the previous states remain the same)
  }
}, {
  guards: {
    isHungry: (context) => context.timeSinceLastMeal > 300,
    hasStaminaForPounce: (context) => context.stamina >= 30,
    pounceSuccessful: (context) => Math.random() > 0.25, // 75% success rate
    targetStunned: (context) => context.stunDuration > 0,
    cowCriticallyWounded: (context) => context.cowHealth <= 30,
    // ... (previous guards remain)
  },
  actions: {
    decreaseHealth: assign({
      health: (context) => Math.max(0, context.health - 20)
    }),
    applyStun: assign({
      stunDuration: 5000,
      cowHealth: (context) => Math.max(0, context.cowHealth - 15)
    }),
    applyBleedEffect: assign({
      bleedingApplied: true,
      cowHealth: (context) => Math.max(0, context.cowHealth - 25)
    }),
    applyCriticalDamage: assign({
      cowHealth: (context) => Math.max(0, context.cowHealth - 40),
      consecutiveHits: (context) => context.consecutiveHits + 1
    }),
    preventCowEscape: () => {
      // Apply movement restrictions to cow
    },
    disableCowMovement: () => {
      // Completely disable cow movement
    },
    triggerGoreEffects: () => {
      // Trigger blood splatter and gore visual effects
    },
    triggerBloodEffects: () => {
      // Trigger feeding blood effects
    },
    calculatePounceTrajectory: () => {
      // Calculate optimal pounce angle and distance
    },
    // ... (previous actions remain)
  }
});

export default werewolfMachine;