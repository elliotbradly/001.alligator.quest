import { createMachine, assign } from 'xstate';

const ORGAN_SYSTEMS = {
  circulatory: {
    organs: ['heart', 'arteries', 'veins'],
    effects: ['massive bleeding', 'pressure drop', 'organ failure'],
    deathTimer: 10000
  },
  respiratory: {
    organs: ['lungs', 'trachea', 'diaphragm'],
    effects: ['suffocation', 'gurgling', 'gasping'],
    deathTimer: 15000
  },
  digestive: {
    organs: ['stomach', 'intestines', 'liver', 'pancreas'],
    effects: ['acid spill', 'toxin release', 'bile leakage'],
    deathTimer: 30000
  },
  nervous: {
    organs: ['brain', 'spine', 'nerve clusters'],
    effects: ['paralysis', 'seizures', 'loss of control'],
    deathTimer: 5000
  },
  skeletal: {
    organs: ['ribs', 'pelvis', 'skull'],
    effects: ['structural collapse', 'internal punctures', 'marrow exposure'],
    deathTimer: 45000
  }
};

const organDamage = createMachine({
  id: 'werewolfWarrior',
  initial: 'patrolling',
  context: {
    // Previous context remains...
    organSystems: {
      circulatory: { integrity: 100, exposed: false, damaged: [] },
      respiratory: { integrity: 100, exposed: false, damaged: [] },
      digestive: { integrity: 100, exposed: false, damaged: [] },
      nervous: { integrity: 100, exposed: false, damaged: [] },
      skeletal: { integrity: 100, exposed: false, damaged: [] }
    },
    activeEffects: [],
    cavityExposed: false,
    ribcageBroken: false,
    currentOrganTarget: null,
    organDeathTimers: [],
    bloodPressure: 100,
    oxygenLevel: 100,
    consciousnessLevel: 100,
    internalBleeding: 0
  },
  states: {
    // Previous states remain...
    evisceration: {
      entry: ['playDisembowelAnimation', 'exposeBodyCavity'],
      invoke: {
        src: 'systematicOrganDestruction'
      },
      initial: 'breakingRibcage',
      states: {
        breakingRibcage: {
          entry: ['playCrackingAnimation', 'triggerBoneFragments'],
          after: {
            2000: {
              target: 'exposingOrgans',
              actions: ['shatterRibcage', 'revealOrganSystems']
            }
          }
        },
        exposingOrgans: {
          entry: ['playFleshTearingAnimation', 'triggerCavityExposure'],
          on: {
            SELECT_ORGAN_SYSTEM: {
              target: 'targetingOrgans',
              actions: ['selectOrganSystem']
            }
          }
        },
        targetingOrgans: {
          entry: ['focusOrganSystem', 'startPrecisionTearing'],
          on: {
            TEAR_ORGAN: {
              actions: ['damageOrgan', 'triggerOrganEffect']
            },
            ORGAN_SYSTEM_DESTROYED: 'systematicProgression'
          }
        },
        systematicProgression: {
          entry: ['selectNextOrganSystem'],
          always: [
            { target: 'targetingOrgans', cond: 'hasRemainingOrgans' },
            { target: 'totalDestruction' }
          ]
        },
        totalDestruction: {
          entry: ['playTotalDestructionAnimation'],
          after: {
            3000: '#werewolfWarrior.preyConsumption'
          }
        }
      }
    }
  }
}, {
  actions: {
    exposeBodyCavity: assign({
      cavityExposed: true,
      ribcageBroken: false
    }),
    shatterRibcage: assign({
      ribcageBroken: true,
      organSystems: (context) => ({
        ...context.organSystems,
        skeletal: {
          ...context.organSystems.skeletal,
          integrity: context.organSystems.skeletal.integrity - 40,
          damaged: [...context.organSystems.skeletal.damaged, 'ribs']
        }
      })
    }),
    damageOrgan: assign({
      organSystems: (context, event) => {
        const system = event.system;
        const organ = event.organ;
        const damageAmount = event.amount || 25;
        
        return {
          ...context.organSystems,
          [system]: {
            ...context.organSystems[system],
            integrity: Math.max(0, context.organSystems[system].integrity - damageAmount),
            damaged: [...context.organSystems[system].damaged, organ]
          }
        };
      }
    }),
    triggerOrganEffect: assign({
      activeEffects: (context, event) => {
        const newEffects = ORGAN_SYSTEMS[event.system].effects
          .filter(() => Math.random() > 0.5);
        return [...context.activeEffects, ...newEffects];
      },
      organDeathTimers: (context, event) => {
        if (context.organSystems[event.system].integrity <= 0) {
          return [...context.organDeathTimers, {
            system: event.system,
            timer: ORGAN_SYSTEMS[event.system].deathTimer
          }];
        }
        return context.organDeathTimers;
      }
    }),
    updateVitalSigns: assign({
      bloodPressure: (context) => {
        const circDamage = 100 - context.organSystems.circulatory.integrity;
        return Math.max(0, context.bloodPressure - (circDamage * 0.5));
      },
      oxygenLevel: (context) => {
        const respDamage = 100 - context.organSystems.respiratory.integrity;
        return Math.max(0, context.oxygenLevel - (respDamage * 0.5));
      },
      consciousnessLevel: (context) => {
        const nerveDamage = 100 - context.organSystems.nervous.integrity;
        return Math.max(0, context.consciousnessLevel - (nerveDamage * 0.7));
      },
      internalBleeding: (context) => {
        const digestiveDamage = 100 - context.organSystems.digestive.integrity;
        return Math.min(100, context.internalBleeding + (digestiveDamage * 0.3));
      }
    }),
    triggerCavityExposure: () => {
      // Implement cavity exposure effects:
      // - Steam effect in cold environments
      // - Organ pulsing animations
      // - Dynamic blood pool formation
      // - Internal tissue glistening
    },
    startPrecisionTearing: () => {
      // Implement precision organ targeting:
      // - Claw precision movement
      // - Organ specific grab points
      // - Tissue separation effects
      // - Connective tissue tearing
    }
  },
  guards: {
    hasRemainingOrgans: (context) => {
      return Object.values(context.organSystems)
        .some(system => system.integrity > 0);
    }
  },
  services: {
    systematicOrganDestruction: () => (callback) => {
      const interval = setInterval(() => {
        callback({
          type: 'UPDATE_ORGAN_STATUS',
          effects: ['blood_loss', 'organ_failure', 'system_collapse']
        });
      }, 1000);
      
      return () => clearInterval(interval);
    }
  }
});

export default organDamage;