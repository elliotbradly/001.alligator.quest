import React from 'react'

import { Box, Text, Title, Grid, ActionIcon, createTheme, rem, Dialog } from '@mantine/core'
import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react'


function NavigationArrows() {
    return (
        <div>

            <Box style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, pointerEvents: 'none' }}>
                <ActionIcon
                    variant="filled"
                    size="md"
                    style={{ position: 'absolute', top: 0, bottom: 0, width: '60px', height: '160px', background: 'black', borderRadius: 0, pointerEvents: 'auto' }}
                    aria-label="Previous page"
                >
                    <IconChevronLeft size={48} color="white" />
                </ActionIcon>

                <ActionIcon
                    variant="filled"
                    size="md"
                    style={{ position: 'absolute', top: 0, bottom: 0, right: 0, width: '60px', height: '160px', background: 'black', borderRadius: 0, pointerEvents: 'auto' }}
                    aria-label="Next page"
                >
                    <IconChevronRight size={48} color="white" />
                </ActionIcon>
            </Box>

        </div>
    )
}

export default NavigationArrows

