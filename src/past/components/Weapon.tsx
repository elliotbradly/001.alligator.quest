import { MantineProvider, Box, Text, Group, Stack, Badge, List, ThemeIcon } from '@mantine/core';
import { IconChevronDown, IconStar } from '@tabler/icons-react';



async function WeaponStatsCard() {



  return (
    <Box
      w={260}
      p="sm"
      style={{
        background: 'linear-gradient(to bottom, rgba(6, 78, 59, 0.9), rgba(0, 0, 0, 0.9))',
        borderRadius: '6px',
        color: '#4ade80',
        fontFamily: 'sans-serif',
      }}
    >
      <Group justify="space-between" mb="xs">
        <Text fz={32} fw={700}>93</Text>
        <Text fz="xs" tt="uppercase">Lvl req 2</Text>
      </Group>

      <Text fz="lg" fw={700} tt="uppercase" mb={4}>Foxglove of the Osprey</Text>

      <Group gap="xs" mb="sm">
        <Badge
          size="sm"
          tt="uppercase"
          styles={{
            root: { backgroundColor: 'rgba(6, 78, 59, 0.5)', color: '#4ade80' },
          }}
        >
          Uncommon
        </Badge>
        <Group gap={2}>
          <IconChevronDown size={14} />
          <Text fz="xs" tt="uppercase">Damage</Text>
        </Group>
      </Group>

      <Stack >
        {[
          { label: 'Accuracy', value: '77%' },
          { label: 'Handling', value: '60%' },
          { label: 'Reload Time', value: '2.0s' },
          { label: 'Fire Rate', value: '7.68/s' },
          { label: 'Magazine Size', value: '19' },
        ].map((stat) => (
          <Group key={stat.label} justify="space-between">
            <Text fz="sm" tt="uppercase">{stat.label}</Text>
            <Text fz="sm">{stat.value}</Text>
          </Group>
        ))}
      </Stack>

      <Box mt="sm">
        <Group gap="xs">
          <ThemeIcon color="cyan" variant="light" size={14}>
            <IconStar size={10} />
          </ThemeIcon>
          <Text fz="xs" c="cyan">7 DMG/S</Text>
          <Text fz="xs">6% CHANCE</Text>
        </Group>

        <List
          spacing={2}
          size="xs"
          mt={4}
          styles={{
            item: { color: 'rgba(74, 222, 128, 0.9)' },
          }}
        >
          <List.Item>Slows enemies</List.Item>
          <List.Item>Swaps between Fully Automatic and</List.Item>
          <List.Item style={{ paddingLeft: '16px' }}>Semi-Auto</List.Item>
        </List>
      </Box>

      <Group justify="flex-end" mt="sm">
        <ThemeIcon
          size={24}
          radius="xl"
          color="yellow"
          variant="filled"
        >
          <Text fz="xs" c="black" fw={700}>64</Text>
        </ThemeIcon>
      </Group>
    </Box>
  );
}

export default function Component() {
  return (
    <MantineProvider>
      <WeaponStatsCard />
    </MantineProvider>
  );
}