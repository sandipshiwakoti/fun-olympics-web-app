export type Login = {
  email: string;
  password: string;
  role: string;
};

export type RequestRegistration = {
  name: string;
  email: string;
  mobile: string;
};

export type VerifyRegistration = {
  email: string;
  registerToken: string;
};

export type Registration = {
  email: string;
  registerToken: string;
  country: string;
  password: string;
};

export type ResetPassword = {
  email: string;
  password: string;
};
