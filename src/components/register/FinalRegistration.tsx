import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  Select,
  useToast,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useRegistration } from "../../hooks/useAuth";
import { countries, games } from "../../data/auth";
import { Select as ReactSelect } from "chakra-react-select";
import { Controller } from "react-hook-form";
import { useGamesForTable } from "../../hooks/useGames";
import { FaLock } from "react-icons/fa";

interface FinalRegistrationProps {
  useForm: any;
  email: string;
  otp: string;
  reset: () => void;
}

type FinalRegistrationPayload = {
  country: string;
  password: string;
};

const FinalRegistration: React.FC<FinalRegistrationProps> = ({
  useForm,
  email,
  otp,
  reset,
}) => {
  const countriesOption = countries.map((country) => {
    return { label: country, value: country };
  });

  const toast = useToast();
  const router = useRouter();
  const {
    register,
    handleSubmit,

    control,
    formState: { errors },
  } = useForm;

  const handleSuccess = (message: string) => {
    toast({
      title: message || "Successfully registered!",
      status: "success",
      duration: 5000,
      isClosable: true,
    });
    router.push("/auth/login");
  };

  const handleError = (err: any) => {
    toast({
      title: err.response?.data?.message || "Registration failed!",
      status: "error",
      duration: 5000,
      isClosable: true,
    });
  };

  const { mutate, isLoading } = useRegistration(handleSuccess, handleError);

  const onSubmit = (data: FinalRegistrationPayload) => {
    mutate({ email, registerToken: otp, ...data });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box bg="white" borderRadius="lg" p="10" w="500px" mx="auto">
        <Controller
          control={control}
          name="country"
          render={({ field: { onChange, onBlur, value, name, ref } }) => {
            return (
              <FormControl isInvalid={!!errors.country} mb="5">
                <FormLabel>Country</FormLabel>

                <ReactSelect
                  name={name}
                  ref={ref}
                  onBlur={onBlur}
                  value={
                    countriesOption && value
                      ? countriesOption.find((option) => option.value === value)
                      : null
                  }
                  onChange={(option) => onChange(option?.value)}
                  placeholder="Country"
                  options={countriesOption}
                />

                <FormErrorMessage>{errors.country?.message}</FormErrorMessage>
              </FormControl>
            );
          }}
        />

        <FormControl isInvalid={!!errors.password} mb="5">
          <FormLabel>Password</FormLabel>
          <InputGroup>
            <InputLeftElement pointerEvents="none">
              <Icon as={FaLock} color="gray.300" />
            </InputLeftElement>
            <Input
              placeholder="Enter your password"
              {...register("password")}
              type="password"
            />
          </InputGroup>
          <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!!errors.confirmPassword} mb="5">
          <FormLabel>Confirm password</FormLabel>
          <InputGroup>
            <InputLeftElement pointerEvents="none">
              <Icon as={FaLock} color="gray.300" />
            </InputLeftElement>
            <Input
              placeholder="Enter your confirm password"
              {...register("confirmPassword")}
              type="password"
            />
          </InputGroup>
          <FormErrorMessage>{errors.confirmPassword?.message}</FormErrorMessage>
        </FormControl>

        <Button colorScheme="blue" w="full" type="submit" isLoading={isLoading}>
          Register
        </Button>
      </Box>
    </form>
  );
};

export default FinalRegistration;
