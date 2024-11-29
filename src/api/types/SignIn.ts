export type SignInRequest = {
  dni: string;
  contrasenia: string;
};

export type SignInResponse = {
  data: {
    token: string;
    fechaExpiracion: string;
    foto: string;
    esJugador: boolean;
    esDirectorTecnico: boolean;
    esRepresentanteEquipo: boolean;
    esEncargadoAsociacion: boolean;
    id: string;
    nombre: string;
    apellido: string;
    fechaNacimiento: string;
  };
};
