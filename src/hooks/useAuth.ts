import { useMutation, useQuery } from "@tanstack/react-query";
import {
  getProfile,
  login,
  registration,
  requestRegistration,
  resetPassword,
  updateProfile,
  verifyRegistration,
} from "../api/api";

export const useLogin = (
  handleSuccess: (data: any) => void,
  handleError: (err: any) => void
) => {
  return useMutation(login, {
    onSuccess: (data: any) => {
      handleSuccess(data);
    },
    onError: (err: any) => {
      handleError(err);
    },
  });
};

export const useRequestRegistration = (
  handleSuccess: (message: string) => void,
  handleError: (err: any) => void
) => {
  return useMutation(requestRegistration, {
    onSuccess: (data: any) => {
      handleSuccess(data?.message);
    },
    onError: (err: any) => {
      handleError(err);
    },
  });
};

export const useVerifyRegistration = (
  handleSuccess: (message: string) => void,
  handleError: (err: any) => void
) => {
  return useMutation(verifyRegistration, {
    onSuccess: (data: any) => {
      handleSuccess(data?.message);
    },
    onError: (err: any) => {
      handleError(err);
    },
  });
};

export const useRegistration = (
  handleSuccess: (message: string) => void,
  handleError: (err: any) => void
) => {
  return useMutation(registration, {
    onSuccess: (data: any) => {
      handleSuccess(data?.message);
    },
    onError: (err: any) => {
      handleError(err);
    },
  });
};

export const useUpdateProfle = (
  handleSuccess: (message: string) => void,
  handleError: (err: any) => void
) => {
  return useMutation(updateProfile, {
    onSuccess: (data: any) => {
      handleSuccess(data?.message);
    },
    onError: (err: any) => {
      handleError(err);
    },
  });
};

export const useResetPassword = (
  handleSuccess: (message: string) => void,
  handleError: (message: string) => void
) => {
  return useMutation(resetPassword, {
    onSuccess: (data: any) => {
      handleSuccess(data?.message);
    },
    onError: (err: any) => {
      handleError(err?.response?.data?.message);
    },
  });
};

export const useGetProfile = () => {
  return useQuery(["profile"], getProfile);
};
