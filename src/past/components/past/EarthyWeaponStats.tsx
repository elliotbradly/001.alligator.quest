import { MantineProvider, Box, Text, Group, Stack, Badge, List } from '@mantine/core';

function EarthyWeaponStats() {
  return (
    <Box
      w={300}
      p="md"
      style={{
        backgroundColor: '#2c1e16', // Dark brown
        border: '4px solid #8b4513', // Saddle brown
        color: '#d2b48c', // Tan
        fontFamily: "'Courier New', monospace",
        backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='6' height='6' viewBox='0 0 6 6' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23654321' fill-opacity='0.2' fill-rule='evenodd'%3E%3Cpath d='M5 0h1L0 6V5zM6 5v1H5z'/%3E%3C/g%3E%3C/svg%3E\")",
      }}
    >
      <Group justify="space-between" mb="md">
        <Text fz={48} fw={900} style={{ color: '#cd853f', textShadow: '2px 2px 0 #654321' }}>93</Text>
        <Badge
          size="xl"
          tt="uppercase"
          styles={{
            root: { 
              backgroundColor: '#8b4513',
              color: '#d2b48c',
              border: '2px solid #d2b48c',
              fontWeight: 900,
            },
          }}
        >
          Lvl 2
        </Badge>
      </Group>

      <Text fz="xl" fw={900} tt="uppercase" mb="md" style={{ wordBreak: 'break-word', color: '#deb887' }}>
        FOXGLOVE OF THE OSPREY
      </Text>

      <Group gap="xs" mb="md">
        <Badge
          size="lg"
          tt="uppercase"
          styles={{
            root: { 
              backgroundColor: 'rgba(139, 69, 19, 0.3)', 
              color: '#d2b48c', 
              border: '2px solid #8b4513',
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
          <Group key={stat.label} justify="space-between" style={{ border: '2px solid #8b4513', padding: '4px', backgroundColor: 'rgba(210, 180, 140, 0.1)' }}>
            <Text fz="md" fw={700} tt="uppercase">{stat.label}</Text>
            <Text fz="md" fw={900}>{stat.value}</Text>
          </Group>
        ))}
      </Stack>

      <Box mt="md" style={{ border: '2px solid #8b4513', padding: '8px', backgroundColor: 'rgba(210, 180, 140, 0.1)' }}>
        <Group gap="xs">
          <Text fz="xl" fw={900} c="#ffd700">★</Text>
          <Text fz="md" fw={900} c="#ffd700">7 DMG/S</Text>
          <Text fz="md" fw={700}>6% CHANCE</Text>
        </Group>

        <List
          spacing={4}
          size="md"
          mt={8}
          styles={{
            item: { color: '#d2b48c', fontWeight: 700 },
          }}
        >
          <List.Item>■ Slows enemies</List.Item>
          <List.Item>■ Swaps between Fully Automatic and Semi-Auto</List.Item>
        </List>
      </Box>

      <Group justify="flex-end" mt="md">
        <Box
          style={{
            backgroundColor: '#daa520', // Goldenrod
            color: '#2c1e16',
            width: '40px',
            height: '40px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 900,
            fontSize: '18px',
            border: '3px solid #8b4513',
            outline: '2px solid #daa520',
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
      <EarthyWeaponStats />
    </MantineProvider>
  );
}