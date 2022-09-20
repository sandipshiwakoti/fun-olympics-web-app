import {
  Box,
  Stack,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  useToast,
} from "@chakra-ui/react";
import { Controller, useForm } from "react-hook-form";
import { FaUserAlt, FaEnvelope } from "react-icons/fa";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { UpdateProfile } from "../../types/user";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Select } from "chakra-react-select";
import { useAuth } from "../../contexts/auth";
import { countries } from "../../data/auth";
import { useGamesForTable } from "../../hooks/useGames";
import { useGetProfile, useUpdateProfle } from "../../hooks/useAuth";
import ImageDropzone from "../common/ImageDropzone";

const schema = yup
  .object({
    name: yup.string().required("Fullname is required."),
    email: yup
      .string()
      .required("Email is required.")
      .email("Email must be valid."),
    country: yup.string().required("Country is required."),
  })
  .required();

const UpdateProfile = () => {
  const { fetchUser } = useAuth();
  const toast = useToast();

  const countriesOption = countries.map((country) => {
    return { label: country, value: country };
  });

  const handleSuccess = (message: string) => {
    fetchUser();
    toast({
      title: message || "Successfully updated!",
      status: "success",
      duration: 5000,
      isClosable: true,
    });
  };

  const handleError = (err: any) => {
    toast({
      title: err.response?.data?.message || "Failed to update profile!",
      status: "error",
      duration: 5000,
      isClosable: true,
    });
  };

  const { isLoading: isProfileDataLoading, data: profileData } =
    useGetProfile();

  const { mutate, isLoading } = useUpdateProfle(handleSuccess, handleError);

  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors },
  } = useForm<UpdateProfile>({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: UpdateProfile) => {
    const formData = new FormData();
    if (data?.file) {
      formData.append("file", data.file);
    }
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("country", data.country);

    mutate(formData);
  };

  useEffect(() => {
    if (profileData?.data) {
      setValue("name", profileData.data.name);
      setValue("email", profileData.data.email);
      setValue("country", profileData.data.country);
      setValue("img", profileData.data.img);
    }
  }, [setValue, profileData]);

  const setFile = (file: any) => {
    setValue("file", file);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box bg="white" borderRadius="lg" p="10" w="550px">
        <Heading size="lg" mb="7" textAlign="center">
          Update your profile
        </Heading>
        <ImageDropzone
          defaultValue={watch("img")}
          file={watch("file")}
          setFile={setFile}
          formLabel="Profile picture"
        />
        <FormControl isInvalid={!!errors.name} mb="5">
          <FormLabel>Fullname</FormLabel>
          <InputGroup>
            <InputLeftElement pointerEvents="none">
              <Icon as={FaUserAlt} color="gray.300" />
            </InputLeftElement>
            <Input placeholder="Enter your full name" {...register("name")} />
          </InputGroup>
          <FormErrorMessage>{errors.name?.message}</FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={!!errors.email} mb="5">
          <FormLabel>Email</FormLabel>
          <InputGroup>
            <InputLeftElement pointerEvents="none">
              <Icon as={FaEnvelope} color="gray.300" />
            </InputLeftElement>
            <Input
              disabled
              placeholder="Enter your email address"
              {...register("email")}
            />
          </InputGroup>
          <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
        </FormControl>

        <Controller
          control={control}
          name="country"
          render={({ field: { onChange, onBlur, value, name, ref } }) => {
            return (
              <FormControl isInvalid={!!errors.country} mb="5">
                <FormLabel>Country</FormLabel>

                <Select
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

        <Button colorScheme="blue" w="full" type="submit" isLoading={isLoading}>
          Update profile
        </Button>
      </Box>
    </form>
  );
};

export default UpdateProfile;
