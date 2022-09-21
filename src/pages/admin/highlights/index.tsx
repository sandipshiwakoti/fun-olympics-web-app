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
  getFormattedDateWithoutTime,
  getFormattedTime,
  getImgLink,
  getTruncatedText,
} from "../../../utils/helper";
import { useDebounce } from "../../../hooks/useDebounce";
import TablePagination from "../../../components/common/TablePagination";
import RemoveHighlightButton from "./components/RemoveHighlightButton";
import EditHighlightButton from "./components/EditHighlightButton";
import CreateHighlightButton from "./components/CreateHighlightButton";
import { useHighlightsForTable } from "../../../hooks/useHighlights";

const Highlights = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 500);

  const {
    isLoading,
    data: highlights,
    refetch,
  } = useHighlightsForTable(debouncedSearch, currentPage);

  useEffect(() => {
    refetch();
  }, [currentPage, debouncedSearch, refetch]);

  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearch]);

  const getView = () => {
    if (isLoading) return <LoadingSpinner />;

    if (highlights?.data?.items?.length > 0) {
      const pagesCount = highlights.data.meta.totalPages;
      const currentPage = highlights.data.meta.currentPage;
      const onPageChange = (page: number) => setCurrentPage(page);

      return (
        <>
          <Box shadow="xl" my="3" overflowY="auto">
            <Table variant="striped" size="md">
              <Thead>
                <Tr>
                  <Th>title</Th>
                  <Th>description</Th>
                  <Th>Link</Th>
                  <Th>Event</Th>
                  <Th>Actions</Th>
                </Tr>
              </Thead>
              <Tbody>
                {highlights.data.items.map((highlight: any) => (
                  <>
                    <Tr key={highlight.id}>
                      <Td maxW="30rem">{highlight.title}</Td>
                      <Td maxW="30rem">{highlight.description}</Td>

                      <Td>{highlight.link}</Td>
                      <Td>{highlight.broadcast.title}</Td>
                      <Td>
                        <EditHighlightButton id={highlight.id} />
                        <RemoveHighlightButton id={highlight.id} />
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
    return <>No highlights found</>;
  };
  return (
    <Box>
      <Heading size="lg" mb="5">
        Highlights
      </Heading>
      <HStack justifyContent="space-between" alignItems="center">
        <CreateHighlightButton />
        <InputGroup size="sm" w="20rem">
          <InputLeftElement>
            <Icon as={FaSearch} fontSize="xl" color="gray.500" />
          </InputLeftElement>
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            pl="2rem"
            type="text"
            placeholder="Search highlights"
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

export default Highlights;

export const getServerSideProps = async (ctx: ReactElement) => {
  return {
    props: {
      typeLayout: "admin",
    },
  };
};
