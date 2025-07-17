import React from 'react'
import { Button } from '@mantine/core'

import { readyFictiq } from '../../core/277.okwierdo';

var dex = 0;

async function ReadyFictiq() {

    var action = async () => {
        var bit = await readyFictiq(0)
        var value = bit.val;

        if ( value == true){
            window.location.href = './on'
        }
        else{
            window.location.href = './off'
        }
    }


    return (
        <div>
            <Button fullWidth onClick={action}> Click to check to see if glops.live is so </Button>
        </div>
    )
}

export default ReadyFictiq
