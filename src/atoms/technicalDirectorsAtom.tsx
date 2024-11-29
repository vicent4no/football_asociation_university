import axios from "axios";
import { atomWithQuery } from "jotai-tanstack-query";
import { ApiResource } from "../api/ApiResource.ts";
import { BaseRoutes } from "../api/BaseRoutes.ts";
import { User } from "../api/types/User.ts";
import { AtomQueryKeys } from "./AtomQueryKeys.ts";
import authenticationAtom from "./authenticationAtom.tsx";

export const freeTechnicalDirectorsAtom = atomWithQuery((get) => ({
  queryKey: [AtomQueryKeys.TECHNICAL_DIRECTORS_FREE],
  queryFn: async () => {
    const request = await axios.get<User[]>(
      BaseRoutes[ApiResource.TECHNICAL_DIRECTORS_FREE](),
      {
        headers: {
          Authorization: `Bearer ${get(authenticationAtom)!.bearerToken}`,
        },
      }
    );

    return request.data;
  },
}));
