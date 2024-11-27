import { http, HttpResponse } from "msw";
import { ApiResource } from "../api/ApiResource.ts";
import { BaseRoutes } from "../api/BaseRoutes.ts";
import { Category } from "../api/types/Category.ts";
import { Division } from "../api/types/Division.ts";
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
  http.get<never, never, Category[]>(
    BaseRoutes[ApiResource.CATEGORIES](),
    async () => {
      await sleep(1500);
      const categories: Category[] = [
        {
          id: 1,
          name: "Maxi",
          minAge: 41,
          maxAge: 45,
        },
        {
          id: 2,
          name: "Súper",
          minAge: 46,
          maxAge: 50,
        },
        {
          id: 3,
          name: "Máster",
          minAge: 51,
          maxAge: 55,
        },
      ];
      return HttpResponse.json(categories);
    }
  ),
  http.get<never, never, Category[]>(
    BaseRoutes[ApiResource.CATEGORIES](),
    async () => {
      await sleep(1500);
      const categories: Category[] = [
        {
          id: 1,
          name: "Maxi",
          minAge: 41,
          maxAge: 45,
        },
        {
          id: 2,
          name: "Súper",
          minAge: 46,
          maxAge: 50,
        },
        {
          id: 3,
          name: "Máster",
          minAge: 51,
          maxAge: 55,
        },
      ];
      return HttpResponse.json(categories);
    }
  ),
  http.get<never, never, Division[]>(
    BaseRoutes[ApiResource.DIVISIONS](),
    async () => {
      await sleep(1500);
      const divisions: Division[] = [
        {
          id: 1,
          name: "A",
        },
        { id: 2, name: "B" },
        { id: 3, name: "C" },
      ];

      return HttpResponse.json(divisions);
    }
  ),
];

export default apiMockHandlers;
