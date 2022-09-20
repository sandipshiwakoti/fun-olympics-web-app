import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Input,
} from "@chakra-ui/react";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Select as ReactSelect } from "chakra-react-select";
import { CreateEditHighlightPayload } from "../../../../types/highlight";
import { useBroadcastsForTable } from "../../../../hooks/useBroadcasts";

const schema = yup
  .object({
    title: yup.string().required("Title is required."),
    description: yup.string().required("Description is required."),
    link: yup.string().required("Link is required."),
    broadcastId: yup.string().required("Game is required."),
  })
  .required();

interface HighlightFormProps {
  data?: any;
  action: (data: CreateEditHighlightPayload) => void;
  isLoading: boolean;
}

const HighlightForm: React.FC<HighlightFormProps> = ({
  data,
  action,
  isLoading,
}) => {
  const {
    control,
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<CreateEditHighlightPayload>({ resolver: yupResolver(schema) });
  const { isLoading: isBroadcastsLoading, data: broadcasts } =
    useBroadcastsForTable();

  const onSubmit = (data: CreateEditHighlightPayload) => {
    action({ ...data, broadcastId: Number(data.broadcastId) });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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
        <FormErrorMessage>{errors?.link?.message}</FormErrorMessage>
      </FormControl>
      <FormControl isInvalid={!!errors.link} mb="5">
        <FormLabel>Link</FormLabel>
        <Input
          defaultValue={data?.link}
          placeholder="Enter Link"
          {...register("link")}
        />
        <FormErrorMessage>{errors?.link?.message}</FormErrorMessage>
      </FormControl>

      {!isBroadcastsLoading && (
        <Controller
          control={control}
          name="broadcastId"
          defaultValue={data?.broadcast?.id}
          render={({ field: { onChange, onBlur, value, name, ref } }) => {
            const option = broadcasts.data.items.map(({ title, id }: any) => {
              return {
                label: title.charAt(0).toUpperCase() + title.slice(1),
                value: id,
              };
            });
            return (
              <FormControl isInvalid={!!errors.broadcastId} mb="5">
                <FormLabel>Event</FormLabel>

                <ReactSelect
                  name={name}
                  ref={ref}
                  onBlur={onBlur}
                  value={
                    option && value
                      ? option.find((option: any) => option?.value === value)
                      : null
                  }
                  onChange={(option: any) => onChange(option?.value)}
                  placeholder="Select broadcast"
                  options={option}
                />

                <FormErrorMessage>
                  {errors.broadcastId?.message}
                </FormErrorMessage>
              </FormControl>
            );
          }}
        />
      )}
      <HStack justifyContent="flex-end">
        <Button colorScheme="blue" type="submit" isLoading={isLoading}>
          Submit
        </Button>
      </HStack>
    </form>
  );
};

export default HighlightForm;
