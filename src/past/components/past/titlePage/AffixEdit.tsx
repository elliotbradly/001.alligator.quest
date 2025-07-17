import React from 'react'
import { MantineProvider, Box, Text, Title, Grid, ActionIcon, createTheme, rem, Dialog } from '@mantine/core'
import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react'
import { Badge, NavLink } from '@mantine/core';

import { IconPlayerTrackNextFilled } from '@tabler/icons-react';

import { IconAppWindowFilled } from '@tabler/icons-react';
import { useWindowScroll } from '@mantine/hooks';
import { Affix, Button, Transition } from '@mantine/core';

function AffixEdit() {

    const [scroll, scrollTo] = useWindowScroll();


    return (
        <div>

            <Affix position={{ bottom: 20, right: 20 }}>
                <Transition transition="slide-up" mounted={scroll.y > 0}>
                    {(transitionStyles) => (
                        <Button
                            leftSection={<IconAppWindowFilled style={{ width: rem(16), height: rem(16) }} />}
                            style={transitionStyles}
                            onClick={() => scrollTo({ y: 0 })}
                        >
                            Edit:

                            <br />

                            Boxhead Investigates Freedom Town

                        </Button>
                    )}
                </Transition>
            </Affix>

        </div>
    )
}

export default AffixEdit
