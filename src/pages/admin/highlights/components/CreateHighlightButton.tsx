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
import { useCreateHighlight } from "../../../../hooks/useHighlights";
import { CreateEditHighlightPayload } from "../../../../types/highlight";
import HighlightForm from "./HighlightForm";

interface CreateHighlightButtonProps {}

const CreateHighlightButton: React.FC<CreateHighlightButtonProps> = () => {
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

  const { isLoading: isCreateLoading, mutate } = useCreateHighlight(
    handleSuccess,
    handleError
  );

  const createHighlight = (data: CreateEditHighlightPayload) => mutate(data);

  return (
    <>
      <Button
        colorScheme="green"
        type="submit"
        mb="2"
        leftIcon={<FaPlusCircle />}
        onClick={onOpen}
      >
        Add new highlight
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
            <HighlightForm
              action={createHighlight}
              isLoading={isCreateLoading}
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CreateHighlightButton;
