import { createMachine } from 'xstate';

export const vampireSupernaturalMechanicsMachine = createMachine({
  id: 'vampireMetaphysicalSystem',
  initial: 'bloodlineInitialization',
  context: {
    vampiricEssence: {
      bloodPurity: 0,
      ancestralMemory: 0,
      transformativePotential: 0
    },
    supernaturalAnomalies: {
      hematologicalMutations: 0,
      genealogicalDistortions: 0,
      predatoryMetamorphosis: 0
    },
    metaphysicalPhenomena: {
      bloodlineConvergence: 0,
      ancestralInheritance: 0,
      progenitorInfluence: 0
    }
  },
  states: {
    bloodlineInitialization: {
      on: {
        ACTIVATE_VAMPIRIC_LINEAGE: {
          target: 'genealogicalAwakening',
          actions: 'initializeBloodlineParameters'
        }
      }
    },
    genealogicalAwakening: {
      states: {
        ancestralMemoryResonance: {
          on: {
            UNLOCK_PROGENITOR_MEMORIES: {
              actions: 'triggerGenealogicalTransmission',
              target: '#vampireMetaphysicalSystem.metaphysicalConvergence'
            }
          }
        },
        hematologicalMutation: {
          on: {
            EVOLVE_BLOOD_CHARACTERISTICS: {
              actions: 'induceBloodlineAberrations',
              target: '#vampireMetaphysicalSystem.metaphysicalConvergence'
            }
          }
        }
      }
    },
    metaphysicalConvergence: {
      on: {
        SYNCHRONIZE_VAMPIRIC_ESSENCE: {
          target: 'transformativeCascade',
          actions: 'calculateBloodlineResonance'
        }
      }
    },
    transformativeCascade: {
      on: {
        TRIGGER_PREDATORY_METAMORPHOSIS: {
          target: 'metaphysicalEvaluation',
          actions: 'initiateSupernaturalTransformation'
        }
      }
    },
    metaphysicalEvaluation: {
      on: {
        ASSESS_VAMPIRIC_POTENTIAL: [
          {
            target: 'transcendentAwakening',
            cond: 'detectAncestralAscension'
          },
          {
            target: 'genealogicalFragmentation',
            cond: 'identifyLineageDegradation'
          }
        ]
      }
    },
    transcendentAwakening: {
      type: 'final',
      data: {
        vampiricOutcome: 'progenitorAscension'
      }
    },
    genealogicalFragmentation: {
      type: 'final',
      data: {
        vampiricOutcome: 'lineageCollapse'
      }
    }
  }
}, {
  actions: {
    initializeBloodlineParameters: (context) => {
      context.vampiricEssence.bloodPurity += 25;
      context.metaphysicalPhenomena.progenitorInfluence += 15;
    },
    triggerGenealogicalTransmission: (context) => {
      context.vampiricEssence.ancestralMemory += 35;
      context.supernaturalAnomalies.genealogicalDistortions += 20;
    },
    induceBloodlineAberrations: (context) => {
      context.supernaturalAnomalies.hematologicalMutations += 40;
      context.vampiricEssence.transformativePotential += 25;
    },
    calculateBloodlineResonance: (context) => {
      const essenceIntensity = Object.values(context.vampiricEssence)
        .reduce((a, b) => a + b, 0);
      context.metaphysicalPhenomena.bloodlineConvergence = essenceIntensity;
    },
    initiateSupernaturalTransformation: (context) => {
      context.supernaturalAnomalies.predatoryMetamorphosis += 50;
      context.metaphysicalPhenomena.ancestralInheritance += 30;
    }
  },
  guards: {
    detectAncestralAscension: (context) => 
      context.metaphysicalPhenomena.bloodlineConvergence >= 75,
    identifyLineageDegradation: (context) => 
      context.metaphysicalPhenomena.bloodlineConvergence < 75
  }
});