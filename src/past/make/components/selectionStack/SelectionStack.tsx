import React from 'react'

import { MantineProvider, Box, Title, Text, Stack, Container, Divider } from '@mantine/core';
import { Badge, NavLink } from '@mantine/core';
import { IconPlayerPlayFilled } from '@tabler/icons-react';

import SelectionItem from './SelectionItem';


const chapters = [
  { key: 0, number: '11', title: 'SIMULATION', pages: '03:05:15 PM 11-04-24', action: '00.simulation/' },
  { key: 1, number: '10', title: 'TERRITORY', pages: '03:05:15 PM 11-04-24', action: '01.territory/' },
  { key: 2, number: '08', title: 'ARTIFACT', pages: '03:05:15 PM 11-04-24', action: '02.artifact/' },
  { key: 3, number: '06', title: 'CHARACTER', pages: '03:05:15 PM 11-04-24', action: '03.character/' },

  { key: 4, number: '07', title: 'STRUGGLE', pages: '03:05:15 PM 11-04-24', action: '04.struggle/' },
  { key: 5, number: '11', title: 'VOICE', pages: '03:05:15 PM 11-04-24', action: '05.voice/' },
  { key: 6, number: '11', title: 'MUSIC', pages: '03:05:15 PM 11-04-24', action: '06.music/' },
  { key: 7, number: '11', title: 'EFFECT', pages: '03:05:15 PM 11-04-24', action: '07.effect/' },

  { key: 8, number: '11', title: 'NARRATIVE', pages: '03:05:15 PM 11-04-24', action: '08.narrative/' },

];

const SelectionStack = () => {


  let icon = null;
  icon = <IconPlayerPlayFilled size="1rem" stroke={1.5} />

  return (
    <div>

      <Stack >
        {chapters.map((chapter) => (

          <SelectionItem key={chapter.key} dat={{ action: chapter.action, key: chapter.key, title: chapter.title, number: chapter.number, pages: chapter.pages }} ></SelectionItem>

        ))}

        <Divider my="md" />

        <Box style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #000' }}>
          <Text style={{ fontSize: 18, fontWeight: 400 }}>Last update</Text>
          <Text style={{ fontSize: 18, fontWeight: 400 }}> 03:05:15 PM 11-04-24 </Text>
        </Box>
      </Stack>

      <Box key="dfe" style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #000' }}>

        <NavLink
          style={{ fontSize: 18, fontWeight: 400 }}
          href="#required-for-focus"
          label="MAKE WORLD"
          leftSection={icon}
          variant="filled"
          active
          color="lime"


        />

      </Box>



    </div >
  )
}

export default SelectionStack
