import { User } from "./User.ts";

export type SignInRequest = {
  dni: string;
  contrasenia: string;
};

export type SignInResponse = {
  data: {
    token: string;
    fechaExpiracion: string;
    usuario: User;
  };
};
