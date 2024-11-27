import axios from "axios";
import { atomWithQuery } from "jotai-tanstack-query";
import { ApiResource } from "../api/ApiResource.ts";
import { BaseRoutes } from "../api/BaseRoutes.ts";
import { Category } from "../api/types/Category.ts";
import { AtomQueryKeys } from "./AtomQueryKeys.ts";

const categoriesAtom = atomWithQuery<Category[]>(() => ({
  queryKey: [AtomQueryKeys.CATEGORIES],
  queryFn: async () => {
    const response = await axios.get<Category[]>(
      BaseRoutes[ApiResource.CATEGORIES]()
    );
    return response.data;
  },
}));

export default categoriesAtom;
