import { createMachine } from 'xstate';

export const intelligenceGatheringMachine = createMachine({
  id: 'vampireIntelligence',
  initial: 'initialRecon',
  context: {
    intelligenceTechniques: {
      humint: { risk: 0, effectiveness: 0 },
      sigint: { risk: 0, effectiveness: 0 },
      osint: { risk: 0, effectiveness: 0 },
      technical: { risk: 0, effectiveness: 0 }
    },
    currentTarget: null,
    operationalRisk: 0,
    vampireNetworkInsight: 0
  },
  states: {
    initialRecon: {
      on: {
        SELECT_TARGET: {
          actions: 'assignTarget',
          target: 'multiVectorApproach'
        }
      }
    },
    multiVectorApproach: {
      entry: 'initializeIntelligenceMethods',
      on: {
        ACTIVATE_HUMINT: {
          actions: 'executeHumanIntelligence',
          target: 'humanIntelligenceOps'
        },
        ACTIVATE_SIGINT: {
          actions: 'executeSignalsIntelligence',
          target: 'signalsIntelligenceOps'
        }
      }
    },
    humanIntelligenceOps: {
      on: {
        RECRUIT_ASSET: {
          actions: 'recruitInformant',
          target: 'assetManagement'
        },
        INFILTRATE_NETWORK: {
          actions: 'deepCoverInfiltration',
          target: 'covertPenetration'
        }
      }
    },
    signalsIntelligenceOps: {
      on: {
        INTERCEPT_COMMUNICATIONS: {
          actions: 'analyzeInterceptedData',
          target: 'dataCorrelation'
        },
        CYBER_RECONNAISSANCE: {
          actions: 'executeCyberIntelligence',
          target: 'technicalIntelligence'
        }
      }
    },
    assetManagement: {
      on: {
        VALIDATE_ASSET: {
          actions: 'validateInformantCredibility',
          target: 'dataCorrelation'
        },
        ASSET_COMPROMISED: {
          target: 'operationalReset'
        }
      }
    },
    covertPenetration: {
      on: {
        GATHER_INTERNAL_INTEL: {
          actions: 'extractNetworkInformation',
          target: 'dataCorrelation'
        },
        DETECTION_RISK: {
          target: 'operationalReset'
        }
      }
    },
    technicalIntelligence: {
      on: {
        DECRYPT_COMMUNICATIONS: {
          actions: 'processEncryptedData',
          target: 'dataCorrelation'
        },
        TRACE_DIGITAL_FOOTPRINT: {
          actions: 'mapVampireNetworkDigitally',
          target: 'dataCorrelation'
        }
      }
    },
    dataCorrelation: {
      entry: 'correlateIntelligenceSources',
      on: {
        SUFFICIENT_EVIDENCE: {
          target: 'strategicAnalysis',
          cond: 'validateIntelligenceThreshold'
        },
        INSUFFICIENT_DATA: {
          target: 'multiVectorApproach'
        }
      }
    },
    strategicAnalysis: {
      on: {
        PLAN_OPERATION: {
          actions: 'developTargetedStrategy',
          target: 'operationalPreparation'
        }
      }
    },
    operationalPreparation: {
      on: {
        EXECUTE_MISSION: 'missionDeployment'
      }
    },
    operationalReset: {
      on: {
        RESTART_INTELLIGENCE: {
          target: 'initialRecon',
          actions: 'resetOperationalContext'
        }
      }
    },
    missionDeployment: {
      type: 'final'
    }
  }
}, {
  actions: {
    assignTarget: (context, event) => {
      context.currentTarget = event.target;
    },
    executeHumanIntelligence: (context) => {
      context.intelligenceTechniques.humint.risk += 20;
      context.intelligenceTechniques.humint.effectiveness += 15;
    },
    executeSignalsIntelligence: (context) => {
      context.intelligenceTechniques.sigint.risk += 10;
      context.intelligenceTechniques.sigint.effectiveness += 25;
    },
    recruitInformant: (context) => {
      context.vampireNetworkInsight += 15;
      context.operationalRisk += 5;
    },
    validateInformantCredibility: (context) => {
      context.vampireNetworkInsight += 10;
    }
  },
  guards: {
    validateIntelligenceThreshold: (context) => 
      context.vampireNetworkInsight >= 50 && 
      Object.values(context.intelligenceTechniques)
        .some(technique => technique.effectiveness >= 20)
  }
});