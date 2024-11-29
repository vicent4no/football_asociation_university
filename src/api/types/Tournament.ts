import { Category } from "./Category.ts";
import { Division } from "./Division.ts";

export type Tournament = {
  id: number;
  nombre: string;
  fechaInicio: string;
  fechaFinalizacion: string;
  fechaInicioInscripcion: string;
  fechaFinalizacionInscripcion: string;
  idCategoria: number;
  idDivision: number;
  categoria?: Category;
  division?: Division;
};

export type CreateTournamentRequest = {
  Nombre: string;
  FechaInicio: Date;
  FechaFinalizacion: Date;
  FechaInicioInscripcion: Date;
  FechaFinalizacionInscripcion: Date;
  IdEncargadoAsociacion: number;
  IdCategoria: number;
  IdDivision: number;
  Ruedas: number;
};

export type CreateTournamentResponse = {
  data: {
    mensaje: string;
    torneoId: number;
  };
};
