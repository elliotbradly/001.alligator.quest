'use client'

import React from "react";
import { SimpleGrid, Button, Box, Title, Grid, Paper, Center,  Affix, Group, Text  } from '@mantine/core';

import classes from './css/StageOneButton.module.css';

export default function EarthlyDecorativeFrame() {

  const txtBtn1 = "1";
  const txtBtn2 = "2";
  const txtBtn3 = "3";
  const txtBtn4 = "4";
  const txtBtn5 = "5";
  const txtBtn6 = "6";
  const txtBtn7 = "H1";
  const txtBtn8 = "H2";

  var action = (event: React.MouseEvent<HTMLButtonElement>) => {

    const buttonName = event.currentTarget.textContent;
    window.location.href = './length-pole?description=pole&classes=' + buttonName

  }

  return (
    <div>

      <Affix position={{ top: 0, left: 0, right: 0 }}>

        <Group justify="center">
          <Paper withBorder shadow="md" p="sm">

          <Title> Classes </Title>

          </Paper>
        </Group>

      </Affix>

      <Center style={{ width: "100%", height: "100vh", padding: "0 20px" }}>

        <SimpleGrid cols={4}>

          <Button onClick={action} classNames={{ root: classes.classes }} >
            {txtBtn1}
          </Button>

          <Button onClick={action} classNames={{ root: classes.classes }} >
            {txtBtn2}
          </Button>

          <Button onClick={action} classNames={{ root: classes.classes }} >
            {txtBtn3}
          </Button>

          <Button onClick={action} classNames={{ root: classes.classes }} >
            {txtBtn4}
          </Button>

          <Button onClick={action} classNames={{ root: classes.classes }} >
            {txtBtn5}
          </Button>

          <Button onClick={action} classNames={{ root: classes.classes }} >
            {txtBtn6}
          </Button>

          <Button onClick={action} classNames={{ root: classes.classes }} >
            {txtBtn7}
          </Button>

          <Button onClick={action} classNames={{ root: classes.classes }} >
            {txtBtn8}
          </Button>

        </SimpleGrid>

      </Center>

    </div>)
}




