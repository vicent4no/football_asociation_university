export type SignInRequest = {
  dni: string;
  password: string;
};

export type SignInResponse = {
  token: string;
  expirationDate: string;
};
