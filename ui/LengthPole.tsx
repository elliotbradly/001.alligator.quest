'use client'

import React, { useState } from 'react';

import { SimpleGrid, Button, Box, Title, Grid, Paper, Center, Affix, Group, Text, Stack } from '@mantine/core';

import classCss from './css/StageOneButton.module.css';

import { useDisclosure } from '@mantine/hooks';
import { Modal } from '@mantine/core';

import { useSearchParams } from 'next/navigation';

export default function EarthlyDecorativeFrame() {

    const searchParams = useSearchParams();

    var description = searchParams.get('description');

    description =String( description ).charAt(0).toUpperCase() + String( description ).slice(1);

    const classes = searchParams.get('classes');
    
    const [opened, { open, close }] = useDisclosure(false);

    const [lengthValue, setLengthValue] = useState('');

    const txtBtn1 = "25";
    const txtBtn2 = "30";
    const txtBtn3 = "35";
    const txtBtn4 = "40";
    const txtBtn5 = "45";
    const txtBtn6 = "50";
    const txtBtn7 = "55";
    const txtBtn8 = "60";
    const txtBtn9 = "65";
    const txtBtn10 = "70";
    const txtBtn11 = "75";
    const txtBtn12 = "80";
    const txtBtn13 = "85";
    const txtBtn14 = "90";
    const txtBtn15 = "95";

    var action = (event: React.MouseEvent<HTMLButtonElement>) => {

        const buttonName = event.currentTarget.textContent;
        //window.location.href = './length-pole?classes=' + buttonName
        setLengthValue( buttonName );
        open()

    }

    return (
        <div>

            <Affix position={{ top: 0, left: 0, right: 0 }}>

                <Group justify="center">
                    <Paper withBorder shadow="md" p="sm">

                        <Title> Length </Title>

                    </Paper>
                </Group>

            </Affix>


            <Center style={{ width: "100%", height: "100vh", padding: "0 20px" }}>

                <SimpleGrid cols={5}>

                    <Button onClick={action} classNames={{ root: classCss.classes }} >
                        {txtBtn1}
                    </Button>

                    <Button onClick={action} classNames={{ root: classCss.classes }} >
                        {txtBtn2}
                    </Button>

                    <Button onClick={action} classNames={{ root: classCss.classes }} >
                        {txtBtn3}
                    </Button>

                    <Button onClick={action} classNames={{ root: classCss.classes }} >
                        {txtBtn4}
                    </Button>

                    <Button onClick={action} classNames={{ root: classCss.classes }} >
                        {txtBtn5}
                    </Button>

                    <Button onClick={action} classNames={{ root: classCss.classes }} >
                        {txtBtn6}
                    </Button>

                    <Button onClick={action} classNames={{ root: classCss.classes }} >
                        {txtBtn7}
                    </Button>

                    <Button onClick={action} classNames={{ root: classCss.classes }} >
                        {txtBtn8}
                    </Button>

                    <Button onClick={action} classNames={{ root: classCss.classes }} >
                        {txtBtn9}
                    </Button>

                    <Button onClick={action} classNames={{ root: classCss.classes }} >
                        {txtBtn10}
                    </Button>

                    <Button onClick={action} classNames={{ root: classCss.classes }} >
                        {txtBtn11}
                    </Button>

                    <Button onClick={action} classNames={{ root: classCss.classes }} >
                        {txtBtn12}
                    </Button>

                    <Button onClick={action} classNames={{ root: classCss.classes }} >
                        {txtBtn13}
                    </Button>

                    <Button onClick={action} classNames={{ root: classCss.classes }} >
                        {txtBtn14}
                    </Button>

                    <Button onClick={action} classNames={{ root: classCss.classes }} >
                        {txtBtn15}
                    </Button>

                </SimpleGrid>


            </Center>


            <Modal opened={opened} onClose={close} title="Complete Record" centered>

                <div>

                    <Stack
                        w={400}
                        bg="var(--mantine-color-body)"
                        align="stretch"
                        justify="center"
                        gap="md"
                    >

                        <Group justify="left">
                            <Paper w={400} withBorder shadow="md" p="sm">
                                <Text size="l"> Description </Text>
                                <Title> {description} </Title>
                            </Paper>
                        </Group>

                        <Group justify="left">
                            <Paper w={400} withBorder shadow="md" p="sm">
                                <Text size="l"> Class </Text>
                                <Title> {classes} </Title>
                            </Paper>
                        </Group>


                        <Group justify="left">
                            <Paper w={400} withBorder shadow="md" p="sm">
                                <Text size="l"> Length </Text>
                                <Title> {lengthValue} </Title>
                            </Paper>
                        </Group>

                        <Button w={400} onClick={action} size="lg" fullWidth>
                            Save
                        </Button>
                    </Stack>

                </div >

            </Modal>

        </div>)
}



