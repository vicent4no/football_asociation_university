import { createBrowserRouter } from "react-router-dom";
import { UserRoles } from "../api/types/User.ts";
import SignInForm from "../forms/SignInForm.tsx";
import CreateTournamentFormContainer from "../views/CreateTournamentFormContainer.tsx";
import GeneralLayout from "../views/GeneralLayout.tsx";
import HomeView from "../views/HomeView.tsx";
import JoinTeamFormContainer from "../views/JoinTeamFormContainer.tsx";
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
          <HomeView />
        </GeneralLayout>
      </AuthenticatedRoute>
    ),
  },
  {
    path: BrowserRoutes.JOIN_TEAM,
    element: (
      <AuthenticatedRoute requiredRole={UserRoles.PLAYER}>
        <GeneralLayout>
          <JoinTeamFormContainer />
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
    path: BrowserRoutes.CREATE_TOURNAMENT,
    element: (
      <AuthenticatedRoute requiredRole={UserRoles.ASSOCIATION_REPRESENTATIVE}>
        <GeneralLayout>
          <CreateTournamentFormContainer />
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
