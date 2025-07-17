"use client"

import { MantineProvider, createTheme, Paper, Box, Grid, ScrollArea } from '@mantine/core'
import '@mantine/core/styles.css'

import CreateBlock from '@ui/admin/beingCreate/block'

import PixiCanvas from '@ui/pixi/block'


const theme = createTheme({
    fontFamily: 'Courier, monospace'
})

var dex = 0;

export default function Page() {

    let sim;
    let bus

    const setBus = (obj) => {
        if (dex > 0) return
        dex += 1
        sim = obj;
        console.log("setting the bus")
    };

    bus = (idx, bal) => sim.hunt(idx, bal)


    return (
        <MantineProvider theme={theme}>

<Paper
                    className="h-[32px]  flex "
                    shadow="md"
                >
<PixiCanvas bus={setBus}></PixiCanvas>
                </Paper>

            

            <Box className="flex  w-full">
                <Paper
                    className="w-[1280px] h-[720px]  flex "
                    shadow="md"
                >

                    <ScrollArea className='h-screen w-full' scrollbars="y">
                        <CreateBlock bus={bus}></CreateBlock>
                    </ScrollArea>

                </Paper>
            </Box>



        </MantineProvider>
    )
}