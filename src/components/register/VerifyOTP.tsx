import {
  Box,
  Button,
  Center,
  Heading,
  HStack,
  PinInput,
  PinInputField,
  Stack,
  Text,
  VStack,
  Image,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useVerifyRegistration } from "../../hooks/useAuth";

type VerifyOTPProps = {
  otp: string;
  setOtp: any;
  email: string;
  nextStep: () => void;
};

const VerifyOTP: React.FC<VerifyOTPProps> = ({
  otp,
  setOtp,
  email,
  nextStep,
}) => {
  const toast = useToast();
  const onChange = (value: string) => {
    setOtp(value);
  };

  const handleSuccess = (message: string) => {
    toast({
      title: message || "Successfully verified!",
      status: "success",
      duration: 5000,
      isClosable: true,
    });
    nextStep();
  };

  const handleError = (err: any) => {
    toast({
      title: err.response?.data?.message || "Verification failed!",
      status: "error",
      duration: 5000,
      isClosable: true,
    });
  };

  const { mutate, isLoading } = useVerifyRegistration(
    handleSuccess,
    handleError
  );

  const onSubmit = () => {
    mutate({ email, registerToken: otp });
  };

  return (
    <Box mx="auto">
      <Stack>
        <Center>
          <Image
            src="/img/otp.png"
            w="200px"
            h="200px"
            alt="OTP"
            objectFit="cover"
          />
        </Center>
        <Text my="2" fontWeight="semibold">
          Please enter your OTP sent to email and mobile
        </Text>
        <Center my="2">
          <PinInput type="alphanumeric" size="lg" onChange={onChange}>
            <PinInputField />
            <PinInputField />
            <PinInputField />
            <PinInputField />
            <PinInputField />
            <PinInputField />
          </PinInput>
        </Center>
        <Button colorScheme="blue" onClick={onSubmit} isLoading={isLoading}>
          Verify
        </Button>
      </Stack>
    </Box>
  );
};

export default VerifyOTP;
