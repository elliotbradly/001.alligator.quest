import { Container, Text, Button, Group } from "@mantine/core";
import { GithubIcon } from "@mantinex/dev-icons";
import classes from "./HeroTitle.module.css";

import { Alert } from '@mantine/core';
import { IconInfoCircle } from '@tabler/icons-react';


export function HeroTitle() {

  const icon = <IconInfoCircle />;

  const msg0 = 'Remember One Thing'
  const msg1 = 'What you have here is a design fiction. Please remember this is a design fiction, and t-shirts are real!'

  return (
    <div className={classes.wrapper}>

      <Alert variant="filled" color="rgba(255, 190, 152, 1)" radius="xl" withCloseButton title={msg0} icon={icon}>
        {msg1}
      </Alert>



      <Container size={700} className={classes.inner}>
        <h1 className={classes.title}>
          A{" "}
          <Text
            component="span"
            variant="gradient"
            gradient={{ from: "blue", to: "cyan" }}
            inherit
          >
            HOLY COW
          </Text>{" "}
          React components and hooks library
        </h1>

        <Text className={classes.description} color="dimmed">
          Build fully functional accessible web applications with ease – Mantine
          includes more than 100 customizable components and hooks to cover you
          in any situation
        </Text>

        <Group className={classes.controls}>
          <Button
            size="xl"
            className={classes.control}
            variant="gradient"
            gradient={{ from: "blue", to: "cyan" }}
          >
            Get started
          </Button>

          <Button
            component="a"
            href="https://github.com/mantinedev/mantine"
            size="xl"
            variant="default"
            className={classes.control}
            leftSection={<GithubIcon size={20} />}
          >
            GitHub
          </Button>
        </Group>
      </Container>
    </div>
  );
}
