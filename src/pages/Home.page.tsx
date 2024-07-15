import { gql, useQuery } from '@apollo/client';
import {
  Alert,
  Center,
  Container,
  Group,
  Loader,
  Pagination,
  SimpleGrid,
  Title,
} from '@mantine/core';
import { useSessionStorage } from '@mantine/hooks';
import { IconInfoCircle } from '@tabler/icons-react';
import { CharacterCard, CharacterCardProps } from '@/components/CharacterCard/CharacterCard';

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
  const [page, setPage] = useSessionStorage({
    key: 'page',
    defaultValue: 1,
    serialize: (v) => String(v),
    deserialize: (v) => (v ? parseInt(v, 10) : 1),
  });
  const { loading, error, data } = useQuery<GetPaginatedCharacters>(GET_PAGINATED_CHARACTERS, {
    variables: {
      page,
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
    content = (
      <>
        <Group justify="center" mb="xl">
          <Pagination
            total={data.characters.info.pages}
            color="black"
            radius="xl"
            withEdges
            value={page}
            onChange={setPage}
            onNextPage={() => setPage((v) => v + 1)}
            onPreviousPage={() => setPage((v) => v - 1)}
            onFirstPage={() => setPage(1)}
            onLastPage={() => setPage(data.characters.info.pages)}
          />
        </Group>

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

        <Group justify="center" mt="xl">
          <Pagination
            total={data.characters.info.pages}
            color="black"
            radius="xl"
            withEdges
            value={page}
            onChange={setPage}
            onNextPage={() => setPage((v) => v + 1)}
            onPreviousPage={() => setPage((v) => v - 1)}
            onFirstPage={() => setPage(1)}
            onLastPage={() => setPage(data.characters.info.pages)}
          />
        </Group>
      </>
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
