export type User = {
  id?: number;
  name: string;
  email: string;
  file?: any;
  country: string;
  img?: string;
  mobile: string;
};

export type CreateUser = {
  name: string;
  email: string;
  file?: any;
  country: string;
  mobile: string;
  password: string;
  confirmPassword: string;
};

export type UpdateProfile = {
  name: string;
  email: string;
  file?: any;
  country: string;
  img?: string;
};
