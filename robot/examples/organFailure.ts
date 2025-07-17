import { createMachine, assign } from 'xstate';

const CASCADE_EFFECTS = {
  heart_failure: {
    primary: 'circulatory',
    cascade: ['respiratory', 'nervous', 'digestive'],
    effects: ['oxygen_deprivation', 'organ_shutdown', 'tissue_death'],
    timeToCollapse: 8000
  },
  lung_collapse: {
    primary: 'respiratory',
    cascade: ['circulatory', 'nervous', 'digestive'],
    effects: ['hypoxia', 'cardiac_strain', 'brain_damage'],
    timeToCollapse: 12000
  },
  liver_rupture: {
    primary: 'digestive',
    cascade: ['circulatory', 'respiratory'],
    effects: ['toxin_release', 'internal_hemorrhage', 'chemical_burn'],
    timeToCollapse: 15000
  },
  spinal_severance: {
    primary: 'nervous',
    cascade: ['respiratory', 'digestive'],
    effects: ['paralysis', 'organ_control_loss', 'autonomic_failure'],
    timeToCollapse: 5000
  },
  major_hemorrhage: {
    primary: 'circulatory',
    cascade: ['all'],
    effects: ['massive_bleeding', 'shock', 'total_collapse'],
    timeToCollapse: 6000
  }
};

const ORGAN_DEPENDENCIES = {
  heart: ['lungs', 'brain', 'liver'],
  lungs: ['heart', 'diaphragm', 'brain'],
  liver: ['heart', 'intestines', 'stomach'],
  kidneys: ['heart', 'liver', 'blood_vessels'],
  brain: ['heart', 'lungs', 'blood_vessels'],
  intestines: ['stomach', 'liver', 'blood_vessels'],
  pancreas: ['liver', 'intestines', 'blood_vessels'],
  spleen: ['blood_vessels', 'liver'],
  stomach: ['intestines', 'liver', 'blood_vessels']
};

const organFailure = createMachine({
  // Previous configuration remains...
  context: {
    // Previous context remains...
    cascadeEffects: [],
    organFailureQueue: [],
    systemicShockLevel: 0,
    tissueNecrosis: 0,
    toxinLevel: 0,
    organDependencyMap: ORGAN_DEPENDENCIES,
    activeCascades: new Set(),
    failureTimers: [],
    shockState: 'none', // none, mild, severe, critical
    lastDamagedOrgan: null,
    cascadeChains: []
  },
  states: {
    // Previous states remain...
    evisceration: {
      // Previous configuration remains...
      states: {
        // Previous states remain...
        targetingOrgans: {
          entry: ['focusOrganSystem', 'startPrecisionTearing'],
          invoke: {
            src: 'monitorOrganFailure'
          },
          on: {
            TEAR_ORGAN: {
              actions: [
                'damageOrgan',
                'triggerOrganEffect',
                'checkCascadeInitiation',
                'updateDependentOrgans'
              ]
            },
            CASCADE_TRIGGERED: {
              actions: [
                'initiateCascadeSequence',
                'updateSystemicShock',
                'trackCascadeChain'
              ]
            },
            SHOCK_THRESHOLD_REACHED: {
              actions: ['escalateShockState', 'accelerateOrganFailure']
            },
            TOTAL_SYSTEM_COLLAPSE: {
              target: 'catastrophicFailure'
            }
          }
        },
        catastrophicFailure: {
          entry: [
            'triggerMassiveHemorrhage',
            'initiateTerminalCascade',
            'playSystemicCollapseAnimation'
          ],
          after: {
            2000: 'totalDestruction'
          }
        }
      }
    }
  }
}, {
  actions: {
    // Previous actions remain...
    checkCascadeInitiation: assign({
      cascadeEffects: (context, event) => {
        const damagedOrgan = event.organ;
        const dependencies = context.organDependencyMap[damagedOrgan];
        const newCascades = dependencies
          .filter(dep => context.organSystems[getOrganSystem(dep)].integrity < 30)
          .map(dep => ({
            source: damagedOrgan,
            target: dep,
            effect: determineCascadeEffect(damagedOrgan, dep)
          }));
        return [...context.cascadeEffects, ...newCascades];
      }
    }),
    initiateCascadeSequence: assign({
      activeCascades: (context, event) => {
        const newCascade = new Set(context.activeCascades);
        newCascade.add(event.cascadeType);
        return newCascade;
      },
      failureTimers: (context, event) => {
        const cascade = CASCADE_EFFECTS[event.cascadeType];
        return [...context.failureTimers, {
          type: event.cascadeType,
          timeRemaining: cascade.timeToCollapse,
          affectedSystems: cascade.cascade
        }];
      }
    }),
    updateDependentOrgans: assign({
      organSystems: (context, event) => {
        const damagedOrgan = event.organ;
        const dependencies = context.organDependencyMap[damagedOrgan];
        const updatedSystems = { ...context.organSystems };

        dependencies.forEach(dep => {
          const system = getOrganSystem(dep);
          const currentIntegrity = updatedSystems[system].integrity;
          const dependencyDamage = Math.floor(Math.random() * 20) + 10;
          
          updatedSystems[system] = {
            ...updatedSystems[system],
            integrity: Math.max(0, currentIntegrity - dependencyDamage),
            damaged: [...updatedSystems[system].damaged, dep]
          };
        });

        return updatedSystems;
      }
    }),
    updateSystemicShock: assign({
      systemicShockLevel: (context) => {
        const activeFailures = context.activeCascades.size;
        const baseShock = context.systemicShockLevel;
        return Math.min(100, baseShock + (activeFailures * 15));
      },
      shockState: (context) => {
        const shockLevel = context.systemicShockLevel;
        if (shockLevel >= 90) return 'critical';
        if (shockLevel >= 70) return 'severe';
        if (shockLevel >= 40) return 'mild';
        return 'none';
      }
    }),
    escalateShockState: assign({
      toxinLevel: (context) => Math.min(100, context.toxinLevel + 25),
      tissueNecrosis: (context) => Math.min(100, context.tissueNecrosis + 20)
    }),
    trackCascadeChain: assign({
      cascadeChains: (context, event) => {
        const newChain = {
          initiatingOrgan: event.organ,
          cascadeType: event.cascadeType,
          affectedSystems: CASCADE_EFFECTS[event.cascadeType].cascade,
          timestamp: Date.now()
        };
        return [...context.cascadeChains, newChain];
      }
    }),
    initiateTerminalCascade: assign({
      organSystems: (context) => {
        const terminalSystems = {};
        Object.keys(context.organSystems).forEach(system => {
          terminalSystems[system] = {
            ...context.organSystems[system],
            integrity: 0,
            exposed: true
          };
        });
        return terminalSystems;
      }
    }),
    triggerMassiveHemorrhage: () => {
      // Implement massive hemorrhage effects:
      // - Exponential blood loss
      // - Tissue rupture chains
      // - Massive vessel collapse
      // - Terminal shock animations
    }
  },
  services: {
    monitorOrganFailure: () => (callback) => {
      const interval = setInterval(() => {
        callback({
          type: 'CHECK_CASCADE_PROGRESS',
          timestamp: Date.now()
        });
      }, 500);
      return () => clearInterval(interval);
    }
  }
});

// Utility functions
function getOrganSystem(organ) {
  const systemMap = {
    heart: 'circulatory',
    lungs: 'respiratory',
    liver: 'digestive',
    brain: 'nervous',
    // ... more organ to system mappings
  };
  return systemMap[organ] || 'digestive';
}

function determineCascadeEffect(sourceOrgan, targetOrgan) {
  const effectMap = {
    heart: {
      lungs: 'pulmonary_edema',
      brain: 'cerebral_hypoxia',
      liver: 'congestive_failure'
    },
    // ... more organ interaction mappings
  };
  return effectMap[sourceOrgan]?.[targetOrgan] || 'general_failure';
}

export default organFailure;