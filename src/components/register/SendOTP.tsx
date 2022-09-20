import React from "react";
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import { FaEnvelope, FaUserAlt, FaMobileAlt } from "react-icons/fa";

import { useToast } from "@chakra-ui/react";
import { useRequestRegistration } from "../../hooks/useAuth";

interface SendOTPProps {
  useForm: any;
  nextStep: () => void;
}

type SendOTPPayload = {
  fullname: string;
  email: string;
  mobile: string;
};

const SendOTP: React.FC<SendOTPProps> = ({ useForm, nextStep }) => {
  const toast = useToast();
  const {
    register,
    handleSubmit,
    watch,
    getValues,
    formState: { errors },
  } = useForm;
  const handleSuccess = (message: string) => {
    toast({
      title: message || "We have sent OTP to your email and mobile.",
      status: "success",
      duration: 5000,
      isClosable: true,
    });

    nextStep();
  };

  const handleError = (err: any) => {
    toast({
      title: err.response?.data?.message || "Registration request rejected!",
      status: "error",
      duration: 5000,
      isClosable: true,
    });
  };

  const { mutate, isLoading } = useRequestRegistration(
    handleSuccess,
    handleError
  );

  const onSubmit = (data: SendOTPPayload) => {
    const { fullname: name, ...rest } = data;
    mutate({ name, ...rest });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box bg="white" borderRadius="lg" p="10" w="500px" mx="auto">
        <FormControl isInvalid={!!errors.fullname} mb="5">
          <FormLabel>Fullname</FormLabel>
          <InputGroup>
            <InputLeftElement pointerEvents="none">
              <Icon as={FaUserAlt} color="gray.300" />
            </InputLeftElement>
            <Input
              placeholder="Enter your fullname"
              {...register("fullname")}
            />
          </InputGroup>
          <FormErrorMessage>{errors.fullname?.message}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!!errors.email} mb="5">
          <FormLabel>Email</FormLabel>
          <InputGroup>
            <InputLeftElement pointerEvents="none">
              <Icon as={FaEnvelope} color="gray.300" />
            </InputLeftElement>
            <Input
              placeholder="Enter your email address"
              {...register("email")}
            />
          </InputGroup>
          <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={!!errors.mobile} mb="5">
          <FormLabel>Mobile</FormLabel>
          <InputGroup>
            <InputLeftElement pointerEvents="none">
              <Icon as={FaMobileAlt} color="gray.300" />
            </InputLeftElement>
            <Input placeholder="Enter your mobile" {...register("mobile")} />
          </InputGroup>
          <FormErrorMessage>{errors.mobile?.message}</FormErrorMessage>
        </FormControl>

        <Button colorScheme="blue" w="full" type="submit" isLoading={isLoading}>
          Send OTP
        </Button>
      </Box>
    </form>
  );
};

export default SendOTP;
