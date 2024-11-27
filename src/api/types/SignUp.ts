export type SignUpRequest = {
  dni: string;
  contraseña: string;
  nombre: string;
  apellido: string;
  fechaNacimiento: Date;
  calle: string;
  numero: string;
  ciudad: string;
  nTelefono: string;
  esJugador?: boolean;
  foto?: string;
  idDivision?: number;
  esRepresentanteEquipo?: boolean;
  esDirectorTecnico?: boolean;
};
