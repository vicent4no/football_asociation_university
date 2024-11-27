import { http, HttpResponse } from "msw";
import { ApiResource } from "../api/ApiResource.ts";
import { BaseRoutes } from "../api/BaseRoutes.ts";
import { SignInRequest, SignInResponse } from "../api/types/SignIn.ts";
import sleep from "../utils/sleep.ts";

const apiMockHandlers = [
  http.post<never, SignInRequest, SignInResponse>(
    BaseRoutes[ApiResource.SIGN_IN](),
    async ({ request }) => {
      await sleep(1500);
      const data = await request.json();

      if (data.dni === "40803469" && data.password === "norderO123!") {
        const oneDayFromNow = new Date();
        oneDayFromNow.setDate(oneDayFromNow.getDate() + 1);
        return HttpResponse.json({
          token: "fakeToken",
          expirationDate: oneDayFromNow.toUTCString(),
        });
      }
      return HttpResponse.json(null, { status: 401, type: "error" });
    }
  ),
];

export default apiMockHandlers;
