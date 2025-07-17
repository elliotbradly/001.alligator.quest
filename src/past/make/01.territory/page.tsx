'use client'

import { useState } from 'react';
import { MantineProvider, createTheme, Card, ScrollArea, Button, Text, Grid, Container, Box, Image, Title } from '@mantine/core';


import PixiCanvas from '../../../components/PixiCanvas';

const theme = createTheme({
  fontFamily: 'Courier, monospace',
  headings: { fontFamily: 'Courier, monospace' },
  colors: {
    dark: [
      '#FFFFFF',
      '#E0E0E0',
      '#C0C0C0',
      '#A0A0A0',
      '#808080',
      '#606060',
      '#404040',
      '#202020',
      '#101010',
      '#000000',
    ],
  },
});

export default function Component() {
  const [scrollPosition, setScrollPosition] = useState({ x: 0, y: 0 });


  return (
    <MantineProvider theme={theme}>







      <Box style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Container fluid style={{ flexGrow: 1, display: 'flex', padding: 0 }}>
          {/* Left arrow */}
          <Box style={{ width: 80, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: '2px solid white' }}>
            <Button variant="outline" size="xl" style={{ fontSize: '2rem', color: 'white', border: 'none' }}>
              &lt;
            </Button>
          </Box>

          {/* Center content */}
          <Box style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', padding: '20px' }}>

            <PixiCanvas></PixiCanvas>


            {/* Spider Rain text content */}
            <Card padding="md" radius={0} style={{ backgroundColor: 'black', color: 'white', border: '4px solid white', borderTop: 'none', marginTop: '20px' }}>
              <Title order={2} style={{ fontWeight: 'bold', marginBottom: '1.5rem', textTransform: 'uppercase' }}>SPIDER RAIN</Title>
              <ScrollArea style={{ height: 180 }} >
                <Text size="sm" style={{ lineHeight: 1.8 }}>
                  The sky over Pollen flickers like one of the Chroniclers' underclocked monochrome
                  monitors. The illusion is perfect when the clouds' gray condenses to a black and white
                  static. Then, the spiders come tumbling down. They drag behind long strands,
                  wave after wave falls from the sky. The next gust of wind tears them down again. Silken
                  strands flicker. These arachnids are not dangerous, but they carry Sepsis. Spider
                  silk clings to everything, wafts in the wind like thin hair. The ground is white and spun
                  in, every step raises threads. Here and there, spiders skitter across the giant webs,
                  suddenly freezing and staring at intruders. Their chelicerae move in a push-pull
                  rhythm, their hairy abdomens pumping. All around the spore fields, Pollen is plagued
                  by Biokinetics. They have spun whole cities in web, conserving them for eternity. Old
                  electricity pylons and trees are cottony things where thousands of spiders nest. A
                  ravine covered by webs becomes a death trap when the fabric tears and gives way.
                </Text>
              </ScrollArea>
            </Card>

            {/* Two-column text area */}
            <Card padding="xl" radius={0} style={{ backgroundColor: 'white', color: 'black', flexGrow: 1, border: '4px solid black', borderTop: 'none', marginTop: '20px' }}>
              <Grid gutter={40}>
                <Grid.Col span={6}>
                  <Text size="sm" style={{ lineHeight: 1.8 }}>
                    The forests treat the Clans well, and they do likewise. Clanners free the trees from spiders, tear webs, dig up
                    Rift Centipedes and crush them. They protect the forests against Spitalians and Apocalyptics.
                  </Text>
                  <Text size="sm" mt="xl" style={{ lineHeight: 1.8 }}>
                    However, sometimes a Fractal Forest demands more. The ground splits open and reveals the interior of
                    a man-sized muscle sac made of white, fleshy strands. Contraction waves ripple along the interior wall, making
                    openings flutter. Yellowish digestive fluid sloshes in the deep: a phagocyte cusp. The Clanners offer it rabbits and
                    Gendos as well as blessed children, enemy warriors, or captured Spitalians. The cusp closes over the victim, the
                    opening becomes a scar soon covered by grass once more.
                  </Text>
                </Grid.Col>
                <Grid.Col span={6} style={{ borderLeft: '2px solid black', paddingLeft: '40px' }}>
                  <Text size="sm" style={{ lineHeight: 1.8 }}>
                    One day, the Fractal Forest's life energy is spent. Trees splinter, the fruits rot, the grass dissolves into brittle fi-
                    bers. The Clans thank the forest and move on. They do not notice how the countless phagocyte cusps they have
                    fed throughout the seasons burst one by one. The rabbit jumps out unharmed and flicks its belly as if nothing has
                    happened. The human sacrifices stagger to the surface and have not aged at all.
                  </Text>
                  <Text size="sm" mt="xl" style={{ lineHeight: 1.8 }}>
                    They have, however, changed.
                  </Text>
                </Grid.Col>
              </Grid>
            </Card>
          </Box>

          {/* Right arrow */}
          <Box style={{ width: 80, display: 'flex', alignItems: 'center', justifyContent: 'center', borderLeft: '2px solid white' }}>
            <Button variant="outline" size="xl" style={{ fontSize: '2rem', color: 'white', border: 'none' }}>
              &gt;
            </Button>
          </Box>
        </Container>

        {/* Footer */}
        <Box style={{ height: 80, backgroundColor: 'black', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 40px', borderTop: '4px solid white' }}>
          <Text size="lg" color="white" style={{ fontWeight: 'bold' }}>POLLEN</Text>
          <Text size="lg" color="white" style={{ fontWeight: 'bold' }}>91</Text>
        </Box>
      </Box>
    </MantineProvider>
  );
}