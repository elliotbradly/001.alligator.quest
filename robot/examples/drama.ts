import { createMachine, interpret, assign } from 'xstate';

// Define the finite state machine
const dramaEscalationMachine = createMachine({
  id: 'dramaEscalation',
  initial: 'calm',
  context: {
    severity: 0, // Tracks the severity of the drama (0 = no drama, 10 = maximum drama)
    keyPlayers: [], // Tracks individuals involved in the drama
    lastAction: null, // Tracks the last action taken
  },
  states: {
    calm: {
      entry: 'logCalm',
      on: {
        GOSSIP: {
          target: 'minorDrama',
          actions: ['logGossip', 'updateSeverity', 'addKeyPlayer'],
        },
      },
    },
    minorDrama: {
      entry: 'logMinorDrama',
      on: {
        IGNORE: {
          target: 'calm',
          actions: ['logIgnore', 'reduceSeverity'],
        },
        ESCALATE: {
          target: 'majorDrama',
          actions: ['logEscalate', 'updateSeverity', 'addKeyPlayer'],
        },
      },
    },
    majorDrama: {
      entry: 'logMajorDrama',
      on: {
        ADDRESS: {
          target: 'minorDrama',
          actions: ['logAddress', 'reduceSeverity'],
        },
        IGNORE: {
          target: 'corporateScandal',
          actions: ['logIgnore', 'updateSeverity', 'addKeyPlayer'],
        },
      },
    },
    corporateScandal: {
      entry: 'logCorporateScandal',
      on: {
        DAMAGE_CONTROL: {
          target: 'majorDrama',
          actions: ['logDamageControl', 'reduceSeverity'],
        },
        INVESTIGATION: {
          target: 'legalAction',
          actions: ['logInvestigation', 'updateSeverity'],
        },
      },
    },
    legalAction: {
      entry: 'logLegalAction',
      on: {
        SETTLE: {
          target: 'corporateScandal',
          actions: ['logSettle', 'reduceSeverity'],
        },
        LAWSUIT: {
          target: 'publicOutcry',
          actions: ['logLawsuit', 'updateSeverity'],
        },
      },
    },
    publicOutcry: {
      entry: 'logPublicOutcry',
      on: {
        APOLOGY: {
          target: 'legalAction',
          actions: ['logApology', 'reduceSeverity'],
        },
        RESIGNATION: {
          target: 'rebuilding',
          actions: ['logResignation', 'updateSeverity'],
        },
      },
    },
    rebuilding: {
      entry: 'logRebuilding',
      on: {
        REFORM: {
          target: 'calm',
          actions: ['logReform', 'resetContext'],
        },
      },
    },
  },
}, {
  actions: {
    // Logging actions
    logCalm: () => console.log('State: Calm - Everything is normal.'),
    logGossip: () => console.log('Action: Gossip - Minor drama begins.'),
    logMinorDrama: () => console.log('State: Minor Drama - Office gossip is spreading.'),
    logIgnore: () => console.log('Action: Ignored - Drama is being ignored.'),
    logEscalate: () => console.log('Action: Escalated - Drama is getting worse.'),
    logMajorDrama: () => console.log('State: Major Drama - Significant drama is happening.'),
    logAddress: () => console.log('Action: Addressed - Drama is being managed.'),
    logCorporateScandal: () => console.log('State: Corporate Scandal - The drama has become a scandal.'),
    logDamageControl: () => console.log('Action: Damage Control - Trying to mitigate the scandal.'),
    logInvestigation: () => console.log('Action: Investigation - Legal investigation has started.'),
    logLegalAction: () => console.log('State: Legal Action - Legal proceedings are underway.'),
    logSettle: () => console.log('Action: Settled - The issue has been settled.'),
    logLawsuit: () => console.log('Action: Lawsuit - A lawsuit has been filed.'),
    logPublicOutcry: () => console.log('State: Public Outcry - The public is outraged.'),
    logApology: () => console.log('Action: Apology - An apology has been issued.'),
    logResignation: () => console.log('Action: Resignation - Key figures have resigned.'),
    logRebuilding: () => console.log('State: Rebuilding - The company is rebuilding its reputation.'),
    logReform: () => console.log('Action: Reform - Reforms have been implemented.'),

    // Context actions
    updateSeverity: assign({
      severity: (context) => context.severity + 2, // Increase severity by 2
    }),
    reduceSeverity: assign({
      severity: (context) => Math.max(0, context.severity - 1), // Reduce severity by 1 (minimum 0)
    }),
    addKeyPlayer: assign({
      keyPlayers: (context, event) => [
        ...context.keyPlayers,
        event.player || 'Unknown', // Add a key player (if provided in the event)
      ],
    }),
    resetContext: assign({
      severity: 0,
      keyPlayers: [],
      lastAction: null,
    }),
  },
});

// Interpret the machine and start it
const dramaService = interpret(dramaEscalationMachine)
  .onTransition((state) => {
    console.log('Current State:', state.value);
    console.log('Context:', state.context);
  })
  .start();

// Example transitions
dramaService.send({ type: 'GOSSIP', player: 'Alice' }); // Transition to minorDrama
dramaService.send({ type: 'ESCALATE', player: 'Bob' }); // Transition to majorDrama
dramaService.send({ type: 'IGNORE' }); // Transition to corporateScandal
dramaService.send({ type: 'INVESTIGATION' }); // Transition to legalAction
dramaService.send({ type: 'LAWSUIT' }); // Transition to publicOutcry
dramaService.send({ type: 'RESIGNATION' }); // Transition to rebuilding
dramaService.send({ type: 'REFORM' }); // Transition back to calm