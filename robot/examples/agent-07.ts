import { createMachine } from 'xstate';

export const investigativeMachine = createMachine({
  id: 'investigativeMission',
  initial: 'gathering',
  context: {
    cluesCollected: 0,
    investigativeTechniques: [
      'surveillance', 
      'humint', 
      'digital_forensics', 
      'occult_research'
    ],
    vampireNetworkExposure: 0
  },
  states: {
    gathering: {
      on: {
        COLLECT_CLUE: {
          actions: 'incrementClues',
          target: 'analyzing'
        },
        VAMPIRE_NETWORK_INSIGHT: {
          actions: 'exposeVampireNetwork',
          target: 'strategizing'
        }
      }
    },
    analyzing: {
      on: {
        CROSS_REFERENCE: {
          actions: 'correlateClues',
          target: 'strategizing'
        },
        INSUFFICIENT_EVIDENCE: 'gathering'
      }
    },
    strategizing: {
      on: {
        DEVELOP_TACTICAL_APPROACH: {
          target: 'activeOperation',
          actions: 'prepareMissionStrategy'
        },
        DETECT_COUNTERINTELLIGENCE: {
          target: 'compromised'
        }
      }
    },
    compromised: {
      on: {
        BURN_PROTOCOL: 'failedMission',
        ESCAPE_AND_REGROUP: 'gathering'
      }
    },
    activeOperation: {
      on: {
        EXECUTE_INVESTIGATION: {
          target: 'conclusive',
          cond: 'hasEnoughEvidence'
        },
        MISSION_RISK: 'compromised'
      }
    },
    conclusive: {
      type: 'final',
      data: {
        outcome: 'vampireNetworkExposed'
      }
    },
    failedMission: {
      type: 'final',
      data: {
        outcome: 'investigationCompromised'
      }
    }
  }
}, {
  actions: {
    incrementClues: (context) => {
      context.cluesCollected += 1;
    },
    exposeVampireNetwork: (context) => {
      context.vampireNetworkExposure += 25;
    },
    correlateClues: (context) => {
      context.investigativeTechniques.push('advanced_correlation');
    },
    prepareMissionStrategy: (context) => {
      context.investigativeTechniques.push('targeted_infiltration');
    }
  },
  guards: {
    hasEnoughEvidence: (context) => 
      context.cluesCollected >= 3 && context.vampireNetworkExposure > 50
  }
});