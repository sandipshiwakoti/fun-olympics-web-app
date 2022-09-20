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
import { FormProvider, useForm } from "react-hook-form";
import { FaEdit, FaPlusCircle } from "react-icons/fa";
import LoadingSpinner from "../../../../components/common/LoadingSpinner";
import {
  useCreateGame,
  useEditGame,
  useGameById,
} from "../../../../hooks/useGames";
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

interface AddGameButtonProps {}

const CreateGameButton: React.FC<AddGameButtonProps> = () => {
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

  const { isLoading: isCreateLoading, mutate } = useCreateGame(
    handleSuccess,
    handleError
  );

  const createGame = (data: FormData) => mutate(data);

  return (
    <>
      <Button
        colorScheme="green"
        type="submit"
        mb="2"
        leftIcon={<FaPlusCircle />}
        onClick={onOpen}
      >
        Add new game
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
          <ModalHeader>Add new game</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <GameForm action={createGame} isLoading={isCreateLoading} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CreateGameButton;
