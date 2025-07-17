import { setup, createMachine } from 'xstate'

export const PAUSE = "PAUSE";
export const RUN = "RUN";

export const RUNNING = "RUNNING";

export const tarantino = (bus) => {



    let bot = setup({
        actions: {
            track: async (_, params: { response: string }) => {

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


        initial: PAUSE,
        states: {
            PAUSE: {

                on: {
                    RUNNING: {
                        actions: [
                            {
                                type: 'track',
                                params: { response: 'good' },
                            },
                        ],
                        target: RUN
                    }
                }


            },
            RUN: {
                on: {
                    pausing: {
                        target: PAUSE
                    }
                }
            }
        }
    })





    return bot


}  