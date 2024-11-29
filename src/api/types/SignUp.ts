export type SignUpRequest = {
  Dni: string;
  Contraseña: string;
  Nombre: string;
  Apellido: string;
  FechaNacimiento: Date;
  Calle: string;
  Numero: string;
  Ciudad: string;
  NTelefono1: string;
  EsJugador?: boolean;
  Foto?: string;
  IdDivision?: number;
  EsRepresentanteEquipo?: boolean;
  EsDirectorTecnico?: boolean;
};

export type SignUpResponse = {
  data: { mensaje: string };
};
