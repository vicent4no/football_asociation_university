import { FC, PropsWithChildren } from "react";
import { Navigate } from "react-router";
import { BrowserRoutes } from "./BrowserRoutes.ts";

const AuthenticatedRoute: FC<PropsWithChildren> = ({ children }) => {
  if (true) {
    return (
      <Navigate
        to={BrowserRoutes.SIGN_IN}
        replace={true}
      />
    );
  }
  return children;
};

export default AuthenticatedRoute;
