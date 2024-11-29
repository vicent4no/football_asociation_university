import { Tournament } from "./Tournament.ts";
import { User } from "./User.ts";

export type Team = {
  id: number;
  nombre: string;
  idDirectorTecnico: number;
  idRepresentanteEquipo: number;
  idTorneo: number;
  torneo: Tournament;
  directorTecnico: User;
  representanteEquipo: User;
};

export type CreateTeamRequest = {
  nombre: string;
  idDirectorTecnico: number;
  idRepresentanteEquipo: number;
  idTorneo: number;
};

export type CreateTeamResponse = {
  data: {
    mensaje: string;
    equipoId: number;
    nombre: string;
  };
};

export type JoinTeamRequest = {
  idJugador: number;
};

export type JoinTeamResponse = {
  data: { mensaje: string };
};
