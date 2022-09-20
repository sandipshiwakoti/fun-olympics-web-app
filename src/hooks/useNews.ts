import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import {
  createNews,
  createOwnNewsComment,
  deleteOwnNewsComment,
  editNews,
  getNews,
  getNewsById,
  removeNews,
} from "../api/api";

export const useNews = (search: string = "") => {
  return useInfiniteQuery(
    ["news", search],
    ({ pageParam = 1 }) => getNews({ pageParam, search }),
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

export const useNewsById = (id: number) => {
  return useQuery(["news", id], () => getNewsById(id));
};

export const useNewsForTable = (search: string = "", pageParam: number = 1) => {
  return useQuery(["news-table"], () => getNews({ pageParam, search }));
};

export const useCreateNews = (
  handleSuccess: (message: string) => void,
  handleError: (message: string) => void
) => {
  const queryClient = useQueryClient();
  return useMutation(createNews, {
    onSuccess: (data) => {
      handleSuccess(data?.message);
      queryClient.invalidateQueries(["news-table"]);
      queryClient.invalidateQueries(["news"]);
    },

    onError: (err: any) => {
      handleError(err.response?.data?.message);
    },
  });
};

export const useEditNews = (
  id: number,
  handleSuccess: (message: string) => void,
  handleError: (nessage: string) => void
) => {
  const queryClient = useQueryClient();
  return useMutation((data: FormData) => editNews(id, data), {
    onSuccess: (data) => {
      handleSuccess(data?.message);
      queryClient.invalidateQueries(["news-table"]);
      queryClient.invalidateQueries(["news"]);
    },

    onError: (err: any) => {
      handleError(err?.response?.data?.message);
    },
  });
};

export const useRemoveNews = (
  id: number,
  handleSuccess: (message: string) => void,
  handleError: (nessage: string) => void
) => {
  const queryClient = useQueryClient();
  return useMutation(() => removeNews(id), {
    onSuccess: (data) => {
      handleSuccess(data?.message);
      queryClient.invalidateQueries(["news-table"]);
      queryClient.invalidateQueries(["news"]);
    },

    onError: (err: any) => {
      handleError(err?.response?.data?.message);
    },
  });
};
