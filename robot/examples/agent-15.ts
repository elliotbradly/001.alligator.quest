import { createMachine } from 'xstate';

export const supernaturalConsequenceMachine = createMachine({
  id: 'vampireSupernaturalConsequences',
  initial: 'initialMetaphysicalState',
  context: {
    metaphysicalRisks: {
      spiritualCorruption: 0,
      dimensionalInstability: 0,
      essenceEntanglement: 0
    },
    supernaturalManifestations: {
      bloodlineAberrations: 0,
      temporalDistortions: 0,
      energyTransmutations: 0
    },
    cosmicConsequenceScale: {
      localReality: 0,
      globalMysticalField: 0,
      interdimensionalEchoes: 0
    }
  },
  states: {
    initialMetaphysicalState: {
      on: {
        BREACH_SUPERNATURAL_BARRIER: {
          target: 'metaphysicalDestabilization',
          actions: 'triggerInitialMetaphysicalShift'
        }
      }
    },
    metaphysicalDestabilization: {
      states: {
        spiritualCorruption: {
          on: {
            ESCALATE_ESSENCE_CONTAMINATION: {
              actions: 'propagateSpiritualDecay',
              target: '#vampireSupernaturalConsequences.cosmicResonancePhase'
            }
          }
        },
        dimensionalFracture: {
          on: {
            TRIGGER_REALITY_WARP: {
              actions: 'generateTemporalAnomalies',
              target: '#vampireSupernaturalConsequences.cosmicResonancePhase'
            }
          }
        }
      }
    },
    cosmicResonancePhase: {
      on: {
        MANIFEST_SUPERNATURAL_CONSEQUENCE: {
          target: 'consequenceEscalation',
          actions: 'calculateCausalResonance'
        }
      }
    },
    consequenceEscalation: {
      on: {
        UNLEASH_METAPHYSICAL_CASCADE: {
          target: 'finalMetaphysicalJudgment',
          actions: 'triggerComprehensiveMetaphysicalShift'
        }
      }
    },
    finalMetaphysicalJudgment: {
      on: {
        ASSESS_SUPERNATURAL_IMPACT: [
          {
            target: 'metastaticTransformation',
            cond: 'detectCataclysmicShift'
          },
          {
            target: 'mysticalEquilibrium',
            cond: 'maintainResonanceBalance'
          }
        ]
      }
    },
    metastaticTransformation: {
      type: 'final',
      data: {
        cosmicOutcome: 'realityFundamentallyAltered'
      }
    },
    mysticalEquilibrium: {
      type: 'final',
      data: {
        cosmicOutcome: 'balanceRestored'
      }
    }
  }
}, {
  actions: {
    triggerInitialMetaphysicalShift: (context) => {
      context.metaphysicalRisks.spiritualCorruption += 25;
      context.cosmicConsequenceScale.localReality += 15;
    },
    propagateSpiritualDecay: (context) => {
      context.supernaturalManifestations.bloodlineAberrations += 35;
      context.metaphysicalRisks.essenceEntanglement += 20;
    },
    generateTemporalAnomalies: (context) => {
      context.supernaturalManifestations.temporalDistortions += 40;
      context.cosmicConsequenceScale.interdimensionalEchoes += 25;
    },
    calculateCausalResonance: (context) => {
      const metaphysicalIntensity = Object.values(context.metaphysicalRisks)
        .reduce((a, b) => a + b, 0);
      context.cosmicConsequenceScale.globalMysticalField = metaphysicalIntensity;
    },
    triggerComprehensiveMetaphysicalShift: (context) => {
      context.supernaturalManifestations.energyTransmutations += 50;
    }
  },
  guards: {
    detectCataclysmicShift: (context) => 
      context.cosmicConsequenceScale.globalMysticalField >= 75,
    maintainResonanceBalance: (context) => 
      context.cosmicConsequenceScale.globalMysticalField < 75
  }
});