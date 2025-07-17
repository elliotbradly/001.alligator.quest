"use client"

import { MantineProvider, createTheme, Stack, Text, Paper, Avatar, Button, Group, Box, Grid, ScrollArea, Center } from '@mantine/core'
import '@mantine/core/styles.css'

import PixiCanvas from '@/components/pixiCanvas/PixiCanvas'
import Weapon from '@/components/Weapon'

const theme = createTheme({
    fontFamily: 'Courier, monospace',
    colors: {
        dark: ['#FFFFFF', '#E0E0E0', '#C0C0C0', '#A0A0A0', '#808080', '#606060', '#404040', '#202020', '#101010', '#000000'],
    },
})


export default function BrutalistDiscoElysiumInterface() {


    return (
        <MantineProvider theme={theme}>

            <Box className="flex items-center justify-center min-h-screen w-full overflow-hidden">
                <Paper
                    className="w-[1280px] h-[720px] overflow-hidden flex items-center justify-center"
                    shadow="md"
                >
                    <Grid gutter={0} style={{ minHeight: '100vh', backgroundColor: '#000000' }}>
                        <Grid.Col span={8} style={{ position: 'relative' }}>
                            <PixiCanvas></PixiCanvas>
                        </Grid.Col>
                        <Grid.Col span={4}>
                            <ScrollArea className='h-screen w-full' scrollbars="y">

                                <Weapon></Weapon>
                                <Weapon></Weapon>
                                <Weapon></Weapon>
                                <Weapon></Weapon>

                            </ScrollArea>
                        </Grid.Col>
                    </Grid>

                </Paper>
            </Box>
        </MantineProvider>
    )
}