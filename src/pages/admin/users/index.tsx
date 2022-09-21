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
import { getImgLink } from "../../../utils/helper";
import { useDebounce } from "../../../hooks/useDebounce";
import TablePagination from "../../../components/common/TablePagination";
import { useUsersForTable } from "../../../hooks/useUsers";
import CreateUserButton from "./components/CreateUserButton";
import EditUserButton from "./components/EditUserButton";
import RemoveUserButton from "./components/RemoveUserButton";
import ResetPasswordButton from "./components/ResetPasswordButton";

const Users = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 500);

  const {
    isLoading,
    data: users,
    refetch,
  } = useUsersForTable(debouncedSearch, currentPage);

  useEffect(() => {
    refetch();
  }, [currentPage, debouncedSearch, refetch]);

  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearch]);

  const getView = () => {
    if (isLoading) return <LoadingSpinner />;

    if (users?.data?.items?.length > 0) {
      const pagesCount = users.data.meta.totalPages;
      const currentPage = users.data.meta.currentPage;
      const onPageChange = (page: number) => setCurrentPage(page);

      return (
        <>
          <TableContainer shadow="xl" my="3">
            <Table variant="striped" size="sm">
              <Thead>
                <Tr>
                  <Th>Full name</Th>
                  <Th>Email</Th>
                  <Th>Mobile</Th>
                  <Th>Image</Th>
                  <Th>Country</Th>
                  <Th>Actions</Th>
                </Tr>
              </Thead>
              <Tbody>
                {users.data.items.map((user: any) => {
                  return (
                    <>
                      <Tr key={user.id}>
                        <Td>{user.name}</Td>
                        <Td>{user.email}</Td>
                        <Td>{user.mobile}</Td>
                        <Td>
                          <Image
                            src={getImgLink(user.img)}
                            alt="Test"
                            w="10rem"
                            h="10rem"
                            rounded="lg"
                            objectFit="cover"
                          />
                        </Td>
                        <Td>{user.country}</Td>
                        <Td>
                          <ResetPasswordButton id={user.id} />
                          <EditUserButton id={user.id} />
                          <RemoveUserButton id={user.id} />
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
    return <>No users found</>;
  };
  return (
    <Box>
      <Heading size="lg" mb="5">
        Users
      </Heading>
      <HStack justifyContent="space-between" alignItems="center">
        <CreateUserButton />
        <InputGroup size="sm" w="20rem">
          <InputLeftElement>
            <Icon as={FaSearch} fontSize="xl" color="gray.500" />
          </InputLeftElement>
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            pl="2rem"
            type="text"
            placeholder="Search users"
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

export default Users;

export const getServerSideProps = async (ctx: ReactElement) => {
  return {
    props: {
      typeLayout: "admin",
    },
  };
};
