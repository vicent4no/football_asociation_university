// export type Team = {};

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
