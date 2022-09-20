import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createUser,
  editUser,
  getUserById,
  getUsers,
  removeUser,
} from "../api/api";

export const useUsersForTable = (
  search: string = "",
  pageParam: number = 1
) => {
  return useQuery(["users-table"], () => getUsers({ pageParam, search }));
};

export const useUserById = (id: number) => {
  return useQuery(["users-table", id], () => getUserById(id));
};

export const useCreateUser = (
  handleSuccess: (message: string) => void,
  handleError: (message: string) => void
) => {
  const queryClient = useQueryClient();
  return useMutation(createUser, {
    onSuccess: (data) => {
      handleSuccess(data?.message);
      queryClient.invalidateQueries(["users-table"]);
      queryClient.invalidateQueries(["users"]);
    },

    onError: (err: any) => {
      handleError(err.response?.data?.message);
    },
  });
};

export const useEditUser = (
  id: number,
  handleSuccess: (message: string) => void,
  handleError: (nessage: string) => void
) => {
  const queryClient = useQueryClient();
  return useMutation((data: FormData) => editUser(id, data), {
    onSuccess: (data) => {
      handleSuccess(data?.message);
      queryClient.invalidateQueries(["users-table"]);
      queryClient.invalidateQueries(["users"]);
    },

    onError: (err: any) => {
      handleError(err?.response?.data?.message);
    },
  });
};

export const useRemoveUser = (
  id: number,
  handleSuccess: (message: string) => void,
  handleError: (nessage: string) => void
) => {
  const queryClient = useQueryClient();
  return useMutation(() => removeUser(id), {
    onSuccess: (data) => {
      handleSuccess(data?.message);
      queryClient.invalidateQueries(["users-table"]);
      queryClient.invalidateQueries(["users"]);
    },

    onError: (err: any) => {
      handleError(err?.response?.data?.message);
    },
  });
};
