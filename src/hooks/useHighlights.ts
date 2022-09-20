import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import {
  createHighlight,
  createOwnHighlightComment,
  deleteOwnHighlightComment,
  editHighlight,
  getHighlightById,
  getHighlights,
  removeHighlight,
} from "../api/api";
import { CreateEditHighlightPayload } from "../types/highlight";

export const useHighlights = (search: string = "") => {
  return useInfiniteQuery(
    ["highlights", search],
    ({ pageParam = 1 }) => getHighlights({ pageParam, search }),
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

export const useHighlightById = (id: number) => {
  return useQuery(["highlights", id], () => getHighlightById(id));
};

export const useHighlightsForTable = (
  search: string = "",
  pageParam: number = 1
) => {
  return useQuery(["highlights-table"], () =>
    getHighlights({ pageParam, search })
  );
};

export const useCreateHighlight = (
  handleSuccess: (message: string) => void,
  handleError: (message: string) => void
) => {
  const queryClient = useQueryClient();
  return useMutation(createHighlight, {
    onSuccess: (data) => {
      handleSuccess(data?.message);
      queryClient.invalidateQueries(["highlights-table"]);
      queryClient.invalidateQueries(["highlights"]);
    },

    onError: (err: any) => {
      handleError(err.response?.data?.message);
    },
  });
};

export const useEditHighlight = (
  id: number,
  handleSuccess: (message: string) => void,
  handleError: (nessage: string) => void
) => {
  const queryClient = useQueryClient();
  return useMutation(
    (data: CreateEditHighlightPayload) => editHighlight(id, data),
    {
      onSuccess: (data) => {
        handleSuccess(data?.message);
        queryClient.invalidateQueries(["highlights-table"]);
        queryClient.invalidateQueries(["highlights"]);
      },

      onError: (err: any) => {
        handleError(err?.response?.data?.message);
      },
    }
  );
};

export const useRemoveHighlight = (
  id: number,
  handleSuccess: (message: string) => void,
  handleError: (nessage: string) => void
) => {
  const queryClient = useQueryClient();
  return useMutation(() => removeHighlight(id), {
    onSuccess: (data) => {
      handleSuccess(data?.message);
      queryClient.invalidateQueries(["highlights-table"]);
      queryClient.invalidateQueries(["highlights"]);
    },

    onError: (err: any) => {
      handleError(err?.response?.data?.message);
    },
  });
};
