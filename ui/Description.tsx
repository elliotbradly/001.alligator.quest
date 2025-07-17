'use client'

import React from "react";

import { Center, Button, Paper, Text, Title, Group, Grid, Affix } from "@mantine/core"

import classes from './css/StageOneButton.module.css';

export default function EarthlyDecorativeFrame() {

    var action0 = () =>{
        window.location.href = './classes-top/'
    }

    var action1 = ()=>{
        window.location.href = './classes-butt/'
    }

    var action2 = ()=>{
        window.location.href = './classes-pole/'
    }

    return (
        <div>

            <Affix position={{ top: 0, left: 0, right: 0 }}>

                <Group justify="center">
                    <Paper withBorder shadow="md" p="sm">

                    <Title> Description </Title>

                    </Paper>
                </Group>

            </Affix>


            <Center style={{ width: "100%", height: "100vh", padding: "0 20px" }}>

                <Grid>
                    {/* Each <Grid.Col> has a span of 4, making it 4/12 or 1/3 of the width */}
                    <Grid.Col span={4}>

                        <Button onClick={action0} classNames={{ root: classes.root }} >
                            Top
                        </Button>

                    </Grid.Col>

                    <Grid.Col span={4}>

                        <Button onClick={action1} classNames={{ root: classes.root }}>
                            Butt
                        </Button>

                    </Grid.Col>

                    <Grid.Col span={4}>
                        <Button onClick={action2} classNames={{ root: classes.root }}>
                            Pole
                        </Button>
                    </Grid.Col>
                </Grid>



            </Center>

        </div>)
}




