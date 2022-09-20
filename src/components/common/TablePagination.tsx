import {
  Pagination,
  usePagination,
  PaginationNext,
  PaginationPage,
  PaginationPrevious,
  PaginationContainer,
  PaginationPageGroup,
} from "@ajna/pagination";
import { HStack, Icon } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

interface TablePaginationProps {
  currentPage: number;
  pagesCount: number;
  onPageChange: (page: number) => void;
}

const TablePagination: React.FC<TablePaginationProps> = (props) => {
  const { currentPage, setCurrentPage, pagesCount, pages } = usePagination({
    pagesCount: props.pagesCount,
    initialState: { currentPage: props.currentPage },
  });

  const handlePageChange = (page: number) => {
    props.onPageChange(page);
    setCurrentPage(page);
  };

  return (
    <HStack justifyContent="flex-end">
      <Pagination
        pagesCount={pagesCount}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      >
        <PaginationContainer>
          <PaginationPrevious
            _hover={{
              bg: "purple.500",
            }}
            bg="purple.400"
            color="white"
            mr="2px"
          >
            <Icon as={FaArrowLeft} mr="1" />
            Prev
          </PaginationPrevious>
          <PaginationPageGroup>
            {pages.map((page: number) => (
              <PaginationPage
                key={`pagination_page_${page}`}
                page={page}
                w={10}
                mx="1px"
                bg="gray.300"
                fontSize="sm"
                _hover={{
                  bg: "gray.400",
                }}
                _current={{
                  bg: "purple.400",
                  fontSize: "sm",
                  color: "white",
                }}
              />
            ))}
          </PaginationPageGroup>
          <PaginationNext
            _hover={{
              bg: "purple.500",
            }}
            bg="purple.400"
            color="white"
            ml="2px"
          >
            Next
            <Icon as={FaArrowRight} ml="1" />
          </PaginationNext>
        </PaginationContainer>
      </Pagination>
    </HStack>
  );
};

export default TablePagination;
