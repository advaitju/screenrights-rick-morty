import { gql, useQuery } from '@apollo/client';
import {
  Alert,
  Button,
  Center,
  Container,
  Grid,
  Group,
  Loader,
  ScrollArea,
  Table,
  Text,
  Title,
} from '@mantine/core';
import {
  IconArrowBackUp,
  IconHome,
  IconInfoCircle,
  IconMapPin,
  IconPlanet,
} from '@tabler/icons-react';
import { useNavigate, useParams } from 'react-router-dom';

import { CharacterCard } from '@/components/CharacterCard/CharacterCard';
import { StatusBadge } from '@/components/StatusBadge';

export interface Character {
  character: {
    gender: string;
    created: string;
    image: string;
    location: {
      name: string;
      dimension: string;
      type: string;
    };
    name: string;
    origin: {
      name: string;
      type: string;
      dimension: string;
    };
    status?: 'Alive' | 'Dead' | 'unknown';
    species: string;
    episode: {
      episode: string;
      name: string;
    }[];
  };
}

const GET_CHARACTER = gql`
  query GET_CHARACTER($characterId: ID!) {
    character(id: $characterId) {
      gender
      created
      image
      location {
        name
        dimension
        type
      }
      name
      origin {
        name
        type
        dimension
      }
      status
      species
      episode {
        episode
        name
      }
    }
  }
`;

export const CharacterPage = () => {
  const navigate = useNavigate();
  const { id } = useParams<string>();
  const { loading, error, data } = useQuery<Character>(GET_CHARACTER, {
    variables: {
      characterId: id,
    },
  });
  let content;

  if (loading) {
    content = (
      <Center>
        <Loader size="xl" />
      </Center>
    );
  } else if (error || !data) {
    content = (
      <Alert
        variant="filled"
        color="red"
        title="Error: Please refresh or try later"
        icon={<IconInfoCircle />}
      />
    );
  } else {
    const { character } = data;
    const {
      character: { location, origin },
    } = data;

    content = (
      <>
        <Title fw="100" size="3.75rem" mb="md" ta="center">
          {character.name}
        </Title>

        <Grid justify="center">
          <Grid.Col
            span={{
              base: 8,
              xs: 4,
            }}
          >
            <CharacterCard autoImageHeight image={character.image} />

            <Group mt="md">
              <Button
                variant="light"
                leftSection={<IconHome size={18} />}
                onClick={() => navigate('/')}
                color="gray"
              >
                Home
              </Button>
              <Button
                variant="light"
                leftSection={<IconArrowBackUp size={18} />}
                onClick={() => navigate(-1)}
              >
                Back
              </Button>
            </Group>
          </Grid.Col>

          <Grid.Col
            span={{
              base: 12,
              xs: 8,
            }}
          >
            <Table
              horizontalSpacing="lg"
              striped
              highlightOnHover
              withTableBorder
              withColumnBorders
            >
              <Table.Tbody>
                <Table.Tr>
                  <Table.Td fw="bold">Gender</Table.Td>
                  <Table.Td>{character.gender}</Table.Td>
                </Table.Tr>
                <Table.Tr>
                  <Table.Td fw="bold">Status</Table.Td>
                  <Table.Td>
                    <StatusBadge status={character.status} style={{ verticalAlign: 'super' }} />
                  </Table.Td>
                </Table.Tr>
                <Table.Tr>
                  <Table.Td fw="bold">Species</Table.Td>
                  <Table.Td>{character.species}</Table.Td>
                </Table.Tr>
                <Table.Tr>
                  <Table.Td fw="bold">Current</Table.Td>
                  <Table.Td>
                    <IconMapPin size={18} style={{ verticalAlign: 'sub' }} /> {location.name} (
                    {location.type})
                  </Table.Td>
                </Table.Tr>
                <Table.Tr>
                  <Table.Td fw="bold">Current (Dimension)</Table.Td>
                  <Table.Td tt="capitalize">{location.dimension}</Table.Td>
                </Table.Tr>
                <Table.Tr>
                  <Table.Td fw="bold">Origin </Table.Td>
                  <Table.Td tt="capitalize">
                    <IconPlanet size={18} style={{ verticalAlign: 'sub' }} /> {origin.name}{' '}
                    {origin.type && <>({origin.type})</>}
                  </Table.Td>
                </Table.Tr>
                {origin.dimension && (
                  <Table.Tr>
                    <Table.Td fw="bold">Origin (Dimension)</Table.Td>
                    <Table.Td tt="capitalize">{character.origin.dimension}</Table.Td>
                  </Table.Tr>
                )}
              </Table.Tbody>
            </Table>

            <Text fz="md" fw="bold" mt="md" mb="sm">
              Episode Appearances: {character.episode.length || 0}
            </Text>
            {character.episode.length > 0 && (
              <ScrollArea h={270}>
                <Table striped highlightOnHover withTableBorder withColumnBorders>
                  <Table.Tbody>
                    {character.episode.map((v) => (
                      <Table.Tr>
                        <Table.Td fw="bold">{v.episode}</Table.Td>
                        <Table.Td>{v.name}</Table.Td>
                      </Table.Tr>
                    ))}
                  </Table.Tbody>
                </Table>
              </ScrollArea>
            )}
          </Grid.Col>
        </Grid>
      </>
    );
  }

  return (
    <Container my="3rem">
      {(loading || error || !data) && (
        <Title fw="100" size="3.75rem" mb="md" ta="center">
          Rick & Morty Character Browser
        </Title>
      )}

      {content}
    </Container>
  );
};
