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
import { FaEdit, FaLock } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import LoadingSpinner from "../../../../components/common/LoadingSpinner";
import { useResetPassword } from "../../../../hooks/useAuth";
import { useUserById } from "../../../../hooks/useUsers";
import { ResetPassword } from "../../../../types/auth";
import ResetPasswordForm from "./ResetPasswordForm";

interface ResetPasswordButtonProps {
  id: number;
}

const ResetPasswordButton: React.FC<ResetPasswordButtonProps> = ({ id }) => {
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

  const { isLoading: isResetLoading, mutate } = useResetPassword(
    handleSuccess,
    handleError
  );

  const editUser = (data: ResetPassword) => mutate(data);

  const getModalBody = () => {
    if (isLoading) return <LoadingSpinner />;
    console.log(user.data.email);
    return (
      <ResetPasswordForm
        data={{ email: user.data.email }}
        action={editUser}
        isLoading={isResetLoading}
      />
    );
  };

  return (
    <>
      <Tooltip label="Reset password" fontSize="md" color="white">
        <span>
          <Icon
            as={RiLockPasswordFill}
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
          <ModalHeader>Reset Password</ModalHeader>
          <ModalCloseButton />
          <ModalBody>{getModalBody()}</ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ResetPasswordButton;
