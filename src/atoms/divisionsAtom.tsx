import axios from "axios";
import { atomWithQuery } from "jotai-tanstack-query";
import { ApiResource } from "../api/ApiResource.ts";
import { BaseRoutes } from "../api/BaseRoutes.ts";
import { Division } from "../api/types/Division.ts";
import { AtomQueryKeys } from "./AtomQueryKeys.ts";

const divisionsAtom = atomWithQuery<Division[]>(() => ({
  queryKey: [AtomQueryKeys.DIVISIONS],
  queryFn: async () => {
    const response = await axios.get<Division[]>(
      BaseRoutes[ApiResource.DIVISIONS]()
    );
    return response.data;
  },
  placeholderData: [],
}));

export default divisionsAtom;
