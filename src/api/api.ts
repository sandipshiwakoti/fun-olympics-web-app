import axios from "axios";
import Cookies from "js-cookie";
import { baseUrl, urls } from "../config/url";
import {
  Login,
  Registration,
  RequestRegistration,
  ResetPassword,
  VerifyRegistration,
} from "../types/auth";
import { CreateEditBroadcastPayload } from "../types/broadcast";
import { CreateEditHighlightPayload } from "../types/highlight";
import { UpdateProfile } from "../types/user";

axios.defaults.baseURL = baseUrl;
axios.defaults.headers.post["Content-Type"] = "application/json";

const config = {
  headers: { Authorization: `Bearer ${Cookies.get("token")}` },
};

export const login = (data: Login) => {
  return axios
    .post(urls.login, data)
    .then((response) => response.data)
    .catch((err) => err.response.data);
};

export const requestRegistration = (data: RequestRegistration) => {
  return axios
    .post(urls.requestRegistration, data)
    .then((response) => response.data);
};

export const verifyRegistration = (data: VerifyRegistration) => {
  return axios.post(urls.verifyRegistration, data).then((response) => {
    return response.data;
  });
};

export const registration = (data: Registration) => {
  return axios.post(urls.registration, data).then((response) => {
    return response.data;
  });
};

export const resetPassword = (data: ResetPassword) => {
  return axios
    .put(urls.resetPassword, data, config)
    .then((response) => response.data);
};

export const updateProfile = (data: FormData) => {
  return axios.put(urls.profile, data, config).then((response) => {
    return response.data;
  });
};

export const getProfile = () => {
  return axios.get(urls.profile, config).then((response) => {
    return response.data;
  });
};

// users
export const getUsers = ({ pageParam, search }: RequestParamsPayload) => {
  return axios
    .get(urls.user, { ...config, params: { page: pageParam, search } })
    .then((response) => {
      return response.data;
    });
};

export const getUserById = (id: number) => {
  return axios
    .get(urls.userById.replace(":id", id.toString()), config)
    .then((response) => {
      return response.data;
    });
};

export const createUser = (data: FormData) => {
  for (let value of data.values() as any) {
    console.log(value);
  }
  return axios.post(urls.user, data, config).then((response) => {
    return response.data;
  });
};

export const editUser = (id: number, data: FormData) => {
  return axios
    .put(urls.userById.replace(":id", id.toString()), data, config)
    .then((response) => {
      return response.data;
    });
};

export const removeUser = (id: number) => {
  return axios
    .delete(urls.userById.replace(":id", id.toString()), config)
    .then((response) => {
      return response.data;
    });
};

// games
export const getGames = ({ pageParam, search }: RequestParamsPayload) => {
  return axios
    .get(urls.game, { params: { page: pageParam, search } })
    .then((response) => {
      return response.data;
    });
};

export const getGameById = (id: number) => {
  return axios
    .get(urls.gameById.replace(":id", id.toString()), config)
    .then((response) => {
      return response.data;
    });
};

export const createGame = (data: FormData) => {
  return axios.post(urls.game, data, config).then((response) => {
    return response.data;
  });
};

export const editGame = (id: number, data: FormData) => {
  return axios
    .put(urls.gameById.replace(":id", id.toString()), data, config)
    .then((response) => {
      return response.data;
    });
};

export const removeGame = (id: number) => {
  return axios
    .delete(urls.gameById.replace(":id", id.toString()), config)
    .then((response) => {
      return response.data;
    });
};

// broadcasts
export const getBroadcasts = ({ pageParam, search }: RequestParamsPayload) => {
  return axios
    .get(urls.broadcast, {
      ...config,
      params: { page: pageParam, search, limit: 1000 },
    })
    .then((response) => {
      return response.data;
    });
};

export const getBroadcastById = (id: number) => {
  return axios
    .get(urls.broadcastById.replace(":id", id.toString()), config)
    .then((response) => {
      return response.data.data;
    });
};

export const createBroadcast = (data: CreateEditBroadcastPayload) => {
  return axios.post(urls.broadcast, data, config).then((response) => {
    return response.data;
  });
};

export const editBroadcast = (id: number, data: CreateEditBroadcastPayload) => {
  return axios
    .put(urls.broadcastById.replace(":id", id.toString()), data, config)
    .then((response) => {
      return response.data;
    });
};

export const removeBroadcast = (id: number) => {
  return axios
    .delete(urls.broadcastById.replace(":id", id.toString()), config)
    .then((response) => {
      return response.data;
    });
};

export type OwnBroadcastCommentPayload = {
  content: string;
  broadcastId: number;
};

export type OwnHighlightCommentPayload = {
  content: string;
  highlightId: number;
};

export type OwnNewsCommentPayload = {
  content: string;
  newsId: number;
};

export const getBroadcastComments = ({
  pageParam,
  search,
}: RequestParamsPayload) => {
  return axios
    .get(urls.broadcastComment, {
      ...config,
      params: { page: pageParam, search },
    })
    .then((response) => {
      return response.data;
    });
};

export const createOwnBroadcastComment = (data: OwnBroadcastCommentPayload) => {
  return axios.post(urls.ownBroadcastComment, data, config).then((response) => {
    return response.data;
  });
};

export const deleteOwnBroadcastComment = (id: number) => {
  return axios
    .delete(urls.ownBroadcastCommentById.replace(":id", id.toString()), config)
    .then((response) => {
      return response.data;
    });
};

// highlights
export const getHighlights = ({ pageParam, search }: RequestParamsPayload) => {
  return axios
    .get(urls.highlight, { ...config, params: { page: pageParam, search } })
    .then((response) => {
      return response.data;
    });
};

export const getHighlightById = (id: number) => {
  return axios
    .get(urls.highlightById.replace(":id", id.toString()), config)
    .then((response) => {
      return response.data;
    });
};

export const createHighlight = (data: CreateEditHighlightPayload) => {
  return axios.post(urls.highlight, data, config).then((response) => {
    return response.data;
  });
};

export const editHighlight = (id: number, data: CreateEditHighlightPayload) => {
  return axios
    .put(urls.highlightById.replace(":id", id.toString()), data, config)
    .then((response) => {
      return response.data;
    });
};

export const removeHighlight = (id: number) => {
  return axios
    .delete(urls.highlightById.replace(":id", id.toString()), config)
    .then((response) => {
      return response.data;
    });
};

export const getHighlightComments = ({
  pageParam,
  search,
  highlightId,
}: HighlightCommentRequestParamsPayload) => {
  return axios
    .get(urls.highlightComment, {
      ...config,
      params: { page: pageParam, search, highlightId },
    })
    .then((response) => {
      return response.data;
    });
};

export const createOwnHighlightComment = (data: OwnHighlightCommentPayload) => {
  return axios.post(urls.ownHighlightComment, data, config).then((response) => {
    return response.data;
  });
};

export const deleteOwnHighlightComment = (id: number) => {
  return axios
    .delete(urls.ownHighlightCommentById.replace(":id", id.toString()), config)
    .then((response) => {
      return response.data;
    });
};

type RequestParamsPayload = {
  pageParam: number;
  search: string;
};

type HighlightCommentRequestParamsPayload = {
  pageParam: number;
  search: string;
  highlightId: number;
};

type NewsCommentRequestParamsPayload = {
  pageParam: number;
  search: string;
  newsId: number;
};

// news
export const getNews = ({ pageParam, search }: RequestParamsPayload) => {
  return axios
    .get(urls.news, { ...config, params: { page: pageParam, search } })
    .then((response) => {
      return response.data;
    });
};

export const createNews = (data: FormData) => {
  return axios.post(urls.news, data, config).then((response) => {
    return response.data;
  });
};

export const editNews = (id: number, data: FormData) => {
  return axios
    .put(urls.newsById.replace(":id", id.toString()), data, config)
    .then((response) => {
      return response.data;
    });
};

export const removeNews = (id: number) => {
  return axios
    .delete(urls.newsById.replace(":id", id.toString()), config)
    .then((response) => {
      return response.data;
    });
};

export const getNewsComments = ({
  pageParam,
  search,
  newsId,
}: NewsCommentRequestParamsPayload) => {
  return axios
    .get(urls.newsComment, {
      ...config,
      params: { page: pageParam, search, newsId },
    })
    .then((response) => {
      return response.data;
    });
};

export const createOwnNewsComment = (data: OwnNewsCommentPayload) => {
  return axios.post(urls.ownNewsComment, data, config).then((response) => {
    return response.data;
  });
};

export const deleteOwnNewsComment = (id: number) => {
  return axios
    .delete(urls.ownNewsCommentById.replace(":id", id.toString()), config)
    .then((response) => {
      return response.data;
    });
};

export const getNewsById = (id: number) => {
  return axios
    .get(urls.newsById.replace(":id", id.toString()), config)
    .then((response) => {
      return response.data;
    });
};
