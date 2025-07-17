'use client'

import { MantineProvider, Box, Text, Title, Grid, ActionIcon, createTheme, rem } from '@mantine/core'
import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react'

const theme = createTheme({
    fontFamily: 'Arial, sans-serif',
    headings: {
        fontFamily: 'Arial, sans-serif',
    },
})

export default function Component() {
    return (
        <MantineProvider theme={theme}>
            <Box style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#f0f0f0', padding: '2rem' }}>
                {/* Top half with logo and image */}
                <Box style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '4rem', position: 'relative' }}>
                    <Box
                        style={{
                            width: '400px',
                            height: '250px',
                            overflow: 'hidden',
                            position: 'relative',
                            marginTop: '2rem',
                        }}
                    >
                        <Box
                            style={{
                                width: '100%',
                                height: '100%',
                                position: 'absolute',
                                top: '0',
                                left: '0',
                                transform: 'perspective(800px) rotateX(10deg) rotateY(-15deg) rotateZ(-5deg)',
                                transformOrigin: 'center center',
                                boxShadow: '10px 10px 20px rgba(0, 0, 0, 0.3)',
                            }}
                        >
                            <img
                                src="/placeholder.svg?height=250&width=400"
                                alt="Placeholder"
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover',
                                }}
                            />
                        </Box>
                    </Box>
                    <Box
                        style={{
                            background: 'black',
                            padding: '1rem 2rem',
                            borderRadius: '2rem',
                            transform: 'rotate(-5deg) translateY(-50%)',
                            boxShadow: '5px 5px 0 rgba(0, 0, 0, 0.2)',
                            zIndex: 2,
                            position: 'absolute',
                            bottom: '-2rem',
                        }}
                    >
                        <Text
                            color="white"
                            size={rem(36)}
                            style={{
                                letterSpacing: '0.1em',
                                fontWeight: 'bold',
                            }}
                        >
                            FUN FOOT
                        </Text>
                    </Box>
                </Box>

                {/* Content grid */}
                <Box style={{ flex: 2, maxWidth: '1200px', margin: '0 auto' }}>
                    <Grid gutter={40}>
                        <Grid.Col span={{ base: 12, md: 6 }}>
                            <Box mb={40} style={{ border: '2px solid black', padding: '20px', background: 'white' }}>
                                <Title order={2} mb={10} style={{ fontWeight: 700, textTransform: 'uppercase' }}>
                                    1 - SPECTER
                                </Title>
                                <Text size="sm" style={{ lineHeight: 1.6 }}>
                                    Born in darkness, armed only with humility, the Specter submits to the community and offers his throat to his
                                    Demagogue. He is nothing and has to prove his worth through actions or the sound of his voice.
                                </Text>
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

                {/* Navigation Arrows */}
                <Box style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, pointerEvents: 'none' }}>
                    <ActionIcon
                        variant="filled"
                        size="md"
                        style={{ position: 'absolute', top: 0, bottom: 0, width: '60px', background: 'black', borderRadius: 0, pointerEvents: 'auto' }}
                        aria-label="Previous page"
                    >
                        <IconChevronLeft size={48} color="white" />
                    </ActionIcon>

                    <ActionIcon
                        variant="filled"
                        size="md"
                        style={{ position: 'absolute', top: 0, bottom: 0, right: 0, width: '60px', background: 'black', borderRadius: 0, pointerEvents: 'auto' }}
                        aria-label="Next page"
                    >
                        <IconChevronRight size={48} color="white" />
                    </ActionIcon>
                </Box>
            </Box>
        </MantineProvider>
    )
}