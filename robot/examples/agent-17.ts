import { createMachine } from 'xstate';

export const dimensionalBreachMachine = createMachine({
  id: 'vampireDimensionalMechanics',
  initial: 'initialBreach',
  context: {
    dimensionalParameters: {
      spatialDistortion: 0,
      temporalFragmentation: 0,
      metaphysicalInstability: 0
    },
    breachConsequences: {
      realityWarping: 0,
      existentialCorruption: 0,
      quantumEntanglement: 0
    },
    dimensionalArchitecture: {
      layerPenetration: 0,
      crossDimensionalResonance: 0,
      parasiticalDimensionalInfection: 0
    }
  },
  states: {
    initialBreach: {
      on: {
        TRIGGER_DIMENSIONAL_COLLAPSE: {
          target: 'spatialDestabilization',
          actions: 'initializeDimensionalRupture'
        }
      }
    },
    spatialDestabilization: {
      states: {
        quantumFluctuation: {
          on: {
            INDUCE_REALITY_WARP: {
              actions: 'generateSpatialAnomalies',
              target: '#vampireDimensionalMechanics.metaphysicalCascade'
            }
          }
        },
        temporalDisplacement: {
          on: {
            FRACTURE_EXISTENTIAL_TIMELINE: {
              actions: 'propagateTemporalDistortions',
              target: '#vampireDimensionalMechanics.metaphysicalCascade'
            }
          }
        }
      }
    },
    metaphysicalCascade: {
      on: {
        ACTIVATE_DIMENSIONAL_CONVERGENCE: {
          target: 'existentialTransformation',
          actions: 'calculateDimensionalResonance'
        }
      }
    },
    existentialTransformation: {
      on: {
        TRIGGER_PARASITICAL_DIMENSIONAL_INFECTION: {
          target: 'dimensionalJudgment',
          actions: 'initiateExistentialCorruption'
        }
      }
    },
    dimensionalJudgment: {
      on: {
        ASSESS_BREACH_CONSEQUENCES: [
          {
            target: 'dimensionalAscension',
            cond: 'detectTranscendentalConvergence'
          },
          {
            target: 'realityCollapse',
            cond: 'identifyDimensionalDisintegration'
          }
        ]
      }
    },
    dimensionalAscension: {
      type: 'final',
      data: {
        breachOutcome: 'metaphysicalTranscendence'
      }
    },
    realityCollapse: {
      type: 'final',
      data: {
        breachOutcome: 'existentialAnnihilation'
      }
    }
  }
}, {
  actions: {
    initializeDimensionalRupture: (context) => {
      context.dimensionalParameters.spatialDistortion += 30;
      context.breachConsequences.realityWarping += 25;
    },
    generateSpatialAnomalies: (context) => {
      context.dimensionalParameters.metaphysicalInstability += 40;
      context.dimensionalArchitecture.layerPenetration += 35;
    },
    propagateTemporalDistortions: (context) => {
      context.dimensionalParameters.temporalFragmentation += 50;
      context.breachConsequences.quantumEntanglement += 45;
    },
    calculateDimensionalResonance: (context) => {
      const dimensionalIntensity = Object.values(context.dimensionalParameters)
        .reduce((a, b) => a + b, 0);
      context.dimensionalArchitecture.crossDimensionalResonance = dimensionalIntensity;
    },
    initiateExistentialCorruption: (context) => {
      context.breachConsequences.existentialCorruption += 60;
      context.dimensionalArchitecture.parasiticalDimensionalInfection += 55;
    }
  },
  guards: {
    detectTranscendentalConvergence: (context) => 
      context.dimensionalArchitecture.crossDimensionalResonance >= 100,
    identifyDimensionalDisintegration: (context) => 
      context.dimensionalArchitecture.crossDimensionalResonance < 100
  }
});