import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Input,
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

const schema = yup
  .object({
    name: yup.string().required("Name is required."),
    email: yup.string().required("Email is required."),
  })
  .required();

interface UserFormProps {
  data?: User;
  action: (data: FormData) => void;
  isLoading: boolean;
}

const UserForm: React.FC<UserFormProps> = ({ data, action, isLoading }) => {
  // const { isLoading: isGamesLoading, data: games } = useGamesForTable();
  const {
    control,
    handleSubmit,
    register,
    watch,
    setValue,
    formState: { errors },
  } = useForm<User>({ resolver: yupResolver(schema) });

  const onSubmit = (data: User) => {
    const formData = new FormData();
    data?.id && formData.append("id", data.id.toString());
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("mobile", data.mobile);
    formData.append("country", data.country);
    data?.file && formData.append("file", data.file);
    action(formData);
  };

  const setFile = (file: any) => {
    setValue("file", file);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <ImageDropzone
        defaultValue={data?.img || null}
        file={watch("file")}
        setFile={setFile}
        formLabel="User Image"
      />
      <FormControl isInvalid={!!errors.name} mb="5">
        <FormLabel>Full name</FormLabel>
        <Input
          defaultValue={data?.name}
          placeholder="Enter name"
          {...register("name")}
        />
        <FormErrorMessage>{errors?.name?.message}</FormErrorMessage>
      </FormControl>
      <FormControl isInvalid={!!errors.email} mb="5">
        <FormLabel>Email</FormLabel>
        <Input
          defaultValue={data?.email}
          placeholder="Enter email"
          {...register("email")}
        />
        <FormErrorMessage>{errors?.email?.message}</FormErrorMessage>
      </FormControl>
      <FormControl isInvalid={!!errors.mobile} mb="5">
        <FormLabel>Mobile</FormLabel>
        <Input
          defaultValue={data?.mobile}
          placeholder="Enter mobile"
          {...register("mobile")}
        />
        <FormErrorMessage>{errors?.mobile?.message}</FormErrorMessage>
      </FormControl>

      <Controller
        control={control}
        name="country"
        defaultValue={data?.country}
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

      <HStack justifyContent="flex-end">
        <Button colorScheme="blue" type="submit" isLoading={isLoading}>
          Submit
        </Button>
      </HStack>
    </form>
  );
};

export default UserForm;
