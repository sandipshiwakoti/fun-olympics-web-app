import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import {
  createBroadcast,
  createOwnBroadcastComment,
  deleteOwnBroadcastComment,
  editBroadcast,
  getBroadcastById,
  getBroadcasts,
  removeBroadcast,
} from "../api/api";
import { CreateEditBroadcastPayload } from "../types/broadcast";

export const useBroadcasts = (search: string = "") => {
  return useInfiniteQuery(
    ["broadcasts", search],
    ({ pageParam = 1 }) => getBroadcasts({ pageParam, search }),
    {
      getNextPageParam: (lastPage) => {
        if (lastPage.data.meta.currentPage < lastPage.data.meta.totalPages) {
          return lastPage.data.meta.currentPage + 1;
        }
        return undefined;
      },
    }
  );
};

export const useBroadcastById = (id: number) => {
  return useQuery(["broadcasts", id], () => getBroadcastById(id));
};

export const useCreateOwnBroadcastComment = (handleSuccess: () => void) => {
  return useMutation(createOwnBroadcastComment, {
    onSuccess: () => {
      handleSuccess();
    },

    onError: (err) => {
      console.log(err);
    },
  });
};
export const useBroadcastsForTable = (
  search: string = "",
  pageParam: number = 1
) => {
  return useQuery(["broadcasts-table"], () =>
    getBroadcasts({ pageParam, search })
  );
};

export const useCreateBroadcast = (
  handleSuccess: (message: string) => void,
  handleError: (message: string) => void
) => {
  const queryClient = useQueryClient();
  return useMutation(createBroadcast, {
    onSuccess: (data) => {
      handleSuccess(data?.message);
      queryClient.invalidateQueries(["broadcasts-table"]);
      queryClient.invalidateQueries(["broadcasts"]);
    },

    onError: (err: any) => {
      handleError(err.response?.data?.message);
    },
  });
};

export const useEditBroadcast = (
  id: number,
  handleSuccess: (message: string) => void,
  handleError: (nessage: string) => void
) => {
  const queryClient = useQueryClient();
  return useMutation(
    (data: CreateEditBroadcastPayload) => editBroadcast(id, data),
    {
      onSuccess: (data) => {
        handleSuccess(data?.message);
        queryClient.invalidateQueries(["broadcasts-table"]);
        queryClient.invalidateQueries(["broadcasts"]);
      },

      onError: (err: any) => {
        handleError(err?.response?.data?.message);
      },
    }
  );
};

export const useRemoveBroadcast = (
  id: number,
  handleSuccess: (message: string) => void,
  handleError: (nessage: string) => void
) => {
  const queryClient = useQueryClient();
  return useMutation(() => removeBroadcast(id), {
    onSuccess: (data) => {
      handleSuccess(data?.message);
      queryClient.invalidateQueries(["broadcasts-table"]);
      queryClient.invalidateQueries(["broadcasts"]);
    },

    onError: (err: any) => {
      handleError(err?.response?.data?.message);
    },
  });
};
