import { Badge, Box, Button, Card, CardProps, Flex, Group, Image, Text } from '@mantine/core';
import { Link } from 'react-router-dom';
import { Character } from '@/pages/Character.page';
import { StatusBadge } from '../StatusBadge';
import classes from './CharacterCard.module.css';

export interface CharacterCardProps extends CardProps {
  name?: string;
  image?: string;
  id?: string;
  species?: string;
  status?: Character['character']['status'];
  autoImageHeight?: boolean;
}

export const CharacterCard = ({
  name,
  image,
  id,
  species,
  status,
  autoImageHeight,
  ...rest
}: CharacterCardProps) => (
  <Card withBorder radius="md" p="md" className={classes.card} {...rest} shadow="md">
    <Card.Section>
      <Image src={image} alt={name} height={autoImageHeight ? undefined : 180} />

      {(name || species || status) && (
        <Box p="md">
          <Text fz="lg" fw={300}>
            {name}
          </Text>

          <Flex mt="0.25rem" gap="0.5rem" justify="flex-start" align="start" wrap="wrap">
            <Badge
              variant="light"
              display="block"
              color={species !== 'Human' ? 'purple' : undefined}
            >
              {species}
            </Badge>
            <StatusBadge status={status} style={{ verticalAlign: 'bottom' }} />
          </Flex>
        </Box>
      )}
    </Card.Section>

    {id && (
      <Card.Section>
        <Group className={classes.section}>
          <Button component={Link} to={`/character/${id}`} radius="md" style={{ flex: 1 }}>
            Show details
          </Button>
        </Group>
      </Card.Section>
    )}
  </Card>
);
