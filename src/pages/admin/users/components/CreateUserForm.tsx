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
import { CreateUser, User } from "../../../../types/user";
import { useGamesForTable } from "../../../../hooks/useGames";
import ReactSelect from "react-select";
import { countries } from "../../../../data/auth";
import { FaLock } from "react-icons/fa";

const phoneRegExp =
  /(\+\d{1,3}\s?)?((\(\d{3}\)\s?)|(\d{3})(\s|-?))(\d{3}(\s|-?))(\d{4})(\s?(([E|e]xt[:|.|]?)|x|X)(\s?\d+))?/g;

const schema = yup
  .object({
    name: yup.string().required("Name is required."),
    email: yup
      .string()
      .required("Email is required.")
      .email("Email must be invalid."),
    mobile: yup
      .string()
      .required("Mobile number is required.")
      .matches(phoneRegExp, "Mobile number is not valid"),
    country: yup.string().required("Country is required"),
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
    confirmPassword: yup
      .string()
      .required("Confirm password is required.")
      .oneOf([yup.ref("password"), null], "Passwords must match"),
  })
  .required();

interface CreateUserFormProps {
  action: (data: FormData) => void;
  isLoading: boolean;
}

const CreateUserForm: React.FC<CreateUserFormProps> = ({
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
  } = useForm<CreateUser>({ resolver: yupResolver(schema) });

  const onSubmit = (data: CreateUser) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("mobile", data.mobile);
    formData.append("country", data.country);
    formData.append("role", "user");
    formData.append("password", data.password);
    data?.file && formData.append("file", data.file);

    action(formData);
  };

  const setFile = (file: any) => {
    setValue("file", file);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <ImageDropzone
        defaultValue={null}
        file={watch("file")}
        setFile={setFile}
        formLabel="User Image"
      />
      <FormControl isInvalid={!!errors.name} mb="5">
        <FormLabel>Full name</FormLabel>
        <Input placeholder="Enter name" {...register("name")} />
        <FormErrorMessage>{errors?.name?.message}</FormErrorMessage>
      </FormControl>
      <FormControl isInvalid={!!errors.email} mb="5">
        <FormLabel>Email</FormLabel>
        <Input placeholder="Enter email" {...register("email")} />
        <FormErrorMessage>{errors?.email?.message}</FormErrorMessage>
      </FormControl>
      <FormControl isInvalid={!!errors.mobile} mb="5">
        <FormLabel>Mobile</FormLabel>
        <Input placeholder="Enter mobile" {...register("mobile")} />
        <FormErrorMessage>{errors?.mobile?.message}</FormErrorMessage>
      </FormControl>

      <Controller
        control={control}
        name="country"
        render={({ field: { onChange, onBlur, value, name, ref } }) => {
          const countriesOption = countries.map((country) => {
            return { label: country, value: country };
          });
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

      <HStack justifyContent="flex-end">
        <Button colorScheme="blue" type="submit" isLoading={isLoading}>
          Submit
        </Button>
      </HStack>
    </form>
  );
};

export default CreateUserForm;
