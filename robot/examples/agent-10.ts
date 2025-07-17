import { createMachine } from 'xstate';

export const locationIntelligenceMachine = createMachine({
  id: 'vampireLocationIntel',
  initial: 'missionBriefing',
  context: {
    currentLocation: null,
    locationTypes: {
      urban: { penetration: 0, risk: 0 },
      diplomatic: { penetration: 0, risk: 0 },
      underground: { penetration: 0, risk: 0 },
      international: { penetration: 0, risk: 0 }
    },
    missionObjectives: [],
    locationIntelligence: 0
  },
  states: {
    missionBriefing: {
      on: {
        SELECT_LOCATION: {
          actions: 'assignLocationContext',
          target: 'locationReconnaissance'
        }
      }
    },
    locationReconnaissance: {
      states: {
        urban: {
          on: {
            INVESTIGATE_NIGHTLIFE: {
              actions: 'urbanNetworkPenetration',
              target: '#vampireLocationIntel.intelligenceGathering'
            }
          }
        },
        diplomatic: {
          on: {
            EXPLOIT_POLITICAL_CHANNELS: {
              actions: 'diplomaticIntelligenceGathering',
              target: '#vampireLocationIntel.intelligenceGathering'
            }
          }
        },
        underground: {
          on: {
            EXPLORE_HIDDEN_NETWORKS: {
              actions: 'undergroundInfiltration',
              target: '#vampireLocationIntel.intelligenceGathering'
            }
          }
        },
        international: {
          on: {
            CROSS_BORDER_INVESTIGATION: {
              actions: 'internationalNetworkMapping',
              target: '#vampireLocationIntel.intelligenceGathering'
            }
          }
        }
      },
      on: {
        SWITCH_LOCATION_TYPE: {
          target: 'locationReconnaissance',
          actions: 'updateLocationStrategy'
        }
      }
    },
    intelligenceGathering: {
      on: {
        COLLECT_LOCAL_INTEL: {
          actions: 'accumulateLocationIntelligence',
          target: 'strategicAnalysis'
        }
      }
    },
    strategicAnalysis: {
      on: {
        DEVELOP_LOCATION_STRATEGY: {
          actions: 'refineLocationApproach',
          target: 'missionExecution'
        }
      }
    },
    missionExecution: {
      on: {
        MISSION_COMPLETE: 'missionSuccess',
        MISSION_COMPROMISED: 'missionFailure'
      }
    },
    missionSuccess: {
      type: 'final',
      data: {
        locationIntelligence: 'accumulated'
      }
    },
    missionFailure: {
      type: 'final',
      data: {
        locationIntelligence: 'lost'
      }
    }
  }
}, {
  actions: {
    assignLocationContext: (context, event) => {
      context.currentLocation = event.location;
      context.missionObjectives = event.objectives || [];
    },
    urbanNetworkPenetration: (context) => {
      context.locationTypes.urban.penetration += 25;
      context.locationIntelligence += 15;
    },
    diplomaticIntelligenceGathering: (context) => {
      context.locationTypes.diplomatic.penetration += 20;
      context.locationIntelligence += 20;
    },
    undergroundInfiltration: (context) => {
      context.locationTypes.underground.penetration += 30;
      context.locationIntelligence += 25;
    },
    internationalNetworkMapping: (context) => {
      context.locationTypes.international.penetration += 15;
      context.locationIntelligence += 10;
    },
    accumulateLocationIntelligence: (context) => {
      context.locationIntelligence += 5;
    }
  }
});