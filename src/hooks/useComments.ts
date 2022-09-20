import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import {
  createOwnHighlightComment,
  createOwnNewsComment,
  deleteOwnBroadcastComment,
  deleteOwnHighlightComment,
  deleteOwnNewsComment,
  getBroadcastComments,
  getHighlightComments,
  getNewsComments,
} from "../api/api";

// highlight comments
export const useHighlightComments = (
  search: string = "",
  highlightId: number
) => {
  return useInfiniteQuery(
    ["highlight-comments", search, highlightId],
    ({ pageParam = 1 }) =>
      getHighlightComments({ pageParam, search, highlightId }),
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

export const useCreateOwnHighlightComment = (handleSuccess: () => void) => {
  const queryClient = useQueryClient();

  return useMutation(createOwnHighlightComment, {
    onSuccess: () => {
      queryClient.invalidateQueries(["highlight-comments"]);
      handleSuccess();
    },

    onError: (err) => {
      console.log(err);
    },
  });
};

export const useDeleteOwnHighlightComment = () => {
  const queryClient = useQueryClient();

  return useMutation(deleteOwnHighlightComment, {
    onSuccess: () => {
      queryClient.invalidateQueries(["highlight-comments"]);
    },

    onError: (err) => {
      alert(err);
    },
  });
};

// news comments
export const useNewsComments = (search: string = "", newsId: number) => {
  return useInfiniteQuery(
    ["news-comments", search, newsId],
    ({ pageParam = 1 }) => getNewsComments({ pageParam, search, newsId }),
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

export const useCreateOwnNewsComment = (handleSuccess: () => void) => {
  const queryClient = useQueryClient();

  return useMutation(createOwnNewsComment, {
    onSuccess: () => {
      queryClient.invalidateQueries(["news-comments"]);
      handleSuccess();
    },

    onError: (err) => {
      console.log(err);
    },
  });
};

export const useDeleteOwnNewsComment = () => {
  const queryClient = useQueryClient();
  return useMutation(deleteOwnNewsComment, {
    onSuccess: () => {
      queryClient.invalidateQueries(["news-comments"]);
    },

    onError: (err) => {
      console.log(err);
    },
  });
};

// broadcast comments
export const useDeleteOwnBroadcastComment = (handleSuccess: () => void) => {
  return useMutation(deleteOwnBroadcastComment, {
    onSuccess: () => {
      handleSuccess();
    },

    onError: (err) => {
      console.log(err);
    },
  });
};
