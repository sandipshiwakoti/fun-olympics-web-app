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
} from "@chakra-ui/react";
import React from "react";
import { FaEdit } from "react-icons/fa";
import LoadingSpinner from "../../../../components/common/LoadingSpinner";
import { useEditNews, useNewsById } from "../../../../hooks/useNews";
import NewsForm from "./NewsForm";

type NewsPayload = {
  id?: number;
  title: string;
  description: string;
  file?: File;
  author: string;
  content: string;
  publishedAt: Date;
};

interface EditNewsButtonProps {
  id: number;
}

const EditNewsButton: React.FC<EditNewsButtonProps> = ({ id }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isLoading, data: news } = useNewsById(id);

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

  const { isLoading: isEditLoading, mutate } = useEditNews(
    id,
    handleSuccess,
    handleError
  );

  const editNews = (data: FormData) => mutate(data);

  const getModalBody = () => {
    if (isLoading) return <LoadingSpinner />;
    return (
      <NewsForm data={news.data} action={editNews} isLoading={isEditLoading} />
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
          <ModalHeader>Edit news</ModalHeader>
          <ModalCloseButton />
          <ModalBody>{getModalBody()}</ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default EditNewsButton;
