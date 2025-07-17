'use client'

import { MantineProvider, Box, Container, Text, Title, Grid, Paper, ActionIcon, createTheme, rem } from '@mantine/core'
import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react'

const theme = createTheme({
    fontFamily: 'Arial, sans-serif',
    headings: {
        fontFamily: 'Arial, sans-serif',
    },
});

export default function Component() {
    return (
        <MantineProvider theme={theme}>
            <Box style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#f0f0f0' }}>
                {/* Top half with logo and title */}
                <Box style={{ flex: 1, padding: '2rem', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', position: 'relative' }}>
                    <Box
                        style={{
                            background: 'black',
                            padding: '2rem 4rem',
                            transform: 'skew(-5deg, 2deg) rotate(5deg)',
                            borderRadius: '3rem',
                            boxShadow: '10px 10px 0 rgba(0, 0, 0, 0.2)',
                            marginBottom: '2rem',
                        }}
                    >
                        <Text
                            color="white"
                            size={rem(48)}
                            style={{
                                letterSpacing: '0.1em',
                                transform: 'skew(5deg, -2deg) rotate(-5deg)',
                                display: 'inline-block',
                            }}
                        >
                            FUN FOOT
                        </Text>
                    </Box>

                    <svg width="300" height="300" viewBox="0 0 300 300" fill="black" style={{ position: 'absolute', top: '10%', left: '50%', transform: 'translateX(-50%)' }}>
                        {/* SVG content would go here */}
                    </svg>
                </Box>

                {/* Bottom half with text content */}
                <Box style={{ flex: 2, padding: '1rem 2rem 4rem', marginTop: '-3rem' }}>
                    <Container size="xl" style={{ maxWidth: '960px' }}>
                        <Grid gutter={80}>
                            <Grid.Col span={{ base: 12, md: 6 }}>
                                <Box mb={60} style={{ border: '4px solid black', padding: '20px' }}>
                                    <Title order={2} mb={20} style={{ fontWeight: 900, textTransform: 'uppercase' }}>
                                        1 - SPECTER
                                    </Title>
                                    <Text c="dark" size="md" style={{ lineHeight: 1.6 }}>
                                        Born in darkness, armed only with humility, the Specter submits to the community and offers his throat to his
                                        Demagogue. He is nothing and has to prove his worth through actions or the sound of his voice.
                                    </Text>
                                </Box>

                                <Box style={{ border: '4px solid black', padding: '20px' }}>
                                    <Title order={2} mb={20} style={{ fontWeight: 900, textTransform: 'uppercase' }}>
                                        2 - SOLAR
                                    </Title>
                                    <Text c="dark" size="md" style={{ lineHeight: 1.6 }}>
                                        The Palers hate the sun: it's blinding, it's hot, and it reveals the ways of the community to the abovegrounders.
                                        But it's also a life giver, not unlike the Dispenser generators - and as such, subordinate to the Palers. The
                                        Solars are its rulers. In the glaring sunshine, they unfold the matte black bunker panels and thus channel the celestial
                                        body's power into the Dispenser that greets it happily with flickering cascades of symbols on its display walls.
                                    </Text>
                                </Box>
                            </Grid.Col>

                            <Grid.Col span={{ base: 12, md: 6 }}>
                                <Box mb={60} style={{ border: '4px solid black', padding: '20px' }}>
                                    <Title order={2} mb={20} style={{ fontWeight: 900, textTransform: 'uppercase' }}>
                                        3 - AURORA
                                    </Title>
                                    <Text c="dark" size="md" style={{ lineHeight: 1.6 }}>
                                        They have been immersed in the Dispensers' secrets; have seen the switchgear behind the veneer. One order
                                        is enough, and a corridor becomes brightly lit or pitch black. They energize control panels, lock portals, or flood
                                        corridors with gas.
                                        The layer of memetic indoctrination is crumbling. They know too much. With a few strokes of work, they can
                                        access the Dispensers' memetic programming themselves. They don't have the codes yet to climb down to the
                                        forbidden depths, to control the Sleeper cells or enter the armories; but with every Reviver who finds one of the 44
                                        and brings back codes, the Auroras' power grows.
                                    </Text>
                                </Box>

                                <Box style={{ border: '4px solid black', padding: '20px' }}>
                                    <Title order={2} mb={20} style={{ fontWeight: 900, textTransform: 'uppercase' }}>
                                        4 - REVIVER
                                    </Title>
                                    <Text c="dark" size="md" style={{ lineHeight: 1.6 }}>
                                        They have to get out. Some feel drawn to the wild, into the Balkhan's forests or the noisy crowds of lusturian
                                        while some simply feel strange amongst their peers, or their squeaky voices caused acoustic dissonances in the
                                        corridors.
                                        Revivers roam the world above ground, following the breadcrumbs that the gods left for them. They have an eye
                                        for the ancient buildings, finding entrances everywhere and diving down into them when there's danger.
                                        They blend into the society above ground - though only as a parasite - using bugs, detectors, and blackmail to
                                        find the last hidden Dispensers.
                                    </Text>
                                </Box>
                            </Grid.Col>
                        </Grid>
                    </Container>
                </Box>

                {/* Navigation Arrows */}
                <ActionIcon
                    variant="filled"
                    size="xl"
                    style={{ position: 'fixed', left: 40, top: '50%', transform: 'translateY(-50%)', background: 'black', borderRadius: 0 }}
                    aria-label="Previous page"
                >
                    <IconChevronLeft size={48} />
                </ActionIcon>

                <ActionIcon
                    variant="filled"
                    size="xl"
                    style={{ position: 'fixed', right: 40, top: '50%', transform: 'translateY(-50%)', background: 'black', borderRadius: 0 }}
                    aria-label="Next page"
                >
                    <IconChevronRight size={48} />
                </ActionIcon>
            </Box>
        </MantineProvider>
    )
}