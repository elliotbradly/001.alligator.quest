
//WANT: FUNFOOT
import { setup, createMachine } from 'xstate'

export const STATIC_POSSIBILITY = 'STATIC_POSSIBILITY'
export const PURE_FICTION = "PURE_FICTION";
export const TOTAL_SUBMISSION = "TOTAL_SUBMISSION";

export const FOLLOW = "FOLLOW";
export const HUNGER = "HUNGER";
export const EAT = "EAT";
export const NOSE = "NOSE";
export const LOST = "LOST";
export const SCAN = "SCAN";
export const SCREAM = "SCREAM";
export const SATISFY = "SATISFY";
export const QUENCH = "QUENCH";
export const LACK = "LACK";
export const HOWL = "HOWL";
export const BITE = "BITE";
export const STAND = "STAND";
export const TELEPORT = "TELEPORT";


export const OPENING = "OPENING";
export const PRESSURING = "PRESSURING";
export const EATING = "EATING";
export const FOLLOWING = "FOLLOWING";
export const HUNGERING = "HUNGERING";
export const SATISFYING = 'SATISFYING'
export const QUENCHING = "QUENCHING";
export const LACKING = "LACKING";
export const SCANNING = "SCANNING";
export const HOWLING = "HOWLING";
export const NOSING = "NOSING";
export const LOSING = "LOSING";
export const STANDING = "STANDING";
export const PORTALING = "PORTALING";
export const SCREAMING = "SCREAMING";
export const SUBMITTING = "SUBMITTING";
export const TELEPORTING = "TELEPORTING";


//FUNCTION TYPE

export const ENTRY = "ENTRY";
export const TRACK = "TRACK";
export const EXIT = "EXIT";

//export const SING = "SING";


export const funfoot = (bus, entry, exit, track, ) => {

    let bot = setup({
        actions: { ENTRY: entry, EXIT:  exit, TRACK: track},
    }).createMachine({
        /** @xstate-layout N4IgpgJg5mDOIC5QAoC2BDAxgCwJYDswBKAOgDEB5AGSooHUBiACQFUA5AcQFEAlASU4BtAAwBdRKAAOAe1i4ALrmn4JIAB6IAnJoCsJACwA2fQHYAzDoBMw0-oCMADgA0IAJ6IAtPod6zDh5p+Jvo6OobBAL4RLmhYeISklDT0DGwUAMoCHCLiSCAycorKqhoIAQ4kZqaOdjoOVXaW+i7uCB6WhhWa1oaawsLhmnbCJlExGDgExOTUtIy0mUJiqgUKSip5pRaWJDomJjpmI2baR6YtnmZHlQ6WDtXmQ3VjILGTCSTpAMIAgmwMSTmWRyK1ka2Km0Qlh0+hI3V0dk0hkOZmsZguCBRJEcwh0wwcwk0Pjs+heb3i02+fwYVB+XwA0sDlnlVkUNqBStDYfC8UiUWiMTpdCRDMMkY19IEbDoyRMKaQ0ukuADZvQmbkpGC2SUoTC4ZYEXyrgK3IhkRUbCS7HZOg4DiZDLK4lMFRllbSGerQYV1jqECShiRjiSdMIOkZ7hiPCSRf1oWjbo48aToq85S6SAsACo0umMpYa-Ja32QzE2kgmYQnSxmQxmB0O9GmtqGToVhwSsyI4QOOsOJ3vabZhhUthsL0s4sQjmIRoBEjQgImXSaSumHRR-awyt9Wt7yzBSwD+UkACKLC4bC+TBVyToE81Pun6kQoT0BvsunCvSJJgxTU0bFzAdKxQmsepjwzc9L2vXNPQLb1wXZF9MVCBdNE-MIHW0O0MQsYQgyqAk7CqcxDCrSCPg9ekGGgq8mAfIsn2Q0o33QzDvxwv9mwNQDyP0O4rmEOd9DMSihzzOD82yZlHyQv1akRAwjkrLcDkjZsPBMHZrUsa1W2XQ4DkdVNyQzdIfizPh0jIABNWiL3oxjWRLGcECaWFjEJXsjBMa1pX-EwKjuQkRhhWpRJM8ZnQ+CyrJs+zqOcqcWKhfRPP0bzjHCfyQgxUwCIOfpyPrKsiTE0z0w+VhOF4BguEs5LmIUm09AOWwjGlEkMUUuE8X8XpSusMJxNIBqczi6y7Ka+TS30tqYWCTqQm65shTsAxkS7QJAkiirosHUh0izRqvgAfQABQyTIACE+CoPgs3sigLsvGbtVLA4dkOSVJXuUU7WaTThgsbF0uTILDHA0ZKpi6YLpYHguDOsg+C+KyKH+QE1QQydms+nw4QGGFe1qJFLEsKM+wrPZ620YxfNGkgswoE6qDO9IWBugBZazMkx+rGtxuSPrcjyRUyolsr84Y8p4xplLK5FVOCCrU3waQIDgVQzISRDRZQjw0Jse57Apnwrm0KNGl6XZrSFO5vG-FMDpPbG6H11yUMlQDgINA8fBrStDCjKozF2Op0t6O1KwNJnR0959ShJAZsT2JEiQGiwN00-Y2u87pURCA4ZVhw6SEVLhE9S-1pWxHxdErPYq241oPAJAwIrDTpQwJGwmezau-QpkwRVV0JRV8xpW88cjDBIf7+hhPpvCuJm6OvIfSxOXxpbxBtyv-ASFw7fxESGIY7AHvMt7ciK9CMGs7ErW4godPCSN2CxtI6PEbXreOjUEq3xQlUQiphkQj28GGSmzYqiAUcESEiww6yQyZjVbgPAQHJ0QfqUM61LR1FgW3esFQz6-iGASbw0ImbjWwbOI44cmidDItoYYewerIkqEmRoqIAhhE0PHE6VlzpXXSLde6j1bL0IQH5HYvY-CA1DEYRE1tHA7BboEG0FN4yl1dhmBGSMUZowxmwGRwQNqk26D4fetYQ6aV0HoHaVY9jkTYYIsuJ4WZsw5lzXm4i+CYxkVpIM3h0qNDuCiIkmhNzXH6LtcwVwBK1iiFEIAA */
     
        context: {
            committedValue: '',
            value: ""
        },


        initial: STAND,
        states: {
            
            STAND: {

                entry: [{ type: ENTRY, params: { ste: STAND } }],
                exit: [{ type: EXIT, params: { ste: STAND } }],

                on: {
                    FOLLOWING: { target: FOLLOW }
                }

            },
            
            
            FOLLOW: {

                entry: [{ type: ENTRY, params: { ste: FOLLOW } }],
                exit: [{ type: EXIT, params: { ste: FOLLOW } }],

                on: {
                    HUNGERING: { target: HUNGER },
                    NOSING: { target: NOSE },
                    LOSING: { target: LOST },
                }

            },


            SCAN: {

                entry: [{ type: ENTRY, params: { ste: NOSE } }],
                exit: [{ type: EXIT, params: { ste: NOSE } }],

                on: {
                    FOLLOWING: { target: FOLLOW },
                    LACKING: { target: LACK }
                }

            },

            
            NOSE: {

                entry: [{ type: ENTRY, params: { ste: NOSE } }],
                exit: [{ type: EXIT, params: { ste: NOSE } }],

                on: {
                    FOLLOWING: { target: FOLLOW },
                    LACKING: { target: LACK }
                }

            },

            LOST: {

                entry: [{ type: ENTRY, params: { ste: LOST } }],
                exit: [{ type: EXIT, params: { ste: LOST } }],

                on: {
                    LACKING: { target: LACK },
                    SCANNING: {target: SCAN }
                }

            },

            QUENCH: {

                entry: [{ type: ENTRY, params: { ste: QUENCH } }],
                exit: [{ type: EXIT, params: { ste: QUENCH } }],

                on: {
                    FOLLOWING: { target: FOLLOW },
                    LACKING: { target: LACK }
                }

            },

            LACK: {

                entry: [{ type: ENTRY, params: { ste: FOLLOW } }],
                exit: [{ type: EXIT, params: { ste: FOLLOW } }],

                on: {
                    QUENCHING: { target: QUENCH },
                    HOWLING:  { target: HOWL },
                    SCREAMING: { target: SCREAM }
                }

            },

            HOWL: {

                entry: [{ type: ENTRY, params: { ste: HOWL } }],
                exit: [{ type: EXIT, params: { ste: HOWL } }],

                on: {
                    FOLLOWING: { target: FOLLOW }
                }

            },

            SCREAM: {

                entry: [{ type: ENTRY, params: { ste: FOLLOW } }],
                exit: [{ type: EXIT, params: { ste: FOLLOW } }],

                on: {
                    SUBMITTING: { target: TOTAL_SUBMISSION }
                }

            },

            SATISFY: {

                entry: [{ type: ENTRY, params: { ste: FOLLOW } }],
                exit: [{ type: EXIT, params: { ste: FOLLOW } }],

                on: {
                    QUENCHING: { target: QUENCH },
                    LACKING: { target: LACK }
                }

            },

            HUNGER: {

                entry: [{ type: ENTRY, params: { ste: FOLLOW } }],
                exit: [{ type: EXIT, params: { ste: FOLLOW } }],

                on: {
                    EATING: { target: EAT }
                }

            },

            EAT: {

                entry: [{ type: ENTRY, params: { ste: FOLLOW } }],
                exit: [{ type: EXIT, params: { ste: FOLLOW } }],

                on: {
                    BITING: { target: BITE },
                    SATISFYING: { target: SATISFY }
                }

            },

            BITE: {

                entry: [{ type: ENTRY, params: { ste: BITE } }],
                exit: [{ type: EXIT, params: { ste: BITE } }],

                on: {
                    EATING: { target: EAT }
                }

            },

            STATIC_POSSIBILITY: {

                entry: [{ type: ENTRY, params: { ste: STATIC_POSSIBILITY } }],
                exit: [{ type: EXIT, params: { ste: STATIC_POSSIBILITY } }],

                on: {
                    OPENING: { target: PURE_FICTION }
                }
            },

            PURE_FICTION: {

                entry: [{ type: ENTRY, params: { ste: PURE_FICTION } }],
                
                on: {
                    FOLLOWING: {
                        actions: [
                            {
                                type: TRACK,
                                params: { ste: FOLLOWING },
                            },
                        ],
                        target: FOLLOW
                    }
                }


            },

            TOTAL_SUBMISSION: {
                on: {
                    EATING: {
                        target: PURE_FICTION
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

