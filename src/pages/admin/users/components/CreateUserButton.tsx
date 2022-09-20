import {
  Button,
  HStack,
  Icon,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import React from "react";
import { FaPlusCircle } from "react-icons/fa";
import { useCreateUser } from "../../../../hooks/useUsers";
import CreateUserForm from "./CreateUserForm";
import UserForm from "./UserForm";

interface CreateUserButtonProps {}

const CreateUserButton: React.FC<CreateUserButtonProps> = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
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

  const { isLoading: isCreateLoading, mutate } = useCreateUser(
    handleSuccess,
    handleError
  );

  const createUser = (data: any) => mutate(data);

  return (
    <>
      <Button
        colorScheme="green"
        type="submit"
        mb="2"
        leftIcon={<FaPlusCircle />}
        onClick={onOpen}
      >
        Create new user
      </Button>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        isCentered
        size="xl"
        scrollBehavior="inside"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create new user</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <CreateUserForm action={createUser} isLoading={isCreateLoading} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CreateUserButton;
