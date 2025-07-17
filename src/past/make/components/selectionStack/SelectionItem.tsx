"use client"
import React from 'react'

import { IconAlien, IconMusic, IconMoodHappyFilled, IconArcheryArrow, IconAsset, IconHexagon, IconEar, IconHexagonFilled, IconStereoGlasses } from '@tabler/icons-react';
import { MantineProvider, Box, Title, Text, Stack, Container } from '@mantine/core';
import { Badge, NavLink } from '@mantine/core';
import { redirect } from 'next/navigation';

export function SelectionItem({ dat }: any) {

    const name = dat.title;
    const next = './make/' + dat.action;

    let icon = null;

    switch (dat.key) {
        case 0:
            icon = <IconAlien size="1rem" stroke={1.5} />
            break;

        case 1:
            icon = <IconArcheryArrow size="1rem" stroke={1.5} />
            break;

        case 2:
            icon = <IconAsset size="1rem" stroke={1.5} />
            break;

        case 3:
            icon = <IconHexagonFilled size="1rem" stroke={1.5} />
            break;

        case 4:
            icon = <IconStereoGlasses size="1rem" stroke={1.5} />
            break;

        case 5:
            icon = <IconMoodHappyFilled size="1rem" stroke={1.5} />
            break;

        case 6:
            icon = <IconMusic size="1rem" stroke={1.5} />
            break;



        case 7:
            icon = <IconEar size="1rem" stroke={1.5} />
            break;

        default:
            icon = <IconHexagon size="1rem" stroke={1.5} />
            break;
    }

    const update = () => { redirect(next) }

    return (
        <div>

            <Box key={dat.number} style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #000' }}>



                <NavLink
                    style={{ fontSize: 18, fontWeight: 400 }}
                    href="#required-for-focus"
                    label={name}
                    leftSection={icon}

                    onClick={() => update()}


                />

                <Text style={{ fontSize: 14, fontWeight: 100 }}>{dat.pages}</Text>
            </Box>

        </div>
    )
}

export default SelectionItem
