import { createMachine } from 'xstate';

export const tacticalIntelligenceMachine = createMachine({
  id: 'vampireTacticalIntel',
  initial: 'strategicPlanning',
  context: {
    tacticalApproaches: {
      deception: { effectiveness: 0, risk: 0 },
      directConfrontation: { effectiveness: 0, risk: 0 },
      subterfuge: { effectiveness: 0, risk: 0 },
      psychological: { effectiveness: 0, risk: 0 }
    },
    operationalCapabilities: {
      infiltration: 0,
      counterintelligence: 0,
      networkDisruption: 0
    },
    vampireNetworkVulnerability: 0
  },
  states: {
    strategicPlanning: {
      on: {
        SELECT_TACTICAL_APPROACH: [
          {
            target: 'deceptionOperations',
            cond: 'canExecuteDeception'
          },
          {
            target: 'subterfugeOperations',
            cond: 'canExecuteSubterfuge'
          }
        ]
      }
    },
    deceptionOperations: {
      entry: 'initializeDeceptionStrategy',
      on: {
        PLANT_FALSE_INTELLIGENCE: {
          actions: 'executeFalseFlag',
          target: 'networkManipulation'
        },
        COMPROMISE_VAMPIRE_ASSET: {
          actions: 'manipulateVampireNetwork',
          target: 'networkDisruption'
        }
      }
    },
    subterfugeOperations: {
      entry: 'initializeSubterfugeStrategy',
      on: {
        INFILTRATE_INNER_CIRCLE: {
          actions: 'deepCoverPenetration',
          target: 'networkInfiltration'
        },
        PSYCHOLOGICAL_WARFARE: {
          actions: 'executepsychological',
          target: 'networkManipulation'
        }
      }
    },
    networkInfiltration: {
      on: {
        EXTRACT_CRITICAL_INTELLIGENCE: {
          actions: 'gatherNetworkVulnerabilities',
          target: 'networkDisruption'
        }
      }
    },
    networkManipulation: {
      on: {
        DISRUPT_COMMUNICATION: {
          actions: 'isolateVampireNetwork',
          target: 'tacticalStrike'
        }
      }
    },
    networkDisruption: {
      on: {
        NEUTRALIZE_KEY_ASSETS: {
          actions: 'eliminateNetworkInfrastructure',
          target: 'tacticalStrike'
        }
      }
    },
    tacticalStrike: {
      on: {
        EXECUTE_FINAL_OPERATION: {
          target: 'operationOutcome',
          actions: 'assessNetworkCollapse'
        }
      }
    },
    operationOutcome: {
      on: {
        SUCCESS: 'missionAccomplished',
        PARTIAL_SUCCESS: 'strategicRetreat',
        COMPLETE_FAILURE: 'operationalLoss'
      }
    },
    missionAccomplished: {
      type: 'final',
      data: { outcome: 'vampireNetworkDestroyed' }
    },
    strategicRetreat: {
      type: 'final',
      data: { outcome: 'networkWeakened' }
    },
    operationalLoss: {
      type: 'final',
      data: { outcome: 'missionFailed' }
    }
  }
}, {
  actions: {
    initializeDeceptionStrategy: (context) => {
      context.tacticalApproaches.deception.effectiveness += 20;
    },
    executeFalseFlag: (context) => {
      context.vampireNetworkVulnerability += 15;
      context.operationalCapabilities.counterintelligence += 10;
    },
    deepCoverPenetration: (context) => {
      context.operationalCapabilities.infiltration += 25;
      context.vampireNetworkVulnerability += 20;
    },
    isolateVampireNetwork: (context) => {
      context.operationalCapabilities.networkDisruption += 30;
    },
    assessNetworkCollapse: (context) => {
      context.vampireNetworkVulnerability >= 70 
        ? context.tacticalApproaches.deception.effectiveness = 100
        : context.tacticalApproaches.deception.risk += 50;
    }
  },
  guards: {
    canExecuteDeception: (context) => 
      context.operationalCapabilities.counterintelligence >= 20,
    canExecuteSubterfuge: (context) => 
      context.operationalCapabilities.infiltration >= 15
  }
});