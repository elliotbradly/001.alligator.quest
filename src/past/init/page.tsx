"use client"

import { MantineProvider, createTheme, Paper, Button, rem, Box, Grid, ScrollArea, Title, Divider } from '@mantine/core'
import '@mantine/core/styles.css'
import PixiCanvas from '@ui/pixi/block'

import { initFictiq } from '../../../core/277.okwierdo';
import { useState } from 'react'

export default function BrutalistDiscoElysiumInterface() {

  const [object, setObject] = useState({})

  var action = async () => {

    var bit = await initFictiq(0)
    setObject(bit)

  }

  return (
    <MantineProvider >

      <Box className="flex items-center justify-center min-h-screen w-full overflow-hidden">
        <Paper
          className="w-[1280px] h-[720px] flex items-center justify-center"
          shadow="md"
        >

          <Button fullWidth variant='outline' onClick={action}> Turn me on</Button>

          <Divider></Divider>
          {JSON.stringify(object)}

        </Paper>
      </Box>

    </MantineProvider>
  )
}