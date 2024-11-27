import { useAtomValue } from "jotai";
import { FC, PropsWithChildren } from "react";
import { Navigate } from "react-router";
import authenticationAtom from "../atoms/authenticationAtom.tsx";
import { BrowserRoutes } from "./BrowserRoutes.ts";

const AuthenticatedRoute: FC<PropsWithChildren> = ({ children }) => {
  const authenticationStatus = useAtomValue(authenticationAtom);

  if (!authenticationStatus) {
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
