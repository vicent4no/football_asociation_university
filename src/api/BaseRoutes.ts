import { ApiResource } from "./ApiResource.ts";

const BASE_DOMAIN = import.meta.env.VITE_API_DOMAIN as string;

export const BaseRoutes = {
  [ApiResource.SIGN_IN]: () => `${BASE_DOMAIN}/Autentificacion/validar`,
  [ApiResource.SIGN_UP]: () => `${BASE_DOMAIN}/Personas`,
  [ApiResource.USERS]: () => `${BASE_DOMAIN}/users`,
  [ApiResource.CATEGORIES]: () => `${BASE_DOMAIN}/Categoria`,
  [ApiResource.DIVISIONS]: () => `${BASE_DOMAIN}/Division`,
  [ApiResource.TOURNAMENTS]: () => `${BASE_DOMAIN}/Torneos`,
  [ApiResource.TOURNAMENTS_ACTIVE]: () =>
    `${BASE_DOMAIN}/Torneos/inscripcion-activas`,
} as const;
