import { gql, useQuery } from '@apollo/client';
import { Alert, Button, Center, Container, Grid, Group, Loader, Table, Title } from '@mantine/core';
import {
  IconArrowBackUp,
  IconHome,
  IconInfoCircle,
  IconMapPin,
  IconPlanet,
} from '@tabler/icons-react';
import { useNavigate, useParams } from 'react-router-dom';
import { StatusBadge } from '@/components/StatusBadge';
import { CharacterCard } from '@/components/CharacterCard/CharacterCard';

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
        <Group justify="center" mb="2.75rem">
          <Title fw="100" size="3.75rem">
            {character.name}
          </Title>
        </Group>

        <Grid justify="center">
          <Grid.Col
            span={{
              base: 6,
              xs: 4,
            }}
          >
            <CharacterCard autoImageHeight image={character.image} />
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
                    <StatusBadge status={character.status} />
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
                    <IconPlanet size={18} style={{ verticalAlign: 'sub' }} /> {origin.name} (
                    {origin.type})
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

            <Group mt="md" justify="end">
              <Button
                variant="subtle"
                leftSection={<IconHome size={18} />}
                onClick={() => navigate('/')}
                color="black"
              >
                Home
              </Button>
              <Button
                variant="subtle"
                leftSection={<IconArrowBackUp size={18} />}
                onClick={() => navigate(-1)}
              >
                Back
              </Button>
            </Group>
          </Grid.Col>
        </Grid>
      </>
    );
  }

  return (
    <Container my="3.5rem">
      {(loading || error || !data) && (
        <Group justify="center" mb="2.75rem">
          <Title fw="100" size="3.75rem">
            Rick & Morty Character Browser
          </Title>
        </Group>
      )}

      {content}
    </Container>
  );
};
