import { ApiResource } from "./ApiResource.ts";

const BASE_DOMAIN = import.meta.env.VITE_API_DOMAIN as string;

export const BaseRoutes = {
  [ApiResource.LOGIN]: () => `${BASE_DOMAIN}/login`,
  [ApiResource.SIGN_IN]: () => `${BASE_DOMAIN}/sign_in`,
  [ApiResource.SIGN_UP]: () => `${BASE_DOMAIN}/sign_up`,
  [ApiResource.USERS]: () => `${BASE_DOMAIN}/users`,
} as const;
