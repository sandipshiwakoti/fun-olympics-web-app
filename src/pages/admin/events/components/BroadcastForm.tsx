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
import { CreateEditBroadcastPayload } from "../../../../types/broadcast";
import Datetime from "react-datetime";
import moment from "moment";
import { useGamesForTable } from "../../../../hooks/useGames";
import { Select as ReactSelect } from "chakra-react-select";

const schema = yup
  .object({
    title: yup.string().required("Title is required."),
    description: yup.string().required("Description is required."),
    scheduledAt: yup.string().required("Scheduled time is required."),
    link: yup.string().required("Link is required."),
    gameId: yup.string().required("Game is required."),
  })
  .required();

interface BroadcastFormProps {
  data?: any;
  action: (data: CreateEditBroadcastPayload) => void;
  isLoading: boolean;
}

const BroadcastForm: React.FC<BroadcastFormProps> = ({
  data,
  action,
  isLoading,
}) => {
  const {
    watch,
    control,
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<CreateEditBroadcastPayload>({ resolver: yupResolver(schema) });
  const { isLoading: isGamesLoading, data: games } = useGamesForTable();

  const onSubmit = (data: CreateEditBroadcastPayload) => {
    action({ ...data, gameId: Number(data.gameId) });
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

      <Controller
        control={control}
        name="scheduledAt"
        defaultValue={data?.scheduledAt || moment(new Date()).toISOString()}
        render={({ field: { onChange } }) => {
          return (
            <FormControl isInvalid={!!errors.scheduledAt} mb="5">
              <FormLabel>Scheduled at</FormLabel>

              <Datetime
                onChange={(newValue) => {
                  onChange(moment(newValue).toISOString());
                }}
                inputProps={{
                  placeholder: "MM-DD-YYYY HH:mm",
                }}
                initialValue={moment(data?.scheduledAt)}
              />
              <FormErrorMessage>{errors.scheduledAt?.message}</FormErrorMessage>
            </FormControl>
          );
        }}
      />
      {!isGamesLoading && (
        <Controller
          control={control}
          name="gameId"
          defaultValue={data?.game?.id}
          render={({ field: { onChange, onBlur, value, name, ref } }) => {
            const gamesOption = games.data.items.map(({ title, id }: any) => {
              return {
                label: title.charAt(0).toUpperCase() + title.slice(1),
                value: id,
              };
            });
            return (
              <FormControl isInvalid={!!errors.gameId} mb="5">
                <FormLabel>Game</FormLabel>

                <ReactSelect
                  name={name}
                  ref={ref}
                  onBlur={onBlur}
                  value={
                    gamesOption && value
                      ? gamesOption.find(
                          (option: any) => option?.value === value
                        )
                      : null
                  }
                  onChange={(option: any) => onChange(option?.value)}
                  placeholder="Select game"
                  options={gamesOption}
                />

                <FormErrorMessage>{errors.gameId?.message}</FormErrorMessage>
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

export default BroadcastForm;
