"use client"

import { MantineProvider, createTheme, Paper, Box, Grid, ScrollArea } from '@mantine/core'
import '@mantine/core/styles.css'

import LoadBlock from '@ui/admin/beingLoad/block'

import PixiCanvas from '@ui/pixi/block'

const theme = createTheme({
    fontFamily: 'Courier, monospace'
})

var dex = 0;

export default function Page() {

    let sim;
    let bus

    const setBus = (obj) => {
        if ( dex > 0 ) return 
        dex +=1
        sim = obj;
        console.log("setting the bus")
    };

    bus = (idx, bal) => sim.hunt(idx, bal)


    return (
        <MantineProvider theme={theme}>

            <Box className="flex items-center justify-center min-h-screen w-full overflow-hidden">
                <Paper
                    className="w-[1280px] h-[720px] overflow-hidden flex items-center justify-center"
                    shadow="md"
                >
                    <Grid gutter={0} style={{ minHeight: '100vh', backgroundColor: '#ffffff' }}>
                        <Grid.Col span={8} style={{ position: 'relative' }}>
                            <PixiCanvas bus={setBus}></PixiCanvas>
                        </Grid.Col>
                        <Grid.Col span={4}>
                            <ScrollArea className='h-screen w-full' scrollbars="y">

                            <LoadBlock bus={bus}></LoadBlock>

                                
                            </ScrollArea>
                        </Grid.Col>
                    </Grid>
                </Paper>
            </Box>



        </MantineProvider>
    )
}