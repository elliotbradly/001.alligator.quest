"use client"

import { MantineProvider, createTheme, Paper, Button, rem, Box, Grid, ScrollArea, Title } from '@mantine/core'
import '@mantine/core/styles.css'

import PixiCanvas from '@ui/pixi/block'
import { useRouter } from 'next/navigation'


import Show from '@ui/show/00.Show'

import { useUpdateFictiq } from '@queue/okwierdo.query';

var dex = 0;

const theme = createTheme({
  fontFamily: 'Courier, monospace'
})

export default function BrutalistDiscoElysiumInterface() {

  let sim;
  let bus

  const setBus = (obj) => {
    if (dex > 0) return
    dex += 1
    sim = obj;
    console.log("setting the bus")
  };

  const setReady = ( val ) =>{
    console.log( "ready" + val )
  }

  bus = (idx, bal) => sim.hunt(idx, bal)

  return (
    <MantineProvider theme={theme}>

      <Box className="flex items-center justify-center min-h-screen w-full overflow-hidden">
        <Paper
          className="w-[1280px] h-[720px] flex items-center justify-center"
          shadow="md"
        >

          <Show></Show>

          <PixiCanvas bus={setBus}></PixiCanvas>
          
        </Paper>
      </Box>

    </MantineProvider>
  )
}