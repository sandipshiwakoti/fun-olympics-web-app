import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import {
  createGame,
  editGame,
  getGameById,
  getGames,
  removeGame,
} from "../api/api";

export const useGames = (search: string = "") => {
  return useInfiniteQuery(
    ["games", search],
    ({ pageParam = 1 }) => getGames({ pageParam, search }),
    {
      getNextPageParam: (lastPage) => {
        if (lastPage.data.meta.currentPage < lastPage.data.meta.totalPages) {
          return lastPage.data.meta.currentPage + 1;
        }
        return undefined;
      },
      getPreviousPageParam: (firstPage) => {
        if (firstPage.data.meta.currentPage > 1) {
          return firstPage.data.meta.currentPage - 1;
        }
        return undefined;
      },
    }
  );
};

export const useGamesForTable = (
  search: string = "",
  pageParam: number = 1
) => {
  return useQuery(["games-table"], () => getGames({ pageParam, search }));
};

export const useGameById = (id: number) => {
  return useQuery(["games-table", id], () => getGameById(id));
};

export const useCreateGame = (
  handleSuccess: (message: string) => void,
  handleError: (message: string) => void
) => {
  const queryClient = useQueryClient();
  return useMutation(createGame, {
    onSuccess: (data) => {
      handleSuccess(data?.message);
      queryClient.invalidateQueries(["games-table"]);
      queryClient.invalidateQueries(["games"]);
    },

    onError: (err: any) => {
      handleError(err.response?.data?.message);
    },
  });
};

export const useEditGame = (
  id: number,
  handleSuccess: (message: string) => void,
  handleError: (nessage: string) => void
) => {
  const queryClient = useQueryClient();
  return useMutation((data: FormData) => editGame(id, data), {
    onSuccess: (data) => {
      handleSuccess(data?.message);
      queryClient.invalidateQueries(["games-table"]);
      queryClient.invalidateQueries(["games"]);
    },

    onError: (err: any) => {
      handleError(err?.response?.data?.message);
    },
  });
};

export const useRemoveGame = (
  id: number,
  handleSuccess: (message: string) => void,
  handleError: (nessage: string) => void
) => {
  const queryClient = useQueryClient();
  return useMutation(() => removeGame(id), {
    onSuccess: (data) => {
      handleSuccess(data?.message);
      queryClient.invalidateQueries(["games-table"]);
      queryClient.invalidateQueries(["games"]);
    },

    onError: (err: any) => {
      handleError(err?.response?.data?.message);
    },
  });
};
