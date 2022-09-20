import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import React from "react";
import { FaPlusCircle } from "react-icons/fa";
import { createBroadcast } from "../../../../api/api";
import { useCreateBroadcast } from "../../../../hooks/useBroadcasts";
import { useGamesForTable } from "../../../../hooks/useGames";
import { CreateEditBroadcastPayload } from "../../../../types/broadcast";
import BroadcastForm from "./BroadcastForm";

interface CreateEventButtonProps {}

const CreateEventButton: React.FC<CreateEventButtonProps> = () => {
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

  const { isLoading: isCreateLoading, mutate } = useCreateBroadcast(
    handleSuccess,
    handleError
  );

  const createBroadcast = (data: CreateEditBroadcastPayload) => mutate(data);

  return (
    <>
      <Button
        colorScheme="green"
        type="submit"
        mb="2"
        leftIcon={<FaPlusCircle />}
        onClick={onOpen}
      >
        Add new broadcast
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
          <ModalHeader>Add new event</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <BroadcastForm
              action={createBroadcast}
              isLoading={isCreateLoading}
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CreateEventButton;
