import axios from "axios";
import { atomWithQuery } from "jotai-tanstack-query";
import { ApiResource } from "../api/ApiResource.ts";
import { BaseRoutes } from "../api/BaseRoutes.ts";
import { Team } from "../api/types/Team.ts";
import { AtomQueryKeys } from "./AtomQueryKeys.ts";
import authenticationAtom from "./authenticationAtom.tsx";

export const availableTeamsAtom = atomWithQuery((get) => ({
  queryKey: [
    AtomQueryKeys.TEAMS_AVAILABLE,
    get(authenticationAtom)!.user.idCategoria,
    get(authenticationAtom)!.user.idDivision,
  ],
  queryFn: async ({ queryKey: [, categoryId, divisionId] }) => {
    const request = await axios.get<Team[]>(
      `${BaseRoutes[ApiResource.TEAMS]()}?listarSoloDisponibles=true&idDivision=${divisionId}&idCategoria=${categoryId}`,
      {
        headers: {
          Authorization: `Bearer ${get(authenticationAtom)!.bearerToken}`,
        },
      }
    );

    return request.data;
  },
}));

export default availableTeamsAtom;
