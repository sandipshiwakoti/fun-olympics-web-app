import {
  Box,
  Heading,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Icon,
  Input,
  HStack,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import React, { ReactElement, useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import LoadingSpinner from "../../../components/common/LoadingSpinner";
import { useGamesForTable } from "../../../hooks/useGames";
import { getImgLink } from "../../../utils/helper";
import CreateGameButton from "./components/CreateGameButton";
import EditGameButton from "./components/EditGameButton";
import RemoveGameButton from "./components/RemoveGameButton";
import { useDebounce } from "../../../hooks/useDebounce";
import TablePagination from "../../../components/common/TablePagination";
import Image from "../../../components/common/Image";

const Games = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 500);

  const {
    isLoading,
    data: games,
    refetch,
  } = useGamesForTable(debouncedSearch, currentPage);

  useEffect(() => {
    refetch();
  }, [currentPage, debouncedSearch, refetch]);

  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearch]);

  const getView = () => {
    if (isLoading) return <LoadingSpinner />;

    if (games?.data?.items?.length > 0) {
      const pagesCount = games.data.meta.totalPages;
      const currentPage = games.data.meta.currentPage;
      const onPageChange = (page: number) => setCurrentPage(page);

      return (
        <>
          <TableContainer shadow="xl" mb="3">
            <Table variant="striped" size="md">
              <Thead>
                <Tr>
                  <Th>title</Th>
                  <Th>description</Th>
                  <Th>Image</Th>
                  <Th>Actions</Th>
                </Tr>
              </Thead>
              <Tbody>
                {games.data.items.map((game: any) => {
                  return (
                    <>
                      <Tr key={game.id}>
                        <Td>{game.title}</Td>
                        <Td>{game.description}</Td>
                        <Td>
                          <Image
                            src={getImgLink(game.img)}
                            alt="Test"
                            w="10rem"
                            h="10rem"
                            rounded="lg"
                            objectFit="cover"
                          />
                        </Td>
                        <Td>
                          <EditGameButton id={game.id} />
                          <RemoveGameButton id={game.id} />
                        </Td>
                      </Tr>
                    </>
                  );
                })}
              </Tbody>
            </Table>
          </TableContainer>
          <TablePagination
            pagesCount={pagesCount}
            currentPage={currentPage}
            onPageChange={onPageChange}
          />
        </>
      );
    }
    return <>No games found</>;
  };
  return (
    <Box>
      <Heading size="lg" mb="5">
        Games
      </Heading>
      <HStack justifyContent="space-between" alignItems="center">
        <CreateGameButton />
        <InputGroup size="sm" w="20rem">
          <InputLeftElement>
            <Icon as={FaSearch} fontSize="xl" color="gray.500" />
          </InputLeftElement>
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            pl="2rem"
            type="text"
            placeholder="Search games"
            boxShadow="outline"
            rounded="md"
            fontWeight="semibold"
            bg="white"
            fontSize="lg"
          />
        </InputGroup>
      </HStack>
      {getView()}
    </Box>
  );
};

export default Games;

export const getServerSideProps = async (ctx: ReactElement) => {
  return {
    props: {
      typeLayout: "admin",
    },
  };
};
