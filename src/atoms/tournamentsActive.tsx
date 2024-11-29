import axios from "axios";
import { atomWithQuery } from "jotai-tanstack-query";
import { ApiResource } from "../api/ApiResource.ts";
import { BaseRoutes } from "../api/BaseRoutes.ts";
import { Tournament } from "../api/types/Tournament.ts";
import { AtomQueryKeys } from "./AtomQueryKeys.ts";
import authenticationAtom from "./authenticationAtom.tsx";

const tournamentsActiveAtom = atomWithQuery((get) => ({
  queryKey: [AtomQueryKeys.TOURNAMENTS_ACTIVE],
  queryFn: async () => {
    const request = await axios.get<Tournament[]>(
      BaseRoutes[ApiResource.TOURNAMENTS_ACTIVE](),
      {
        headers: {
          Authorization: `Bearer ${get(authenticationAtom)!.bearerToken}`,
        },
      }
    );

    return request.data;
  },
}));

export default tournamentsActiveAtom;
