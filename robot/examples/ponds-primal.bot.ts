
//PONDS PRIMAL

import { setup, createMachine } from 'xstate'

export const STATIC_POSSIBILITY = 'STATIC_POSSIBILITY'
export const PURE_FICTION = "PURE_FICTION";
export const TOTAL_SUBMISSION = "TOTAL_SUBMISSION";

export const OPENING = "OPENING";
export const PRESSURING = "PRESSURING";
export const EATING = "EATING";

//FUNCTION TYPE

export const ENTRY = "ENTRY";
export const TRACK = "TRACK";
export const EXIT = "EXIT";


export const pondsPrimal = (bus) => {


    let bot = setup({
        actions: {

            ENTRY: async (_, params: { ste: string }) => {


                switch ( params.ste) {

                    case STATIC_POSSIBILITY:
                   
                    //missin you now

                    break
                }





                

                

                //const queryFn = async () => {

                //     const response = await fetch('/api/moon')
                //     if (!response.ok) {
                //         throw new Error('Network response was not ok')
                //     }
                //     return response.json()

                // }

                // const bit = await queryFn()
                // console.log(JSON.stringify(bit))
                _.self.send({ type: OPENING })
            },

            EXIT: async (_, params: { response: string }) => {


                

                //const queryFn = async () => {

                //     const response = await fetch('/api/moon')
                //     if (!response.ok) {
                //         throw new Error('Network response was not ok')
                //     }
                //     return response.json()

                // }

                // const bit = await queryFn()
                // console.log(JSON.stringify(bit))
                _.self.send({ type: 'completing' })
            },




            TRACK: async (_, params: { response: string }) => {

                //const queryFn = async () => {

                //     const response = await fetch('/api/moon')
                //     if (!response.ok) {
                //         throw new Error('Network response was not ok')
                //     }
                //     return response.json()

                // }

                // const bit = await queryFn()
                // console.log(JSON.stringify(bit))
                _.self.send({ type: 'completing' })
            },

            complete: async (_, params: { response: string }) => {
                /* ... */
                console.log("game over")
            },
        },
    }).createMachine({
     
        context: {
            committedValue: '',
            value: ""
        },


        initial: STATIC_POSSIBILITY,
        states: {
            STATIC_POSSIBILITY: {

                entry: [{ type: ENTRY, params: { ste: STATIC_POSSIBILITY } }],
                exit: [{ type: EXIT, params: { response: 'good' } }],

                on: {
                    OPENING: { target: PURE_FICTION }
                }


            },

            PURE_FICTION: {

                entry: [{ type: ENTRY, params: { ste: PURE_FICTION } }],
                
                on: {
                    PRESSURING: {
                        actions: [
                            {
                                type: TRACK,
                                params: { response: 'good' },
                            },
                        ],
                        target: TOTAL_SUBMISSION
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


}  