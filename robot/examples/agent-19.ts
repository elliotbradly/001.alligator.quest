import { createMachine } from 'xstate';

export const comprehensiveSupernaturalConsequenceMachine = createMachine({
  id: 'vampireMetaphysicalComplex',
  initial: 'initialMetaphysicalState',
  context: {
    metaphysicalRisks: {
      spiritualCorruption: {
        intensity: 0,
        propagationVector: 0,
        entropicPressure: 0
      },
      essenceEntanglement: {
        quantumCoherence: 0,
        dimensionalInterference: 0,
        causalityStress: 0
      },
      arcaneResonance: {
        mysticalFrequency: 0,
        magicalEcosystemDisruption: 0,
        ontologicalStrain: 0
      }
    },
    supernaturalManifestations: {
      energeticTransmutations: {
        transmutationComplexity: 0,
        metamorphicPotential: 0,
        existentialVariability: 0
      },
      planarInterferences: {
        dimensionalIntrusion: 0,
        realityWarpingIndex: 0,
        parallelUniverseConvergence: 0
      },
      magicalEcosystemDisruption: {
        systemicResonance: 0,
        metaphysicalEcologyStress: 0,
        cosmicBalanceDeviation: 0
      }
    },
    cosmicConsequenceScale: {
      localReality: {
        stabilityIndex: 0,
        perceptualDistortion: 0,
        consensusRealityPressure: 0
      },
      dimensionalInstability: {
        quantumFluctuations: 0,
        temporalDisplacementIndex: 0,
        spatialIntegrityStress: 0
      },
      metaphysicalEcology: {
        systemicComplexity: 0,
        interconnectednessMetric: 0,
        holisticResonanceAmplitude: 0
      }
    }
  },
  states: {
    initialMetaphysicalState: {
      on: {
        TRIGGER_SUPERNATURAL_CASCADE: {
          target: 'metaphysicalDestabilization',
          actions: 'initiateSupernaturalShift'
        }
      }
    },
    metaphysicalDestabilization: {
      states: {
        spiritualErosion: {
          on: {
            PROPAGATE_ESSENCE_CORRUPTION: {
              actions: 'generateEssentialDecay',
              target: '#vampireMetaphysicalComplex.cosmicResonancePhase'
            }
          }
        },
        planarDisruption: {
          on: {
            GENERATE_DIMENSIONAL_ANOMALIES: {
              actions: 'createInterdimensionalInterference',
              target: '#vampireMetaphysicalComplex.cosmicResonancePhase'
            }
          }
        }
      }
    },
    cosmicResonancePhase: {
      on: {
        ACTIVATE_METAPHYSICAL_CASCADE: {
          target: 'consequenceEscalation',
          actions: 'calculateMetaphysicalResonance'
        }
      }
    },
    consequenceEscalation: {
      on: {
        INVOKE_SUPERNATURAL_JUDGMENT: {
          target: 'finalMetaphysicalTransformation',
          actions: 'triggerComprehensiveMetaphysicalShift'
        }
      }
    },
    finalMetaphysicalTransformation: {
      on: {
        ASSESS_SUPERNATURAL_IMPACT: [
          {
            target: 'cosmicTranscendence',
            cond: 'detectPositiveBifurcation'
          },
          {
            target: 'metaphysicalAnnihilation',
            cond: 'identifyNegativeConvergence'
          }
        ]
      }
    },
    cosmicTranscendence: {
      type: 'final',
      data: {
        cosmicOutcome: 'metaphysicalAscension'
      }
    },
    metaphysicalAnnihilation: {
      type: 'final',
      data: {
        cosmicOutcome: 'existentialDisintegration'
      }
    }
  }
}, {
  actions: {
    initiateSupernaturalShift: (context) => {
      context.metaphysicalRisks.spiritualCorruption.intensity += 25;
      context.metaphysicalRisks.spiritualCorruption.propagationVector += 15;
      context.cosmicConsequenceScale.localReality.stabilityIndex -= 10;
    },
    generateEssentialDecay: (context) => {
      context.supernaturalManifestations.energeticTransmutations.transmutationComplexity += 35;
      context.metaphysicalRisks.essenceEntanglement.quantumCoherence -= 20;
      context.supernaturalManifestations.magicalEcosystemDisruption.systemicResonance += 15;
    },
    createInterdimensionalInterference: (context) => {
      context.supernaturalManifestations.planarInterferences.dimensionalIntrusion += 40;
      context.cosmicConsequenceScale.dimensionalInstability.quantumFluctuations += 25;
      context.metaphysicalRisks.arcaneResonance.ontologicalStrain += 30;
    },
    calculateMetaphysicalResonance: (context) => {
      const metaphysicalIntensity = Object.values(context.metaphysicalRisks)
        .flatMap(risk => Object.values(risk))
        .reduce((a, b) => a + b, 0);
      context.cosmicConsequenceScale.metaphysicalEcology.systemicComplexity = metaphysicalIntensity;
    },
    triggerComprehensiveMetaphysicalShift: (context) => {
      context.supernaturalManifestations.magicalEcosystemDisruption.cosmicBalanceDeviation += 50;
      context.metaphysicalRisks.arcaneResonance.mysticalFrequency += 30;
      context.cosmicConsequenceScale.metaphysicalEcology.interconnectednessMetric += 25;
    }
  },
  guards: {
    detectPositiveBifurcation: (context) => 
      context.cosmicConsequenceScale.metaphysicalEcology.systemicComplexity >= 150,
    identifyNegativeConvergence: (context) => 
      context.cosmicConsequenceScale.metaphysicalEcology.systemicComplexity < 150
  }
});