import { createMachine } from 'xstate';

export const consequenceChainMachine = createMachine({
  id: 'vampireConsequenceChain',
  initial: 'initialAssessment',
  context: {
    globalThreatLevel: 0,
    agentRisk: {
      exposure: 0,
      credibility: 100,
      survivability: 100
    },
    networkVulnerability: {
      structural: 0,
      informational: 0,
      operational: 0
    },
    consequenceEscalation: {
      diplomatic: 0,
      supernatural: 0,
      technological: 0
    },
    strategicOutcomes: {
      longTermImpact: 0,
      collateralDamage: 0
    }
  },
  states: {
    initialAssessment: {
      on: {
        EVALUATE_MISSION_PARAMETERS: {
          target: 'strategicPlanning',
          actions: 'assessInitialRisks'
        }
      }
    },
    strategicPlanning: {
      on: {
        DETECT_NETWORK_COMPLEXITY: {
          target: 'consequenceAnalysis',
          actions: 'mapNetworkVulnerabilities'
        }
      }
    },
    consequenceAnalysis: {
      states: {
        diplomaticRipples: {
          on: {
            EXPOSE_VAMPIRE_INFLUENCE: {
              actions: 'escalateDiplomaticTension',
              target: '#vampireConsequenceChain.escalationDomain'
            }
          }
        },
        supernaturalPressure: {
          on: {
            REVEAL_HIDDEN_POWER_STRUCTURES: {
              actions: 'destabilizeSupernatural',
              target: '#vampireConsequenceChain.escalationDomain'
            }
          }
        },
        technologicalDisruption: {
          on: {
            COMPROMISE_DIGITAL_INFRASTRUCTURE: {
              actions: 'triggerTechnologicalCollapse',
              target: '#vampireConsequenceChain.escalationDomain'
            }
          }
        }
      },
      on: {
        PROCEED_TO_ESCALATION: 'escalationDomain'
      }
    },
    escalationDomain: {
      on: {
        TRIGGER_SYSTEMIC_CASCADE: {
          target: 'criticalResponsePhase',
          actions: 'initiateCascadingConsequences'
        }
      }
    },
    criticalResponsePhase: {
      on: {
        MANAGE_COLLATERAL_DAMAGE: {
          target: 'strategicResolve',
          actions: 'mitigateUnintendedConsequences'
        }
      }
    },
    strategicResolve: {
      on: {
        CALCULATE_LONG_TERM_IMPACT: {
          target: 'finalConsequenceAssessment',
          actions: 'evaluateStrategicOutcomes'
        }
      }
    },
    finalConsequenceAssessment: {
      on: {
        COMPLETE_MISSION_EVALUATION: [
          {
            target: 'missionSuccess',
            cond: 'validatePositiveOutcome'
          },
          {
            target: 'missionCompromised',
            cond: 'detectCriticalFailure'
          }
        ]
      }
    },
    missionSuccess: {
      type: 'final',
      data: {
        globalImpact: 'vampireNetworkDestabilized'
      }
    },
    missionCompromised: {
      type: 'final',
      data: {
        globalImpact: 'agentNetworkCollapsed'
      }
    }
  }
}, {
  actions: {
    assessInitialRisks: (context) => {
      context.globalThreatLevel += 10;
      context.agentRisk.exposure += 15;
    },
    mapNetworkVulnerabilities: (context) => {
      context.networkVulnerability.structural += 25;
      context.networkVulnerability.informational += 20;
    },
    escalateDiplomaticTension: (context) => {
      context.consequenceEscalation.diplomatic += 30;
      context.agentRisk.credibility -= 15;
    },
    destabilizeSupernatural: (context) => {
      context.consequenceEscalation.supernatural += 40;
      context.networkVulnerability.operational += 35;
    },
    triggerTechnologicalCollapse: (context) => {
      context.consequenceEscalation.technological += 50;
      context.strategicOutcomes.collateralDamage += 25;
    },
    initiateCascadingConsequences: (context) => {
      const totalEscalation = Object.values(context.consequenceEscalation)
        .reduce((a, b) => a + b, 0);
      context.strategicOutcomes.longTermImpact = totalEscalation;
    },
    mitigateUnintendedConsequences: (context) => {
      context.agentRisk.survivability -= 
        context.strategicOutcomes.collateralDamage / 2;
    },
    evaluateStrategicOutcomes: (context) => {
      context.globalThreatLevel = 
        context.strategicOutcomes.longTermImpact / 10;
    }
  },
  guards: {
    validatePositiveOutcome: (context) => 
      context.globalThreatLevel < 50 && 
      context.agentRisk.survivability > 30,
    detectCriticalFailure: (context) => 
      context.globalThreatLevel >= 50 || 
      context.agentRisk.survivability <= 30
  }
});