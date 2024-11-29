import { atomWithStorage } from "jotai/utils";
import { User, UserRoles } from "../api/types/User.ts";
import AtomLocalStorageKeys from "./AtomLocalStorageKeys.ts";

type AuthenticationAtom = {
  bearerToken: string;
  bearerTokenExpiration: Date;
  roles: UserRoles[];
  user: User;
} | null;

const authenticationAtom = atomWithStorage<AuthenticationAtom>(
  AtomLocalStorageKeys.AUTHENTICATION,
  null,
  undefined,
  { getOnInit: true }
);

export default authenticationAtom;
