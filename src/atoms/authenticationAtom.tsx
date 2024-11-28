import { atomWithStorage } from "jotai/utils";
import { UserRoles } from "../api/types/User.ts";
import AtomLocalStorageKeys from "./AtomLocalStorageKeys.ts";

type AuthenticationAtom = {
  // id: string;
  bearerToken: string;
  bearerTokenExpiration: Date;
  foto: string;
  roles: UserRoles[];
} | null;

const authenticationAtom = atomWithStorage<AuthenticationAtom>(
  AtomLocalStorageKeys.AUTHENTICATION,
  null,
  undefined,
  { getOnInit: true }
);

export default authenticationAtom;
