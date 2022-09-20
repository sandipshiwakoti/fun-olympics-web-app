import {
  Box,
  Button,
  Center,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Input,
  InputGroup,
  Textarea,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { Controller, useForm, useFormContext } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import ImageDropzone from "../../../../components/common/ImageDropzone";
import Datetime from "react-datetime";
import moment from "moment";

const schema = yup
  .object({
    title: yup.string().required("Title is required."),
    description: yup.string().required("Description is required."),
    content: yup.string().required("Content is required."),
    author: yup.string().required("Author is required."),
  })
  .required();

type News = {
  id: number;
  title: string;
  description: string;
  img?: string;
  author: string;
  content: string;
  publishedAt: string;
};

type NewsPayload = {
  id?: number;
  title: string;
  description: string;
  file?: File;
  author: string;
  content: string;
  publishedAt: string;
};

interface NewsFormProps {
  data?: News;
  action: (data: FormData) => void;
  isLoading: boolean;
}

const NewsForm: React.FC<NewsFormProps> = ({ data, action, isLoading }) => {
  const [value, onChange] = useState(new Date());

  const {
    handleSubmit,
    register,
    watch,
    setValue,
    control,
    formState: { errors },
  } = useForm<NewsPayload>({ resolver: yupResolver(schema) });

  const onSubmit = (data: NewsPayload) => {
    const formData = new FormData();
    data?.id && formData.append("id", data.id.toString());
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("content", data.content);
    formData.append("author", data.description);
    formData.append("publishedAt", data.publishedAt);
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
        formLabel="News Image"
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
      <FormControl isInvalid={!!errors.description} mb="5">
        <FormLabel>Author </FormLabel>
        <Input
          defaultValue={data?.author}
          placeholder="Enter author"
          {...register("author")}
        />
        <FormErrorMessage>{errors?.author?.message}</FormErrorMessage>
      </FormControl>
      <FormControl isInvalid={!!errors.content} mb="5">
        <FormLabel>Content</FormLabel>
        <Textarea
          defaultValue={data?.content}
          placeholder="Enter content"
          {...register("content")}
        />
        <FormErrorMessage>{errors?.content?.message}</FormErrorMessage>
      </FormControl>

      <Controller
        control={control}
        name="publishedAt"
        defaultValue={data?.publishedAt}
        render={({ field: { onChange } }) => {
          return (
            <FormControl isInvalid={!!errors.publishedAt} mb="5">
              <FormLabel>Published at</FormLabel>
              <Datetime
                onChange={(newValue) => {
                  onChange(moment(newValue));
                }}
                inputProps={{
                  placeholder: "MM-DD-YYYY HH:mm",
                }}
                initialValue={moment(data?.publishedAt)}
              />
              <FormErrorMessage>{errors.publishedAt?.message}</FormErrorMessage>
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

export default NewsForm;
