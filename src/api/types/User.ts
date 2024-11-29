export enum UserRoles {
  ASSOCIATION_REPRESENTATIVE = "representante_asociacion",
  TEAM_REPRESENTATIVE = "representante_equipo",
  TECHNICAL_DIRECTOR = "director_tecnico",
  PLAYER = "jugador",
}

export type User = {
  id: number;
  foto: string;
  dni: string;
  nombre: string;
  apellido: string;
  fechaNacimiento: string;
  calle: string;
  numero: string;
  ciudad: string;
  nTelefono1: string;
  esJugador: boolean;
  esDirectorTecnico: boolean;
  esRepresentanteEquipo: boolean;
  esEncargadoAsociacion: boolean;
  nSocio: string;
  idCategoria: number;
  idDivision: number;
};
