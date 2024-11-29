import { createBrowserRouter } from "react-router-dom";
import { UserRoles } from "../api/types/User.ts";
import SignInForm from "../forms/SignInForm.tsx";
import GeneralLayout from "../views/GeneralLayout.tsx";
import RegisterTeamFormContainer from "../views/RegisterTeamFormContainer.tsx";
import SignUpView from "../views/SignUpView.tsx";
import StandaloneFormContainer from "../views/StandaloneFormContainer.tsx";
import AuthenticatedRoute from "./AuthenticatedRoute.tsx";
import { BrowserRoutes } from "./BrowserRoutes.ts";

const Router = createBrowserRouter([
  {
    path: BrowserRoutes.HOME,
    element: (
      <AuthenticatedRoute>
        <GeneralLayout>
          <div>Bienvenido a la Asociación de Futbol</div>
        </GeneralLayout>
      </AuthenticatedRoute>
    ),
  },
  {
    path: BrowserRoutes.CREATE_TEAM,
    element: (
      <AuthenticatedRoute requiredRole={UserRoles.TEAM_REPRESENTATIVE}>
        <GeneralLayout>
          <RegisterTeamFormContainer />
        </GeneralLayout>
      </AuthenticatedRoute>
    ),
  },
  {
    path: BrowserRoutes.SIGN_UP,
    element: <SignUpView />,
  },
  {
    path: BrowserRoutes.SIGN_IN,
    element: (
      <StandaloneFormContainer>
        <SignInForm />
      </StandaloneFormContainer>
    ),
  },
]);

export default Router;
