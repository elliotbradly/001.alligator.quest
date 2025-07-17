"use client"

import { MantineProvider, createTheme, Stack, Text, Paper, Avatar, Button, Group, Box, Grid, ScrollArea, Center } from '@mantine/core'
import '@mantine/core/styles.css'

import {useTennessee} from '../../data/tennessee'



import PixiCanvas from '../../comp/pixiCanvas/PixiCanvas'

import { Affix, Transition, rem } from '@mantine/core';

//import Player from '@/components/Player'
//<Player></Player>
//import Swatch from '@/components/Swatch'
//import Space from '@/components/Space'



const theme = createTheme({
    fontFamily: 'Courier, monospace',
    colors: {
        dark: ['#FFFFFF', '#E0E0E0', '#C0C0C0', '#A0A0A0', '#808080', '#606060', '#404040', '#202020', '#101010', '#000000'],
    },
})


export default function Tennessee() {


    const { data, error, fetchStatus } = useTennessee()


    if ( error ) return ( <div> data['error'] </div>)
    if ( data  ){

        var s = JSON.stringify( data  )

        return (

            <div>                
                {s}
            </div>

        )
    }



    return (
        <MantineProvider>

    
            <Paper
                className="w-[1280px] h-[720px] overflow-hidden flex items-center justify-center"
                shadow="md"
            >
                <PixiCanvas></PixiCanvas>

            </Paper>


            <Affix position={{ top: 20, right: 20 }}>
                
                <h1>
                tennessee
                </h1>

                
            </Affix>

        </MantineProvider>
    )
}