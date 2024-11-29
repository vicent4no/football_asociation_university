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
