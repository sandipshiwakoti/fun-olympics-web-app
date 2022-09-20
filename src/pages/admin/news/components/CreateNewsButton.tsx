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
import { useCreateNews } from "../../../../hooks/useNews";
import NewsForm from "./NewsForm";

interface CreateNewsButtonProps {}

const CreateNewsButton: React.FC<CreateNewsButtonProps> = () => {
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

  const { isLoading: isCreateLoading, mutate } = useCreateNews(
    handleSuccess,
    handleError
  );

  const createNews = (data: FormData) => mutate(data);

  return (
    <>
      <Button
        colorScheme="green"
        type="submit"
        mb="2"
        leftIcon={<FaPlusCircle />}
        onClick={onOpen}
      >
        Add new news
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
          <ModalHeader>Add new news</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <NewsForm action={createNews} isLoading={isCreateLoading} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CreateNewsButton;
