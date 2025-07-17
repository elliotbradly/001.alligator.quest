import { createMachine, assign } from 'xstate';

const ultraviolet = createMachine({
  id: 'werewolfWarrior',
  initial: 'patrolling',
  context: {
    health: 100,
    stamina: 100,
    rage: 0,
    targetCow: null,
    lastKnownCowLocation: null,
    timeSinceLastMeal: 0,
    playerNearby: false,
    moonPhase: 'full',
    // Enhanced combat context
    cowHealth: 100,
    stunDuration: 0,
    bleedingIntensity: 0,
    dismemberedParts: [],
    consecutiveHits: 0,
    fleshTorn: false,
    ribcageBroken: false,
    spineExposed: false,
    organsDamaged: []
  },
  states: {
    patrolling: {
      entry: ['regenerateStamina', 'buildRage'],
      on: {
        DETECT_COW: {
          target: 'trackingPrey',
          actions: assign({
            targetCow: (_, event) => event.cow,
            lastKnownCowLocation: (_, event) => event.location,
            cowHealth: 100
          })
        },
        SMELL_BLOOD: {
          target: 'bloodFrenzy',
          actions: ['increaseRage']
        }
      }
    },
    trackingPrey: {
      entry: ['startPredatorAnimation', 'droolEffect'],
      on: {
        WITHIN_ATTACK_RANGE: 'savageLeap',
        SMELL_BLOOD: 'bloodFrenzy'
      }
    },
    savageLeap: {
      entry: ['playLeapAnimation', 'extendClaws'],
      after: {
        1000: [
          {
            target: 'brutalMaiming',
            cond: 'leapSuccessful',
            actions: ['impactDamage', 'knockdownPrey']
          },
          {
            target: 'trackingPrey'
          }
        ]
      }
    },
    brutalMaiming: {
      entry: ['playMaimAnimation', 'triggerGoreSpray'],
      invoke: {
        src: 'applyProgressiveGore'
      },
      on: {
        PREY_STRUGGLES: {
          target: 'spinalAttack',
          actions: ['increaseDismemberment']
        },
        RAGE_MAXED: 'bloodFrenzy'
      }
    },
    spinalAttack: {
      entry: ['playSpineRipAnimation', 'exposeBones'],
      after: {
        2000: {
          target: 'evisceration',
          actions: ['paralyzeTarget', 'triggerSpinalFluid']
        }
      }
    },
    evisceration: {
      entry: ['playDisembowelAnimation', 'exposedOrgansEffect'],
      invoke: {
        src: 'progressiveOrganDamage'
      },
      on: {
        ORGAN_DESTROYED: {
          actions: ['addDestroyedOrgan', 'increaseBloodPool']
        },
        COMPLETE_DESTRUCTION: 'preyConsumption'
      }
    },
    bloodFrenzy: {
      entry: ['playFrenzyAnimation', 'maximizeRage'],
      invoke: {
        src: 'intensifyGoreEffects'
      },
      on: {
        FRENZY_ATTACK: {
          actions: ['randomDismemberment', 'splatterEffect']
        },
        FRENZY_END: 'preyConsumption'
      }
    },
    preyConsumption: {
      entry: ['playDevourAnimation', 'triggerFeedingFrenzy'],
      invoke: {
        src: 'progressiveConsumption'
      },
      on: {
        BONE_CRUSHED: {
          actions: ['splinterEffect', 'marrowConsumption']
        },
        FULLY_CONSUMED: {
          target: 'patrolling',
          actions: ['digestEffect', 'cleanGore']
        }
      }
    }
  }
}, {
  guards: {
    leapSuccessful: (context) => context.rage > 50 || Math.random() > 0.2,
    fullyDismembered: (context) => context.dismemberedParts.length >= 6,
    organSystemDestroyed: (context) => context.organsDamaged.length >= 5
  },
  services: {
    applyProgressiveGore: () => (callback) => {
      const interval = setInterval(() => {
        callback('INCREASE_GORE');
      }, 500);
      return () => clearInterval(interval);
    },
    progressiveOrganDamage: () => (callback) => {
      const interval = setInterval(() => {
        callback('DESTROY_ORGAN');
      }, 800);
      return () => clearInterval(interval);
    },
    progressiveConsumption: () => (callback) => {
      const interval = setInterval(() => {
        callback('CONSUME_PART');
      }, 1000);
      return () => clearInterval(interval);
    },
    intensifyGoreEffects: () => (callback) => {
      const interval = setInterval(() => {
        callback('AMPLIFY_GORE');
      }, 300);
      return () => clearInterval(interval);
    }
  },
  actions: {
    increaseRage: assign({
      rage: (context) => Math.min(100, context.rage + 20)
    }),
    knockdownPrey: assign({
      cowHealth: (context) => Math.max(0, context.cowHealth - 30)
    }),
    increaseDismemberment: assign({
      dismemberedParts: (context) => [...context.dismemberedParts, generateRandomBodyPart()],
      bleedingIntensity: (context) => Math.min(100, context.bleedingIntensity + 25)
    }),
    paralyzeTarget: assign({
      spineExposed: true,
      cowHealth: (context) => Math.max(0, context.cowHealth - 50)
    }),
    addDestroyedOrgan: assign({
      organsDamaged: (context) => [...context.organsDamaged, generateRandomOrgan()],
      bleedingIntensity: (context) => Math.min(100, context.bleedingIntensity + 15)
    }),
    randomDismemberment: assign({
      dismemberedParts: (context) => {
        const newPart = generateRandomBodyPart();
        return [...context.dismemberedParts, newPart];
      }
    }),
    playDevourAnimation: () => {
      // Intense feeding animations with bone-crushing effects
    },
    triggerGoreSpray: () => {
      // Dynamic blood spray system based on attack angles
    },
    exposeBones: () => {
      // Reveal skeletal structure through torn flesh
    },
    exposedOrgansEffect: () => {
      // Visual effects for internal organ damage
    },
    splinterEffect: () => {
      // Bone fragmentation and marrow effects
    },
    marrowConsumption: () => {
      // Specialized animations for consuming bone marrow
    },
    cleanGore: assign({
      dismemberedParts: [],
      bleedingIntensity: 0,
      organsDamaged: [],
      spineExposed: false,
      ribcageBroken: false
    })
  }
});

// Utility functions
const generateRandomBodyPart = () => {
  const parts = ['limb', 'tail', 'ear', 'horn', 'hoof', 'muscle'];
  return parts[Math.floor(Math.random() * parts.length)];
};

const generateRandomOrgan = () => {
  const organs = ['heart', 'liver', 'lung', 'kidney', 'intestine'];
  return organs[Math.floor(Math.random() * organs.length)];
};

export default ultraviolet;