import { createMachine } from 'xstate';

export const realityDistortionMachine = createMachine({
  id: 'vampireRealityManipulation',
  initial: 'initialDistortionState',
  context: {
    realityParameters: {
      perceptualManipulation: 0,
      causalityFragmentation: 0,
      existentialWarp: 0
    },
    metaphysicalInterferences: {
      consensusReality: 0,
      probabilityManipulation: 0,
      memoryRewriting: 0
    },
    quantumAnomalies: {
      simultaneousRealities: 0,
      paradoxicalStates: 0,
      entropicDecay: 0
    }
  },
  states: {
    initialDistortionState: {
      on: {
        INITIATE_REALITY_BREACH: {
          target: 'perceptualManipulation',
          actions: 'triggerInitialDistortion'
        }
      }
    },
    perceptualManipulation: {
      states: {
        consensusWarping: {
          on: {
            MODIFY_COLLECTIVE_PERCEPTION: {
              actions: 'alterConsensusReality',
              target: '#vampireRealityManipulation.causalityFragmentation'
            }
          }
        },
        memoryRestructuring: {
          on: {
            REWRITE_EXISTENTIAL_MEMORY: {
              actions: 'propagateMemoryDistortions',
              target: '#vampireRealityManipulation.causalityFragmentation'
            }
          }
        }
      }
    },
    causalityFragmentation: {
      on: {
        TRIGGER_PROBABILISTIC_CASCADE: {
          target: 'quantumEntanglement',
          actions: 'calculatedRealityInversion'
        }
      }
    },
    quantumEntanglement: {
      on: {
        GENERATE_SIMULTANEOUS_REALITIES: {
          target: 'metaphysicalJudgment',
          actions: 'initializeParadoxicalStates'
        }
      }
    },
    metaphysicalJudgment: {
      on: {
        ASSESS_REALITY_INTEGRITY: [
          {
            target: 'realityAscension',
            cond: 'detectTranscendentalConvergence'
          },
          {
            target: 'realityCollapse',
            cond: 'identifyRealiityDisintegration'
          }
        ]
      }
    },
    realityAscension: {
      type: 'final',
      data: {
        distortionOutcome: 'metaphysicalTransformation'
      }
    },
    realityCollapse: {
      type: 'final',
      data: {
        distortionOutcome: 'existentialAnnihilation'
      }
    }
  }
}, {
  actions: {
    triggerInitialDistortion: (context) => {
      context.realityParameters.perceptualManipulation += 30;
      context.metaphysicalInterferences.consensusReality += 25;
    },
    alterConsensusReality: (context) => {
      context.metaphysicalInterferences.probabilityManipulation += 40;
      context.quantumAnomalies.simultaneousRealities += 35;
    },
    propagateMemoryDistortions: (context) => {
      context.metaphysicalInterferences.memoryRewriting += 50;
      context.realityParameters.causalityFragmentation += 45;
    },
    calculatedRealityInversion: (context) => {
      const realityIntensity = Object.values(context.realityParameters)
        .reduce((a, b) => a + b, 0);
      context.quantumAnomalies.paradoxicalStates = realityIntensity;
    },
    initializeParadoxicalStates: (context) => {
      context.realityParameters.existentialWarp += 60;
      context.quantumAnomalies.entropicDecay += 55;
    }
  },
  guards: {
    detectTranscendentalConvergence: (context) => 
      context.quantumAnomalies.paradoxicalStates >= 100,
    identifyRealiityDisintegration: (context) => 
      context.quantumAnomalies.paradoxicalStates < 100
  }
});