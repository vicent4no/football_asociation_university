import { createBrowserRouter } from "react-router-dom";
import SignInView from "../views/SignInView.tsx";
import AuthenticatedRoute from "./AuthenticatedRoute.tsx";
import { BrowserRoutes } from "./BrowserRoutes.ts";

const Router = createBrowserRouter([
  {
    path: BrowserRoutes.HOME,
    element: (
      <AuthenticatedRoute>
        <div>Home placeholder</div>
      </AuthenticatedRoute>
    ),
  },
  {
    path: BrowserRoutes.SIGN_UP,
    element: <div>Sign up placeholder</div>,
  },
  {
    path: BrowserRoutes.SIGN_IN,
    element: <SignInView />,
  },
]);

export default Router;
