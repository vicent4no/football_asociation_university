export type SignInRequest = {
  dni: string;
  password: string;
};

export type SignInResponse = {
  token: string;
  expirationDate: string;
  foto: string;
  esJugador: boolean;
  esDirectorTecnico: boolean;
  esRepresentanteEquipo: boolean;
  esRepresentanteAsociacion: boolean;
};
