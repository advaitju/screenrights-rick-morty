import { ActionIcon, Group, useMantineColorScheme } from '@mantine/core';
import { IconMoon, IconSun, IconWand } from '@tabler/icons-react';

export function ColorSchemeToggle() {
  const { setColorScheme } = useMantineColorScheme();

  return (
    <Group justify="center" mb="lg">
      <ActionIcon variant="outline" color="gray" onClick={() => setColorScheme('light')}>
        <IconSun size={18} />
      </ActionIcon>
      <ActionIcon variant="outline" color="gray" onClick={() => setColorScheme('dark')}>
        <IconMoon size={18} />
      </ActionIcon>
      <ActionIcon variant="outline" color="gray" onClick={() => setColorScheme('auto')}>
        <IconWand size={18} />
      </ActionIcon>
    </Group>
  );
}
