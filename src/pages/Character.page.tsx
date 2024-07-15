import { gql, useQuery } from '@apollo/client';
import {
  Alert,
  Badge,
  Container,
  Grid,
  Group,
  Indicator,
  Loader,
  Table,
  Title,
} from '@mantine/core';
import { IconInfoCircle } from '@tabler/icons-react';
import { useParams } from 'react-router-dom';
import { CharacterCard } from '@/components/CharacterCard/CharacterCard';

interface Character {
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
    status: string;
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
  const { id } = useParams<string>();
  const { loading, error, data } = useQuery<Character>(GET_CHARACTER, {
    variables: {
      characterId: id,
    },
  });
  let content;

  if (loading) content = <Loader size="xl" />;
  else if (error || !data) {
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
    console.log(character);

    let status;
    switch (character.status) {
      case 'Alive':
        status = (
          <Badge
            color="green"
            variant="light"
            size="lg"
            leftSection={<Indicator processing color="green" size={10} mr="xs" />}
          >
            Alive
          </Badge>
        );
        break;
      case 'Dead':
        break;
      case 'unknown':
        break;
      default:
    }

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
              <Table.Thead>
                <Table.Th>Field</Table.Th>
                <Table.Th>Value</Table.Th>
              </Table.Thead>
              <Table.Tbody>
                <Table.Tr>
                  <Table.Td>Gender</Table.Td>
                  <Table.Td>{character.gender}</Table.Td>
                </Table.Tr>
                <Table.Tr>
                  <Table.Td>Status</Table.Td>
                  <Table.Td>{status}</Table.Td>
                </Table.Tr>
              </Table.Tbody>
            </Table>
          </Grid.Col>
        </Grid>
      </>
    );
  }

  return <Container my="3.5rem">{content}</Container>;
};
