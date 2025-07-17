import { createMachine, setup } from 'xstate'
import * as SteSmp from './simple.state'


export const machine = () => {

    let bot = createMachine({
        /** @xstate-layout N4IgpgJg5mDOIC5QAoC2BDAxgCwJYDswBKAOgHkA5AUQGIAVAdTIEkKBxAbQAYBdRUAA4B7WLgAuuIfn4gAHogAsADhIKAnGq4A2AIxcArFoBMa-QHYjAGhABPRDtMkAzJrVK1TrS50L1AXz9rNCw8QlJGMhpKKlZOXhlhUQkpGXkEfS4SfQ1jM20M030nazsEJ2ySMyd3By5qp201AKCMHAJiEgj6AAkAJSoY9m4+JBBE8UlpUbSFHRINBcWlksQGtWcuJQVtXx0zBSMFZpBgtrDOvoGo6ljhhJEJlOnEDKycozytAv0ilYQlOYKKpaMw6L5KfIKJwBQIgfBCCBwGSnULEe5JSapRAAWi0JC4BMJRKJZj+2P08yWVI00NhKPapGi6MeU1AM3W1S4eyUWh5Cn0SjMSj+RleSiMOgyDi0XCBTTprVR4SYzOSrLkig5EO5vK0-MFwtsiklJDBaihYKcylBvmO9POdEuVFVmOeCHUzm1Qt1+qFfx0nnmsp0W1FCmMGiOMKAA */
 
        context: {
            committedValue: '',
            value: ""
        },

        initial: SteSmp.THREE,
        states: {

            ONE: {
                on: {
                    TWOING: { target: SteSmp.TWO }
                }
            },


            TWO: {
                on: {
                    ONEING: { target: SteSmp.ONE },
                    THREEING: { target: SteSmp.THREE }
                }
            },

            THREE: {
                on: {
                    ONEING: { target: SteSmp.ONE },
                }

            }
        }
    })




    return bot
}
