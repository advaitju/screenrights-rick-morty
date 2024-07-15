import { Badge, Box, Button, Card, CardProps, Group, Image, Text } from '@mantine/core';
import classes from './CharacterCard.module.css';

export interface CharacterCardProps extends CardProps {
  name?: string;
  image?: string;
  id?: string;
  species?: string;
  autoImageHeight?: boolean;
}

export const CharacterCard = ({
  name,
  image,
  id,
  species,
  autoImageHeight,
  ...rest
}: CharacterCardProps) => (
  <Card withBorder radius="md" p="md" className={classes.card} {...rest}>
    <Card.Section>
      <Image src={image} alt={name} height={autoImageHeight ? undefined : 180} />

      {name && (
        <Box p="md">
          <Text fz="lg" fw={300}>
            {name}
          </Text>
          <Badge size="sm" variant="light">
            {species}
          </Badge>
        </Box>
      )}
    </Card.Section>

    {id && (
      <Card.Section>
        <Group className={classes.section}>
          <Button component="a" href={`/character/${id}`} radius="md" style={{ flex: 1 }}>
            Show details
          </Button>
        </Group>
      </Card.Section>
    )}
  </Card>
);
