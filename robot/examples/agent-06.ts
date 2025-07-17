import { createMachine } from 'xstate';

export const agentMissionMachine = createMachine({
  id: 'agentMission',
  initial: 'preparation',
  context: {
    mission: null,
    complications: 0,
    vampireEncountered: false,
    burnNotice: false
  },
  states: {
    preparation: {
      on: {
        START_MISSION: {
          target: 'activeOperation',
          actions: 'resetMissionContext'
        }
      }
    },
    activeOperation: {
      on: {
        ENCOUNTER_VAMPIRE: {
          target: 'vampireConfrontation',
          actions: 'markVampireEncounter'
        },
        MISSION_COMPLICATION: {
          actions: 'incrementComplications',
          target: 'missionComplicated'
        },
        COMPLETE_OBJECTIVE: 'missionSuccess'
      }
    },
    vampireConfrontation: {
      on: {
        DEFEAT_VAMPIRE: 'missionSuccess',
        VAMPIRE_ESCAPE: 'missionFailed',
        TACTICAL_RETREAT: 'activeOperation'
      }
    },
    missionComplicated: {
      on: {
        RESOLVE_COMPLICATION: 'activeOperation',
        TOO_MANY_COMPLICATIONS: 'missionFailed'
      }
    },
    missionSuccess: {
      type: 'final',
      data: {
        outcome: 'success'
      }
    },
    missionFailed: {
      type: 'final',
      data: {
        outcome: 'failure'
      }
    }
  }
}, {
  actions: {
    resetMissionContext: (context) => {
      context.complications = 0;
      context.vampireEncountered = false;
    },
    markVampireEncounter: (context) => {
      context.vampireEncountered = true;
    },
    incrementComplications: (context) => {
      context.complications += 1;
    }
  }
});