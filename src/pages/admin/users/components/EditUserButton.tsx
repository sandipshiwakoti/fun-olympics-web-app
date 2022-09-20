import {
  Icon,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Tooltip,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import React from "react";
import { FaEdit } from "react-icons/fa";
import LoadingSpinner from "../../../../components/common/LoadingSpinner";
import { useEditUser, useUserById } from "../../../../hooks/useUsers";
import UserForm from "./UserForm";

interface EditUserButtonProps {
  id: number;
}

const EditUserButton: React.FC<EditUserButtonProps> = ({ id }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isLoading, data: user } = useUserById(id);

  const toast = useToast();

  const handleSuccess = (message: string) => {
    toast({
      title: message || "Success!",
      status: "success",
      duration: 5000,
      isClosable: true,
    });
    onClose();
  };

  const handleError = (message: string) => {
    toast({
      title: message || "Failed!",
      status: "error",
      duration: 5000,
      isClosable: true,
    });
  };

  const { isLoading: isEditLoading, mutate } = useEditUser(
    id,
    handleSuccess,
    handleError
  );

  const editUser = (data: FormData) => mutate(data);

  const getModalBody = () => {
    if (isLoading) return <LoadingSpinner />;
    return (
      <UserForm data={user.data} action={editUser} isLoading={isEditLoading} />
    );
  };

  return (
    <>
      <Tooltip label="Edit user" fontSize="md" color="white">
        <span>
          <Icon
            as={FaEdit}
            fontSize="xl"
            bg="purple.500"
            w={9}
            h={9}
            p="2"
            rounded="md"
            color="purple.100"
            mr="10px"
            _hover={{ bg: "gray", cursor: "pointer" }}
            onClick={onOpen}
          />
        </span>
      </Tooltip>

      <Modal
        isOpen={isOpen}
        onClose={onClose}
        isCentered
        size="xl"
        scrollBehavior="inside"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit user</ModalHeader>
          <ModalCloseButton />
          <ModalBody>{getModalBody()}</ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default EditUserButton;
