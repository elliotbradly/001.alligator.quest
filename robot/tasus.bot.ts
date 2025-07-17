import { createMachine, assign, setup } from 'xstate';

import * as SteTas from './tasus.state'
import * as TntTas from '@content/tasus.content'


let tasus = setup({
  actions: {
    initializeGameTime: (context) => {
      context['output'] = ['hi', 'ya']
    }
  },
}).createMachine({
  id: 'tasusRPG',
  initial: SteTas.FIRST_STEP,
  context: {
    count: 0,
    content: [],
  },
  states: {
    FIRST_STEP: {
      entry: assign({
        count: ({ context }) => context.count + 1
      }),
      after: {
        300: 'SECOND_STEP',
      },
    },
    SECOND_STEP: {
      after: {
        300: 'THIRD_STEP',
      },
    },
    THIRD_STEP: {
      after: {
        300: SteTas.MAIN_MENU,
      },
    },
    MAIN_MENU: {
      entry: assign({
        count: ({ context }) => context.count + 1,
        content: TntTas.START_UP(),
      }),
      on: {
        NEW_GAMING: {
          target: SteTas.CHARACTER_CREATION,
          actions: 'initializeGameTime'
        }
      }
    },

    ///#####
    FINISH: {
      entry: assign({
        count: ({ context }) => context.count + 1,
      }),
    },


    CHARACTER_CREATION: {

      initial: SteTas.BACKGROUND_SELECTION,
      onDone: {
        target: SteTas.FINISH,
      },
      states: {
        RESETTING: {
          target: SteTas.MAIN_MENU,
        },
        BACKGROUND_SELECTION: {
          entry: assign({
            content: TntTas.BACKGROUND_SELECTION(),
          }),
          on: {
            FORWARDING: SteTas.TALENT_SELECTION,
          }
        },
        TALENT_SELECTION: {
          entry: assign({
            content: TntTas.TALENT_SELECTION(),
          }),
          on: {
            FORWARDING: SteTas.SKILL_SELECTION,
            BACKWARDING: SteTas.BACKGROUND_SELECTION,
          }
        },
        SKILL_SELECTION: {
          entry: assign({
            content: TntTas.SKILL_SELECTION(),
          }),
          on: {
            FORWARDING: SteTas.CHARACTER_REVIEW,
            BACKWARDING: SteTas.TALENT_SELECTION
          }
        },
        CHARACTER_REVIEW: {
          entry: assign({
            content: TntTas.CHARACTER_REVIEW(),
          }),
          on: {
            FORWARDING: SteTas.CHARACTER_ACCEPT,
            BACKWARDING: SteTas.SKILL_SELECTION
          }
        },
        CHARACTER_ACCEPT: {
          entry: assign({
            content: TntTas.CHARACTER_ACCEPT(),
          }),
          type: 'final',
        }

      }
    }
  }
}
);


export default tasus; 