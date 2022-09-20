import {
  Box,
  Heading,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  Image,
  Icon,
  Input,
  HStack,
  InputGroup,
  InputLeftElement,
  Button,
} from "@chakra-ui/react";
import React, { ReactElement, useEffect, useRef, useState } from "react";
import { FaSearch } from "react-icons/fa";
import LoadingSpinner from "../../../components/common/LoadingSpinner";
import {
  getDateTime,
  getFormattedDateWithoutTime,
  getFormattedTime,
  getImgLink,
  getTruncatedText,
} from "../../../utils/helper";
import { useDebounce } from "../../../hooks/useDebounce";
import TablePagination from "../../../components/common/TablePagination";
import { useBroadcastsForTable } from "../../../hooks/useBroadcasts";
import EditEventButton from "./components/EditEventButton";
import RemoveEventButton from "./components/RemoveEventButton";
import CreateEventButton from "./components/CreateEventButton";

const Events = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 500);

  const {
    isLoading,
    data: broadcasts,
    refetch,
  } = useBroadcastsForTable(debouncedSearch, currentPage);

  useEffect(() => {
    refetch();
  }, [currentPage, debouncedSearch, refetch]);

  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearch]);

  const getView = () => {
    if (isLoading) return <LoadingSpinner />;

    if (broadcasts.data.items.length > 0) {
      const pagesCount = broadcasts.data.meta.totalPages;
      const currentPage = broadcasts.data.meta.currentPage;
      const onPageChange = (page: number) => setCurrentPage(page);

      return (
        <>
          <Box shadow="xl" my="3" overflowY="auto">
            <Table variant="striped" size="md">
              <Thead>
                <Tr>
                  <Th>title</Th>
                  <Th>description</Th>
                  <Th>Scheduled at</Th>
                  <Th>Link</Th>
                  <Th>Game</Th>
                  <Th>Actions</Th>
                </Tr>
              </Thead>
              <Tbody>
                {broadcasts.data.items.map((event: any) => (
                  <>
                    <Tr key={event.id}>
                      <Td maxW="30rem">{event.title}</Td>
                      <Td maxW="30rem">{event.description}</Td>
                      <Td>{`${getDateTime(event.scheduledAt)}`}</Td>
                      <Td>{event.link}</Td>
                      <Td>{event.game.title}</Td>
                      <Td>
                        <EditEventButton id={event.id} />
                        <RemoveEventButton id={event.id} />
                      </Td>
                    </Tr>
                  </>
                ))}
              </Tbody>
            </Table>
          </Box>
          <TablePagination
            pagesCount={pagesCount}
            currentPage={currentPage}
            onPageChange={onPageChange}
          />
        </>
      );
    }
    return <>No broadcasts found</>;
  };
  return (
    <Box>
      <Heading size="lg" mb="5">
        Events / Broadcasts
      </Heading>
      <HStack justifyContent="space-between" alignItems="center">
        <CreateEventButton />
        <InputGroup size="sm" w="20rem">
          <InputLeftElement>
            <Icon as={FaSearch} fontSize="xl" color="gray.500" />
          </InputLeftElement>
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            pl="2rem"
            type="text"
            placeholder="Search news"
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

export default Events;

export const getServerSideProps = async (ctx: ReactElement) => {
  return {
    props: {
      typeLayout: "admin",
    },
  };
};
