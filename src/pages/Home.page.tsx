import { gql, useQuery } from '@apollo/client';
import {
  Alert,
  Box,
  Center,
  CloseButton,
  Container,
  Group,
  Loader,
  LoadingOverlay,
  Pagination,
  SimpleGrid,
  Text,
  TextInput,
  Title,
} from '@mantine/core';
import { useSessionStorage } from '@mantine/hooks';
import { IconInfoCircle } from '@tabler/icons-react';
import { CharacterCard, CharacterCardProps } from '@/components/CharacterCard/CharacterCard';
import { ColorSchemeToggle } from '@/components/ColorSchemeToggle/ColorSchemeToggle';

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
  query GET_PAGINATED_CHARACTERS($page: Int, $filter: FilterCharacter) {
    characters(page: $page, filter: $filter) {
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
  const [searchText, setSearchText] = useSessionStorage({
    key: 'search-text',
    defaultValue: '',
  });

  const { loading, error, data } = useQuery<GetPaginatedCharacters>(GET_PAGINATED_CHARACTERS, {
    variables: {
      page,
      filter: {
        name: searchText === '' || searchText.length < 2 ? null : searchText,
      },
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
      <Center>
        <Alert
          variant="filled"
          color="red"
          title="Error: Please refresh or try later"
          icon={<IconInfoCircle />}
          maw="20rem"
        />
      </Center>
    );
  } else if (data.characters.results.length === 0) {
    content = (
      <Center>
        <Alert
          variant="filled"
          color="orange"
          title="No data found. Try searching for something else."
          icon={<IconInfoCircle />}
          maw="20rem"
        />
      </Center>
    );
  } else {
    content = (
      <Box pos="relative">
        <LoadingOverlay visible={loading} zIndex={1000} overlayProps={{ radius: 'xs', blur: 1 }} />

        <SimpleGrid
          cols={{
            base: 2,
            xs: 3,
            sm: 4,
          }}
        >
          {data?.characters.results.map((v) => <CharacterCard key={v.id} {...v} />)}
        </SimpleGrid>

        <Group justify="center" mt="xl">
          <Pagination
            total={data?.characters.info.pages || 0}
            radius="xl"
            withEdges
            value={page}
            onChange={setPage}
            onNextPage={() => setPage((v) => v + 1)}
            onPreviousPage={() => setPage((v) => v - 1)}
            onFirstPage={() => setPage(1)}
            onLastPage={() => data && setPage(data.characters.info.pages)}
          />
        </Group>
      </Box>
    );
  }

  return (
    <Container my="3.5rem">
      <Group justify="center" mb="1.5rem">
        <Title fw="100" size="3.75rem">
          Rick & Morty Character Browser
        </Title>
      </Group>

      <ColorSchemeToggle />

      <Group justify="space-between" mb="xl">
        <TextInput
          placeholder="Search by character name..."
          w="19rem"
          maw="100%"
          value={searchText}
          onChange={(e) => {
            setPage(1);
            setSearchText(e.target.value);
          }}
          rightSection={
            <CloseButton
              onClick={() => {
                setPage(1);
                setSearchText('');
              }}
            />
          }
        />
        {data && <Text>Total found: {data.characters.info.count}</Text>}

        {data && (
          <Pagination
            total={data.characters.info.pages}
            radius="xl"
            withEdges
            value={page}
            onChange={setPage}
            onNextPage={() => setPage((v) => v + 1)}
            onPreviousPage={() => setPage((v) => v - 1)}
            onFirstPage={() => setPage(1)}
            onLastPage={() => setPage(data.characters.info.pages)}
          />
        )}
      </Group>

      {content}
    </Container>
  );
};
