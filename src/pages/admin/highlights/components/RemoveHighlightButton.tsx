import {
  Button,
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
  Text,
} from "@chakra-ui/react";
import React from "react";
import { FaTrash } from "react-icons/fa";
import { useRemoveHighlight } from "../../../../hooks/useHighlights";

interface RemoveHighlightButtonProps {
  id: number;
}

const RemoveHighlightButton: React.FC<RemoveHighlightButtonProps> = ({
  id,
}) => {
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

  const { isLoading, mutate } = useRemoveHighlight(
    id,
    handleSuccess,
    handleError
  );
  const removeEvent = () => mutate();

  return (
    <>
      <Icon
        as={FaTrash}
        fontSize="xl"
        bg="red.600"
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
          <ModalHeader>Remove highlight</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text fontSize="lg">
              Are you sure you want to remove this highlight?
            </Text>
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" onClick={onClose}>
              Cancel
            </Button>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={removeEvent}
              isLoading={isLoading}
            >
              Delete
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default RemoveHighlightButton;
