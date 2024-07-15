import { Badge, BadgeProps, Indicator, MantineColor } from '@mantine/core';
import { Character } from '@/pages/Character.page';

interface StatusBadgeProps extends BadgeProps {
  status: Character['character']['status'];
}

export const StatusBadge = ({ status, ...rest }: StatusBadgeProps) => {
  let badgeColour: MantineColor = 'gray';

  if (status === 'Alive') {
    badgeColour = 'green';
  }
  if (status === 'Dead') {
    badgeColour = 'red';
  }
  if (status === 'unknown') {
    badgeColour = 'gray';
  }

  return (
    <Badge
      color={badgeColour}
      variant="outline"
      leftSection={<Indicator processing color={badgeColour} size={7} mr="0.25rem" />}
      tt="uppercase"
      {...rest}
    >
      {status}
    </Badge>
  );
};
