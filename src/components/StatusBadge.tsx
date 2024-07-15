import { Badge, Indicator } from '@mantine/core';
import { Character } from '@/pages/Character.page';

interface StatusBadgeProps {
  status: Character['character']['status'];
}

export const StatusBadge = ({ status }: StatusBadgeProps) => {
  if (status === 'Alive') {
    return (
      <Badge
        color="green"
        variant="light"
        size="lg"
        leftSection={<Indicator processing color="green" size={10} mr="xs" />}
      >
        Alive
      </Badge>
    );
  }

  if (status === 'Dead') {
    return (
      <Badge
        color="red"
        variant="light"
        size="lg"
        leftSection={<Indicator processing color="red" size={10} mr="xs" />}
      >
        Dead
      </Badge>
    );
  }

  return (
    <Badge
      color="gray"
      variant="light"
      size="lg"
      leftSection={<Indicator processing color="gray" size={10} mr="xs" />}
    >
      Unknown
    </Badge>
  );
};
