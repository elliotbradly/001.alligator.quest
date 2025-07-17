import { createMachine } from 'xstate';

export const vampireMissionBranchingMachine = createMachine({
  id: 'vampireMissionBranches',
  initial: 'missionInitiation',
  context: {
    missionParameters: {
      difficulty: 0,
      complexity: 0,
      adaptability: 0
    },
    agentCapabilities: {
      infiltration: 0,
      combat: 0,
      negotiation: 0,
      techIntelligence: 0
    },
    missionOutcomeModifiers: {
      diplomaticRisk: 0,
      vampireAwareness: 0,
      collateralDamage: 0
    },
    narrativeBranches: {
      currentBranch: null,
      exploredPaths: []
    }
  },
  states: {
    missionInitiation: {
      on: {
        ASSESS_MISSION_PROFILE: {
          target: 'strategicBranchSelection',
          actions: 'evaluateMissionParameters'
        }
      }
    },
    strategicBranchSelection: {
      on: {
        SELECT_INFILTRATION_PATH: [
          {
            target: 'diplomaticInfiltration',
            cond: 'canExecuteDiplomaticApproach'
          },
          {
            target: 'violentConfrontation',
            cond: 'requiresCombativeSolution'
          }
        ]
      }
    },
    diplomaticInfiltration: {
      states: {
        initialContact: {
          on: {
            NEGOTIATE_VAMPIRE_CONTACT: [
              {
                target: 'deepCoverNegotiation',
                cond: 'successfulInitialApproach'
              },
              {
                target: 'negotiationBackfire',
                cond: 'failedNegotiationAttempt'
              }
            ]
          }
        },
        deepCoverNegotiation: {
          on: {
            EXPLOIT_VAMPIRE_HIERARCHY: {
              target: 'networkManipulation',
              actions: 'infiltrateVampireStructures'
            }
          }
        },
        negotiationBackfire: {
          on: {
            EMERGENCY_EXTRACTION: {
              target: '#vampireMissionBranches.emergencyProtocols'
            }
          }
        }
      }
    },
    violentConfrontation: {
      states: {
        initialEngagement: {
          on: {
            TACTICAL_ASSAULT: [
              {
                target: 'strategicElimination',
                cond: 'successfulCombatInitiation'
              },
              {
                target: 'combatCompromise',
                cond: 'combatFailure'
              }
            ]
          }
        },
        strategicElimination: {
          on: {
            NEUTRALIZE_VAMPIRE_LEADERSHIP: {
              target: 'operationalCleanup',
              actions: 'disruptVampireNetwork'
            }
          }
        },
        combatCompromise: {
          on: {
            TACTICAL_RETREAT: {
              target: '#vampireMissionBranches.emergencyProtocols'
            }
          }
        }
      }
    },
    networkManipulation: {
      on: {
        INTERNAL_VAMPIRE_CONFLICT: {
          target: 'narrativeResolution',
          actions: 'maximizeNetworkDisruption'
        }
      }
    },
    operationalCleanup: {
      on: {
        COVER_MISSION_TRACKS: {
          target: 'narrativeResolution',
          actions: 'mitigateCollateralDamage'
        }
      }
    },
    emergencyProtocols: {
      on: {
        ACTIVATE_CONTINGENCY_PLAN: {
          target: 'narrativeResolution',
          actions: 'minimizeMissionRisk'
        }
      }
    },
    narrativeResolution: {
      on: {
        EVALUATE_MISSION_OUTCOME: [
          {
            target: 'missionSuccess',
            cond: 'validatePositiveOutcome'
          },
          {
            target: 'missionFailure',
            cond: 'detectMissionCompromise'
          }
        ]
      }
    },
    missionSuccess: {
      type: 'final',
      data: {
        outcomeType: 'vampireNetworkDestabilized'
      }
    },
    missionFailure: {
      type: 'final',
      data: {
        outcomeType: 'agentCompromised'
      }
    }
  }
}, {
  actions: {
    evaluateMissionParameters: (context) => {
      context.missionParameters.difficulty += 25;
      context.missionParameters.complexity += 20;
    },
    infiltrateVampireStructures: (context) => {
      context.agentCapabilities.infiltration += 35;
      context.missionOutcomeModifiers.vampireAwareness += 15;
    },
    disruptVampireNetwork: (context) => {
      context.agentCapabilities.combat += 40;
      context.missionOutcomeModifiers.collateralDamage += 25;
    },
    maximizeNetworkDisruption: (context) => {
      context.agentCapabilities.negotiation += 30;
      context.missionOutcomeModifiers.diplomaticRisk += 20;
    },
    minimizeMissionRisk: (context) => {
      context.agentCapabilities.techIntelligence += 25;
    }
  },
  guards: {
    canExecuteDiplomaticApproach: (context) => 
      context.agentCapabilities.negotiation >= 25,
    requiresCombativeSolution: (context) => 
      context.missionParameters.difficulty > 50,
    successfulInitialApproach: (context) => 
      Math.random() > 0.5,
    failedNegotiationAttempt: (context) => 
      Math.random() <= 0.5,
    successfulCombatInitiation: (context) => 
      context.agentCapabilities.combat >= 30,
    combatFailure: (context) => 
      context.agentCapabilities.combat < 30,
    validatePositiveOutcome: (context) => 
      context.agentCapabilities.infiltration > 50 && 
      context.missionOutcomeModifiers.vampireAwareness < 40,
    detectMissionCompromise: (context) => 
      context.agentCapabilities.infiltration <= 50 || 
      context.missionOutcomeModifiers.vampireAwareness >= 40
  }
});