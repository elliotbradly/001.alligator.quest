
//WANT: FUNFOOT
import { setup, createMachine } from 'xstate'

import * as SteFun from './funfoot.state'

export const machine = (bus, entry, exit, track, ) => {

    let bot = setup({
        actions: { ENTRY: entry, EXIT:  exit, TRACK: track},
    }).createMachine({
        /** @xstate-layout N4IgpgJg5mDOIC5QAoC2BDAxgCwJYDswBKAOgDEB5AGSooHUBiACQFUA5AcQFEAlASU4BtAAwBdRKAAOAe1i4ALrmn4JIAB6IAnJoCsJACwA2fQHYAzDoBMw0-oCMADgA0IAJ6IAtPod6zDh5p+Jvo6OobBAL4RLmhYeISklDT0DGwUAMoCHCLiSCAycorKqhoIAQ4kZqaOdjoOVXaW+i7uCB6WhhWa1oaawsLhmnbCJlExGDgExOTUtIy0mUJiqgUKSip5pRaWJDomJjpmI2baR6YtnmZHlQ6WDtXmQ3VjILGTCSTpAMIAgmwMSTmWRyK1ka2Km0Qlh0+hI3V0dk0hkOZmsZguCBRJEcwh0wwcwk0Pjs+heb3i02+fwYVB+XwA0sDlnlVkUNqBStDYfC8UiUWiMTpdCRDMMkY19IEbDoyRMKaQ0ukuADZvQmbkpGC2SUoTC4ZYEXyrgK3IhkRUbCS7HZOg4DiZDLK4lMFRllbSGerQYV1jqECShiRjiSdMIOkZ7hiPCSRf1oWjbo48aToq85S6SAsACo0umMpYa-Ja32QzE2kgmYQnSxmQxmB0O9GmtqGToVhwSsyI4QOOsOJ3vabZhhUthsL0s4sQjmIRoBEjQgImXSaSumHRR-awyt9Wt7yzBSwD+UkACKLC4bC+TBVyToE81Pun6kQoT0BvsunCvSJJgxTU0bFzAdKxQmsepjwzc9L2vXNPQLb1wXZF9MVCBdNE-MIHW0O0MQsYQgyqAk7CqcxDCrSCPg9ekGGgq8mAfIsn2Q0o33QzDvxwv9mwNQDyP0O4rmEOd9DMSihzzOD82yZlHyQv1akRAwjkrLcDkjZsPBMHZrUsa1W2XQ4DkdVNyQzdIfizPh0jIABNWiL3oxjWRLGcECaWFjEJXsjBMa1pX-EwKjuQkRhhWpRJM8ZnQ+CyrJs+zqOcqcWKhfRPP0bzjHCfyQgxUwCIOfpyPrKsiTE0z0w+VhOF4BguEs5LmIUm09AOWwjGlEkMUUuE8X8XpSusMJxNIBqczi6y7Ka+TS30tqYWCTqQm65shTsAxkS7QJAkiirosHUh0izRqvgAfQABQyTIACE+CoPgs3sigLsvGbtVLA4dkOSVJXuUU7WaTThgsbF0uTILDHA0ZKpi6YLpYHguDOsg+C+KyKH+QE1QQydms+nw4QGGFe1qJFLEsKM+wrPZ620YxfNGkgswoE6qDO9IWBugBZazMkx+rGtxuSPrcjyRUyolsr84Y8p4xplLK5FVOCCrU3waQIDgVQzISRDRZQjw0Jse57Apnwrm0KNGl6XZrSFO5vG-FMDpPbG6H11yUMlQDgINA8fBrStDCjKozF2Op0t6O1KwNJnR0959ShJAZsT2JEiQGiwN00-Y2u87pURCA4ZVhw6SEVLhE9S-1pWxHxdErPYq241oPAJAwIrDTpQwJGwmezau-QpkwRVV0JRV8xpW88cjDBIf7+hhPpvCuJm6OvIfSxOXxpbxBtyv-ASFw7fxESGIY7AHvMt7ciK9CMGs7ErW4godPCSN2CxtI6PEbXreOjUEq3xQlUQiphkQj28GGSmzYqiAUcESEiww6yQyZjVbgPAQHJ0QfqUM61LR1FgW3esFQz6-iGASbw0ImbjWwbOI44cmidDItoYYewerIkqEmRoqIAhhE0PHE6VlzpXXSLde6j1bL0IQH5HYvY-CA1DEYRE1tHA7BboEG0FN4yl1dhmBGSMUZowxmwGRwQNqk26D4fetYQ6aV0HoHaVY9jkTYYIsuJ4WZsw5lzXm4i+CYxkVpIM3h0qNDuCiIkmhNzXH6LtcwVwBK1iiFEIAA */
     
        context: {
            committedValue: '',
            value: ""
        },


        initial: SteFun.TELEPORT,
        states: {
            
            TELEPORT: {

                entry: [{ type: SteFun.ENTRY, params: { ste: SteFun.TELEPORT } }],
                exit: [{ type: SteFun.EXIT, params: { ste: SteFun.TELEPORT } }],

                on: {
                    TELEPORTING: { target: SteFun.STAND }
                }

            },


            STAND: {

                entry: [{ type: SteFun.ENTRY, params: { ste: SteFun.STAND } }],
                exit: [{ type: SteFun.EXIT, params: { ste: SteFun.STAND } }],

                on: {
                    FOLLOWING: { target: SteFun.FOLLOW }
                }

            },
            
            FOLLOW: {

                entry: [{ type: SteFun.ENTRY, params: { ste: SteFun.FOLLOW } }],
                exit: [{ type: SteFun.EXIT, params: { ste: SteFun.FOLLOW } }],

                on: {
                    HUNGERING: { target: SteFun.HUNGER },
                    NOSING: { target: SteFun.NOSE },
                    LOSING: { target: SteFun.LOST },
                }

            },


            SCAN: {

                entry: [{ type: SteFun.ENTRY, params: { ste: SteFun.NOSE } }],
                exit: [{ type: SteFun.EXIT, params: { ste: SteFun.NOSE } }],

                on: {
                    FOLLOWING: { target: SteFun.FOLLOW },
                    LACKING: { target: SteFun.LACK }
                }

            },

            
            NOSE: {

                entry: [{ type: SteFun.ENTRY, params: { ste: SteFun.NOSE } }],
                exit: [{ type: SteFun.EXIT, params: { ste: SteFun.NOSE } }],

                on: {
                    FOLLOWING: { target: SteFun.FOLLOW },
                    LACKING: { target: SteFun.LACK }
                }

            },

            LOST: {

                entry: [{ type: SteFun.ENTRY, params: { ste: SteFun.LOST } }],
                exit: [{ type: SteFun.EXIT, params: { ste: SteFun.LOST } }],

                on: {
                    LACKING: { target: SteFun.LACK },
                    SCANNING: {target: SteFun.SCAN }
                }

            },

            QUENCH: {

                entry: [{ type: SteFun.ENTRY, params: { ste: SteFun.QUENCH } }],
                exit: [{ type: SteFun.EXIT, params: { ste: SteFun.QUENCH } }],

                on: {
                    FOLLOWING: { target: SteFun.FOLLOW },
                    LACKING: { target: SteFun.LACK }
                }

            },

            LACK: {

                entry: [{ type: SteFun.ENTRY, params: { ste: SteFun.FOLLOW } }],
                exit: [{ type: SteFun.EXIT, params: { ste: SteFun.FOLLOW } }],

                on: {
                    QUENCHING: { target: SteFun.QUENCH },
                    HOWLING:  { target: SteFun.HOWL },
                    SCREAMING: { target: SteFun.SCREAM }
                }

            },

            HOWL: {

                entry: [{ type: SteFun.ENTRY, params: { ste: SteFun.HOWL } }],
                exit: [{ type: SteFun.EXIT, params: { ste: SteFun.HOWL } }],

                on: {
                    FOLLOWING: { target: SteFun.FOLLOW }
                }

            },

            SCREAM: {

                entry: [{ type: SteFun.ENTRY, params: { ste: SteFun.FOLLOW } }],
                exit: [{ type: SteFun.EXIT, params: { ste: SteFun.FOLLOW } }],

                on: {
                    SUBMITTING: { target: SteFun.TOTAL_SUBMISSION }
                }

            },

            SATISFY: {

                entry: [{ type: SteFun.ENTRY, params: { ste: SteFun.FOLLOW } }],
                exit: [{ type: SteFun.EXIT, params: { ste: SteFun.FOLLOW } }],

                on: {
                    QUENCHING: { target: SteFun.QUENCH },
                    LACKING: { target: SteFun.LACK }
                }

            },

            HUNGER: {

                entry: [{ type: SteFun.ENTRY, params: { ste: SteFun.FOLLOW } }],
                exit: [{ type: SteFun.EXIT, params: { ste: SteFun.FOLLOW } }],

                on: {
                    EATING: { target: SteFun.EAT }
                }

            },

            EAT: {

                entry: [{ type: SteFun.ENTRY, params: { ste: SteFun.FOLLOW } }],
                exit: [{ type: SteFun.EXIT, params: { ste: SteFun.FOLLOW } }],

                on: {
                    BITING: { target: SteFun.BITE },
                    SATISFYING: { target: SteFun.SATISFY }
                }

            },

            BITE: {

                entry: [{ type: SteFun.ENTRY, params: { ste: SteFun.BITE } }],
                exit: [{ type: SteFun.EXIT, params: { ste: SteFun.BITE } }],

                on: {
                    EATING: { target: SteFun.EAT }
                }

            },

            STATIC_POSSIBILITY: {

                entry: [{ type: SteFun.ENTRY, params: { ste: SteFun.STATIC_POSSIBILITY } }],
                exit: [{ type: SteFun.EXIT, params: { ste: SteFun.STATIC_POSSIBILITY } }],

                on: {
                    OPENING: { target: SteFun.PURE_FICTION }
                }
            },

            PURE_FICTION: {

                entry: [{ type: SteFun.ENTRY, params: { ste: SteFun.PURE_FICTION } }],
                
                on: {
                    FOLLOWING: {
                        actions: [
                            {
                                type: SteFun.TRACK,
                                params: { ste: SteFun.FOLLOWING },
                            },
                        ],
                        target: SteFun.FOLLOW
                    }
                }


            },

            TOTAL_SUBMISSION: {
                on: {
                    EATING: {
                        target: SteFun.PURE_FICTION
                    }
                }
            }
        }
    })





    return bot

    //smirking
//lurking
//eating
//brooding
//glowing
//waking
//crashing
//tracking
//sizing
//sneering
//freezing
//dodging
//studying
//responding
//collecting
//following
//tumbling
//trekking
//trudging
//longing
//wanting
//walking
//reaching
//counting
//trembling
//heaving
//foreboding
//sighing
//rumbling
//rising
//drifting



}  



//async (_, params: { ste: string }) => {

//
  //  switch ( params.ste) {
//
      //  case STATIC_POSSIBILITY:
    //   
        //missin you now

      //  break
   // }


    //const queryFn = async () => {

    //     const response = await fetch('/api/moon')
    //     if (!response.ok) {
    //         throw new Error('Network response was not ok')
    //     }
    //     return response.json()

    // }

    // const bit = await queryFn()
    // console.log(JSON.stringify(bit))
   // _.self.send({ type: OPENING })//
//},

