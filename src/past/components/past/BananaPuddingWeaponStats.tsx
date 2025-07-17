import { MantineProvider, Box, Text, Group, Stack, Badge, List } from '@mantine/core';

function BananaPuddingWeaponStats() {
  return (
    <Box
      w={300}
      p="md"
      style={{
        backgroundColor: '#fff9c4', // Light banana color
        border: '8px solid #ffeb3b', // Banana yellow
        borderRadius: '15px',
        color: '#795548', // Brown for text
        fontFamily: "'Comic Sans MS', cursive", // A fun, pudding-like font
        boxShadow: '0 0 20px rgba(255, 235, 59, 0.5)', // Glow effect
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Wafer texture */}
      <Box
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          opacity: 0.1,
          backgroundImage: `repeating-linear-gradient(
            45deg,
            #795548,
            #795548 10px,
            transparent 10px,
            transparent 20px
          )`,
        }}
      />

      <Group justify="space-between" mb="md" style={{ position: 'relative' }}>
        <Text fz={48} fw={900} style={{ color: '#ffa000', textShadow: '2px 2px 0 #795548' }}>93</Text>
        <Badge
          size="xl"
          tt="uppercase"
          styles={{
            root: { 
              backgroundColor: '#ffeb3b',
              color: '#795548',
              border: '2px solid #795548',
              fontWeight: 900,
              borderRadius: '10px',
            },
          }}
        >
          Lvl 2
        </Badge>
      </Group>

      <Text fz="xl" fw={900} tt="uppercase" mb="md" style={{ color: '#795548', textAlign: 'center' }}>
        Foxglove of the Osprey
      </Text>

      <Group gap="xs" mb="md" justify="center">
        <Badge
          size="lg"
          tt="uppercase"
          styles={{
            root: { 
              backgroundColor: '#ffd54f', 
              color: '#795548', 
              border: '2px solid #795548',
              fontWeight: 900,
              borderRadius: '10px',
            },
          }}
        >
          Uncommon
        </Badge>
        <Text fz="lg" fw={900} tt="uppercase">▼ Damage</Text>
      </Group>

      <Stack >
        {[
          { label: 'Accuracy', value: '77%' },
          { label: 'Handling', value: '60%' },
          { label: 'Reload Time', value: '2.0s' },
          { label: 'Fire Rate', value: '7.68/s' },
          { label: 'Magazine Size', value: '19' },
        ].map((stat) => (
          <Group key={stat.label} justify="space-between" style={{ 
            border: '2px solid #795548', 
            padding: '4px', 
            backgroundColor: 'rgba(255, 248, 225, 0.7)',
            borderRadius: '8px',
          }}>
            <Text fz="md" fw={700} tt="uppercase">{stat.label}</Text>
            <Text fz="md" fw={900}>{stat.value}</Text>
          </Group>
        ))}
      </Stack>

      <Box mt="md" style={{ 
        border: '2px solid #795548', 
        padding: '8px', 
        backgroundColor: 'rgba(255, 248, 225, 0.7)',
        borderRadius: '8px',
      }}>
        <Group gap="xs">
          <Text fz="xl" fw={900} c="#ffa000">★</Text>
          <Text fz="md" fw={900} c="#ffa000">7 DMG/S</Text>
          <Text fz="md" fw={700}>6% CHANCE</Text>
        </Group>

        <List
          spacing={4}
          size="md"
          mt={8}
          styles={{
            item: { color: '#795548', fontWeight: 700 },
          }}
        >
          <List.Item>• Slows enemies</List.Item>
          <List.Item>• Swaps between Fully Automatic and Semi-Auto</List.Item>
        </List>
      </Box>

      <Group justify="flex-end" mt="md">
        <Box
          style={{
            backgroundColor: '#ffeb3b',
            color: '#795548',
            width: '50px',
            height: '50px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 900,
            fontSize: '24px',
            border: '3px solid #795548',
            borderRadius: '50%',
            boxShadow: '0 0 10px rgba(255, 235, 59, 0.7)',
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
      <BananaPuddingWeaponStats />
    </MantineProvider>
  );
}