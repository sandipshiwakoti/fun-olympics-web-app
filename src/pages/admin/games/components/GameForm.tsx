import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Input,
} from "@chakra-ui/react";
import React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import ImageDropzone from "../../../../components/common/ImageDropzone";

const schema = yup
  .object({
    title: yup.string().required("Title is required."),
    description: yup.string().required("Description is required."),
  })
  .required();

interface EditGameButtonProps {
  id: number;
}

type Game = {
  id: number;
  title: string;
  description: string;
  img?: string;
};

type GamePayload = {
  id?: number;
  title: string;
  description: string;
  file?: File;
};

interface GameFormProps {
  data?: Game;
  action: (data: FormData) => void;
  isLoading: boolean;
}

const GameForm: React.FC<GameFormProps> = ({ data, action, isLoading }) => {
  const {
    handleSubmit,
    register,
    watch,
    setValue,
    formState: { errors },
  } = useForm<GamePayload>({ resolver: yupResolver(schema) });

  const onSubmit = (data: GamePayload) => {
    const formData = new FormData();
    data?.id && formData.append("id", data.id.toString());
    formData.append("title", data.title);
    formData.append("description", data.description);
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
        formLabel="Game Image"
      />
      <FormControl isInvalid={!!errors.title} mb="5">
        <FormLabel>Title</FormLabel>
        <Input
          defaultValue={data?.title}
          placeholder="Enter title"
          {...register("title")}
        />
        <FormErrorMessage>{errors?.title?.message}</FormErrorMessage>
      </FormControl>
      <FormControl isInvalid={!!errors.description} mb="5">
        <FormLabel>Description</FormLabel>
        <Input
          defaultValue={data?.description}
          placeholder="Enter description"
          {...register("description")}
        />
        <FormErrorMessage>{errors?.description?.message}</FormErrorMessage>
      </FormControl>
      <HStack justifyContent="flex-end">
        <Button colorScheme="blue" type="submit" isLoading={isLoading}>
          Submit
        </Button>
      </HStack>
    </form>
  );
};

export default GameForm;
