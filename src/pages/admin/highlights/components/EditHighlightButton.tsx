import {
  Icon,
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
import { FaEdit } from "react-icons/fa";
import LoadingSpinner from "../../../../components/common/LoadingSpinner";
import {
  useEditHighlight,
  useHighlightById,
} from "../../../../hooks/useHighlights";
import { CreateEditHighlightPayload } from "../../../../types/highlight";
import HighlightForm from "./HighlightForm";

interface EditHighlightButtonProps {
  id: number;
}

const EditHighlightButton: React.FC<EditHighlightButtonProps> = ({ id }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isLoading, data: highlight } = useHighlightById(id);

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

  const { isLoading: isEditLoading, mutate } = useEditHighlight(
    id,
    handleSuccess,
    handleError
  );

  const editHighlight = (data: CreateEditHighlightPayload) => mutate(data);

  const getModalBody = () => {
    if (isLoading) return <LoadingSpinner />;

    return (
      <HighlightForm
        data={highlight.data}
        action={editHighlight}
        isLoading={isEditLoading}
      />
    );
  };

  return (
    <>
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
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        isCentered
        size="xl"
        scrollBehavior="inside"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit highlight</ModalHeader>
          <ModalCloseButton />
          <ModalBody>{getModalBody()}</ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default EditHighlightButton;
