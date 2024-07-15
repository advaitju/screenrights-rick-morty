import { gql, useQuery } from '@apollo/client';
import { Alert, Container, Group, Loader, SimpleGrid, Title } from '@mantine/core';
import { IconInfoCircle } from '@tabler/icons-react';
import { CharacterCardProps, CharacterCard } from '@/components/CharacterCard/CharacterCard';

interface GetPaginatedCharacters {
  characters: {
    info: {
      count: number;
      next: number;
      pages: number;
      prev: number;
    };
    results: CharacterCardProps[];
  };
}

const GET_PAGINATED_CHARACTERS = gql`
  query GET_PAGINATED_CHARACTERS($page: Int) {
    characters(page: $page) {
      info {
        count
        next
        pages
        prev
      }
      results {
        name
        image
        id
        species
      }
    }
  }
`;

export const HomePage = () => {
  const { loading, error, data } = useQuery<GetPaginatedCharacters>(GET_PAGINATED_CHARACTERS);
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
    content = (
      <SimpleGrid
        cols={{
          base: 2,
          xs: 3,
          sm: 4,
        }}
      >
        {data.characters.results.map((v) => (
          <CharacterCard key={v.id} {...v} />
        ))}
      </SimpleGrid>
    );
  }

  return (
    <Container my="3.5rem">
      <Group justify="center" mb="2.75rem">
        <Title fw="100" size="3.75rem">
          Rick & Morty Character Browser
        </Title>
      </Group>

      {content}
    </Container>
  );
};
