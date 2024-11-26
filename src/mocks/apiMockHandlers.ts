import { http, HttpResponse } from "msw";
import { ApiResource } from "../api/ApiResource.ts";
import { BaseRoutes } from "../api/BaseRoutes.ts";

const apiMockHandlers = [
  http.get<never, never>(BaseRoutes[ApiResource.LOGIN](), () => {
    return HttpResponse.json({ message: "ok" });
  }),
];

export default apiMockHandlers;
