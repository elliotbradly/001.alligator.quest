import { MantineProvider, Box, Text, Group, Stack, Badge, List } from '@mantine/core';

function BrutalistWeaponStats() {
  return (
    <Box
      w={300}
      p="md"
      style={{
        backgroundColor: 'black',
        border: '4px solid #4ade80',
        color: '#4ade80',
        fontFamily: 'monospace',
      }}
    >
      <Group justify="space-between" mb="md">
        <Text fz={48} fw={900} style={{ textShadow: '3px 3px 0 #4ade80' }}>93</Text>
        <Badge
          size="xl"
          tt="uppercase"
          styles={{
            root: { 
              backgroundColor: '#4ade80', 
              color: 'black',
              border: '2px solid black',
              fontWeight: 900,
            },
          }}
        >
          Lvl 2
        </Badge>
      </Group>

      <Text fz="xl" fw={900} tt="uppercase" mb="md" style={{ wordBreak: 'break-all' }}>
        FOXGLOVE OF THE OSPREY
      </Text>

      <Group gap="xs" mb="md">
        <Badge
          size="lg"
          tt="uppercase"
          styles={{
            root: { 
              backgroundColor: 'transparent', 
              color: '#4ade80', 
              border: '2px solid #4ade80',
              fontWeight: 900,
            },
          }}
        >
          Uncommon
        </Badge>
        <Text fz="lg" fw={900} tt="uppercase">▼ Damage</Text>
      </Group>

      <Stack>
        {[
          { label: 'Accuracy', value: '77%' },
          { label: 'Handling', value: '60%' },
          { label: 'Reload Time', value: '2.0s' },
          { label: 'Fire Rate', value: '7.68/s' },
          { label: 'Magazine Size', value: '19' },
        ].map((stat) => (
          <Group key={stat.label} justify="space-between" style={{ border: '2px solid #4ade80', padding: '4px' }}>
            <Text fz="md" fw={700} tt="uppercase">{stat.label}</Text>
            <Text fz="md" fw={900}>{stat.value}</Text>
          </Group>
        ))}
      </Stack>

      <Box mt="md" style={{ border: '2px solid #4ade80', padding: '8px' }}>
        <Group gap="xs">
          <Text fz="xl" fw={900} c="#22d3ee">★</Text>
          <Text fz="md" fw={900} c="#22d3ee">7 DMG/S</Text>
          <Text fz="md" fw={700}>6% CHANCE</Text>
        </Group>

        <List
          spacing={4}
          size="md"
          mt={8}
          styles={{
            item: { color: '#4ade80', fontWeight: 700 },
          }}
        >
          <List.Item>■ Slows enemies</List.Item>
          <List.Item>■ Swaps between Fully Automatic and Semi-Auto</List.Item>
        </List>
      </Box>

      <Group justify="flex-end" mt="md">
        <Box
          style={{
            backgroundColor: 'yellow',
            color: 'black',
            width: '40px',
            height: '40px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 900,
            fontSize: '18px',
            border: '3px solid black',
            outline: '2px solid yellow',
          }}
        >
          64
        </Box>
      </Group>
    </Box>
  );
}

export default function Component() {
  return (
    <MantineProvider>
      <BrutalistWeaponStats />
    </MantineProvider>
  );
}