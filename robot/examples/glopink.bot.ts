import { createMachine } from 'xstate'

export const PAUSE = "PAUSE";
export const RUN = "RUN";

export const globink = createMachine({

    initial: PAUSE,
    states: {
        PAUSE: {

            on: {
                running: {
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
