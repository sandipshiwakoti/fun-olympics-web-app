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
  getImgLink,
  getTruncatedText,
} from "../../../utils/helper";
import { useDebounce } from "../../../hooks/useDebounce";
import TablePagination from "../../../components/common/TablePagination";
import { useNewsForTable } from "../../../hooks/useNews";
import EditNewsButton from "./components/EditNewsButton";
import RemoveNewsButton from "./components/RemoveNewsButton";
import CreateNewsButton from "./components/CreateNewsButton";
import { useAuth } from "../../../contexts/auth";

const News = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 500);

  const {
    isLoading,
    data: news,
    refetch,
  } = useNewsForTable(debouncedSearch, currentPage);

  useEffect(() => {
    refetch();
  }, [currentPage, debouncedSearch, refetch]);

  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearch]);

  const getView = () => {
    if (isLoading) return <LoadingSpinner />;

    if (news?.data?.items?.length > 0) {
      const pagesCount = news.data.meta.totalPages;
      const currentPage = news.data.meta.currentPage;
      const onPageChange = (page: number) => setCurrentPage(page);

      return (
        <>
          <Box shadow="xl" my="3" overflowY="auto">
            <Table variant="striped" size="md">
              <Thead>
                <Tr>
                  <Th>title</Th>
                  <Th>description</Th>
                  <Th>Image</Th>
                  <Th>Published at</Th>
                  <Th>Content</Th>
                  <Th>Author</Th>
                  <Th>Actions</Th>
                </Tr>
              </Thead>
              <Tbody>
                {news.data.items.map((article: any) => {
                  return (
                    <>
                      <Tr key={article.id}>
                        <Td maxW="30rem">{article.title}</Td>
                        <Td maxW="30rem">{article.description}</Td>
                        <Td>
                          <Image
                            src={getImgLink(article.img)}
                            alt="Test"
                            w="10rem"
                            h="10rem"
                            rounded="lg"
                            objectFit="cover"
                          />
                        </Td>
                        <Td>
                          {getFormattedDateWithoutTime(article.publishedAt)}
                        </Td>
                        <Td maxW="30rem">
                          {getTruncatedText(article.content)}
                        </Td>
                        <Td>{article.author}</Td>
                        <Td>
                          <EditNewsButton id={article.id} />
                          <RemoveNewsButton id={article.id} />
                        </Td>
                      </Tr>
                    </>
                  );
                })}
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
    return <>No news found</>;
  };
  return (
    <Box>
      <Heading size="lg" mb="5">
        News
      </Heading>
      <HStack justifyContent="space-between" alignItems="center">
        <CreateNewsButton />
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

export default News;

export const getServerSideProps = async (ctx: ReactElement) => {
  return {
    props: {
      typeLayout: "admin",
    },
  };
};
