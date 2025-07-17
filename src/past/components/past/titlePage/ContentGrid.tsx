import React from 'react'


import { MantineProvider, Box, Text, Title, Grid, ActionIcon, createTheme, rem, Dialog } from '@mantine/core'
import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react'
import { Badge, NavLink } from '@mantine/core';

import { IconPlayerTrackNextFilled } from '@tabler/icons-react';

import { IconAppWindowFilled } from '@tabler/icons-react';
import { useWindowScroll } from '@mantine/hooks';
import { Affix, Button, Transition } from '@mantine/core';

function ContentGrid() {


    let icon = <IconPlayerTrackNextFilled size="3rem" stroke={1.5} />

    return (
        <div>

            <Box style={{ flex: 2, maxWidth: '1200px', margin: '0 auto' }}>
                <Grid gutter={40}>
                    <Grid.Col span={{ base: 12, md: 6 }}>
                        <Box mb={40} style={{ border: '2px solid black', padding: '20px', background: 'white' }}>

                            <Box key={22} style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #000' }}>

                                <NavLink
                                    style={{ fontSize: 33, fontWeight: 40 }}
                                    href="#required-for-focus"
                                    label={"PLAY"}
                                    rightSection={icon}
                                    variant="filled"
                                    active
                                    color="lime"
                                >

                                </NavLink>

                            </Box>


                        </Box>

                        <Box style={{ border: '2px solid black', padding: '20px', background: 'white' }}>
                            <Title order={2} mb={10} style={{ fontWeight: 700, textTransform: 'uppercase' }}>
                                2 - SOLAR
                            </Title>
                            <Text size="sm" style={{ lineHeight: 1.6 }}>
                                The Palers hate the sun: it's blinding, it's hot, and it reveals the ways of the community to the abovegrounders.
                                But it's also a life giver, not unlike the Dispenser generators - and as such, subordinate to the Palers. The
                                Solars are its rulers. In the glaring sunshine, they unfold the matte black bunker panels and thus channel the celestial
                                body's power into the Dispenser that greets it happily with flickering cascades of symbols on its display walls.
                            </Text>
                        </Box>
                    </Grid.Col>

                    <Grid.Col span={{ base: 12, md: 6 }}>
                        <Box mb={40} style={{ border: '2px solid black', padding: '20px', background: 'white' }}>
                            <Title order={2} mb={10} style={{ fontWeight: 700, textTransform: 'uppercase' }}>
                                3 - AURORA
                            </Title>
                            <Text size="sm" style={{ lineHeight: 1.6 }}>
                                They have been immersed in the Dispensers' secrets; have seen the switchgear behind the veneer. One order
                                is enough, and a corridor becomes brightly lit or pitch black. They energize control panels, lock portals, or flood
                                corridors with gas. The layer of memetic indoctrination is crumbling. They know too much. With a few strokes of work,
                                they can access the Dispensers' memetic programming themselves. They don't have the codes yet to climb down to the
                                forbidden depths, to control the Sleeper cells or enter the armories; but with every Reviver who finds one of the 44
                                and brings back codes, the Auroras' power grows.
                            </Text>
                        </Box>

                        <Box style={{ border: '2px solid black', padding: '20px', background: 'white' }}>
                            <Title order={2} mb={10} style={{ fontWeight: 700, textTransform: 'uppercase' }}>
                                4 - REVIVER
                            </Title>
                            <Text size="sm" style={{ lineHeight: 1.6 }}>
                                They have to get out. Some feel drawn to the wild, into the Balkhan's forests or the noisy crowds of lusturian
                                while some simply feel strange amongst their peers, or their squeaky voices caused acoustic dissonances in the
                                corridors. Revivers roam the world above ground, following the breadcrumbs that the gods left for them. They have an eye
                                for the ancient buildings, finding entrances everywhere and diving down into them when there's danger. They
                                blend into the society above ground - though only as a parasite - using bugs, detectors, and blackmail to
                                find the last hidden Dispensers.
                            </Text>
                        </Box>
                    </Grid.Col>
                </Grid>

            </Box>


        </div>
    )
}

export default ContentGrid
