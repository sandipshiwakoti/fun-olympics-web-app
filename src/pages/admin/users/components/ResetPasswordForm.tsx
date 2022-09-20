import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import React from "react";
import { Controller, useForm, useFormContext } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import ImageDropzone from "../../../../components/common/ImageDropzone";
import { User } from "../../../../types/user";
import { useGamesForTable } from "../../../../hooks/useGames";
import ReactSelect from "react-select";
import { countries } from "../../../../data/auth";
import { ResetPassword } from "../../../../types/auth";
import { FaLock } from "react-icons/fa";

const schema = yup
  .object({
    email: yup
      .string()
      .required("Email is required.")
      .email("Email must be invalid."),
    password: yup
      .string()
      .required("Password is required.")
      .min(8, "Password must be at least 8 characters")
      .matches(/[a-z]+/, "Password must contain at least 1 lowercase character")
      .matches(/[A-Z]+/, "Password must contain at least 1 uppercase character")
      .matches(
        /[@$!%*#?&]+/,
        "Password must contain at least 1 special character"
      )
      .matches(/\d+/, "Password must contain at least 1 number"),
  })
  .required();

interface ResetPasswordFormProps {
  data: { email: string };
  action: (data: ResetPassword) => void;
  isLoading: boolean;
}

const ResetPasswordForm: React.FC<ResetPasswordFormProps> = ({
  data,
  action,
  isLoading,
}) => {
  const {
    control,
    handleSubmit,
    register,
    watch,
    setValue,
    formState: { errors },
  } = useForm<ResetPassword>({ resolver: yupResolver(schema) });

  const onSubmit = (data: ResetPassword) => {
    action(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormControl isInvalid={!!errors.email} mb="5">
        <FormLabel>Email</FormLabel>

        <Input
          defaultValue={data?.email}
          placeholder="Enter email"
          {...register("email")}
        />
        <FormErrorMessage>{errors?.email?.message}</FormErrorMessage>
      </FormControl>

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
      <HStack justifyContent="flex-end">
        <Button colorScheme="blue" type="submit" isLoading={isLoading}>
          Submit
        </Button>
      </HStack>
    </form>
  );
};

export default ResetPasswordForm;
