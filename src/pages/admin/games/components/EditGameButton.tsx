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
import { FormProvider, useForm } from "react-hook-form";
import { FaEdit } from "react-icons/fa";
import LoadingSpinner from "../../../../components/common/LoadingSpinner";
import { useEditGame, useGameById } from "../../../../hooks/useGames";
import GameForm from "./GameForm";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = yup
  .object({
    title: yup.string().required("Title is required."),
    description: yup.string().required("Description is required."),
  })
  .required();

type GamePayload = {
  title: string;
  description: string;
  file?: File;
};

interface EditGameButtonProps {
  id: number;
}

const EditGameButton: React.FC<EditGameButtonProps> = ({ id }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isLoading, data: game } = useGameById(id);

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

  const { isLoading: isEditLoading, mutate } = useEditGame(
    id,
    handleSuccess,
    handleError
  );

  const editGame = (data: FormData) => mutate(data);

  const getModalBody = () => {
    if (isLoading) return <LoadingSpinner />;
    return (
      <GameForm data={game.data} action={editGame} isLoading={isEditLoading} />
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
          <ModalHeader>Edit game</ModalHeader>
          <ModalCloseButton />
          <ModalBody>{getModalBody()}</ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default EditGameButton;
