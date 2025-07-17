"use client"

import { MantineProvider, createTheme, Paper, Box } from '@mantine/core'
import '@mantine/core/styles.css'

import GameMaker from '@ui/gameMaker/gameMaker'

const theme = createTheme({
  fontFamily: 'Courier, monospace'
})

export default function AppShow() {

  if (typeof window === 'undefined') {
    return (<div></div>)
  }

  var url_string = window.location.href;
  var url = new URL(url_string);
  var idx = url.searchParams.get("idx");

  if (idx === null) {

    setTimeout(() => {
      window.location.reload();
    }, 333)
  }

  return (
    <MantineProvider theme={theme}>
      <h1>SHOW :{idx}</h1>

      <GameMaker idx ={idx}></GameMaker>

    </MantineProvider>
  )
}