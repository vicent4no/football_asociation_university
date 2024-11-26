export enum UserRoles {
  ASSOCIATION_REPRESENTATIVE = "representante_asociacion",
  TEAM_REPRESENTATIVE = "representante_equipo",
  TECHNICAL_DIRECTOR = "director_tecnico",
  PLAYER = "jugador",
}

export type User = {
  dni: string;
};
