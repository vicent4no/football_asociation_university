import { useAtomValue } from "jotai";
import { FC, PropsWithChildren } from "react";
import { Navigate } from "react-router";
import { UserRoles } from "../api/types/User.ts";
import authenticationAtom from "../atoms/authenticationAtom.tsx";
import { BrowserRoutes } from "./BrowserRoutes.ts";

interface RouteProps {
  requiredRole?: UserRoles;
}

const AuthenticatedRoute: FC<PropsWithChildren<RouteProps>> = ({
  children,
  requiredRole,
}) => {
  const authenticationStatus = useAtomValue(authenticationAtom);

  if (!authenticationStatus) {
    return (
      <Navigate
        to={BrowserRoutes.SIGN_IN}
        replace={true}
      />
    );
  }
  if (requiredRole && !authenticationStatus.roles.includes(requiredRole)) {
    return (
      <Navigate
        to={BrowserRoutes.HOME}
        replace={true}
      />
    );
  }
  return children;
};

export default AuthenticatedRoute;
