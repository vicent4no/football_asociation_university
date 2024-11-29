import { atomWithStorage } from "jotai/utils";
import { UserRoles } from "../api/types/User.ts";
import AtomLocalStorageKeys from "./AtomLocalStorageKeys.ts";

type AuthenticationAtom = {
  bearerToken: string;
  bearerTokenExpiration: Date;
  foto: string;
  roles: UserRoles[];
  id: string;
  name: string;
  surname: string;
  dateOfBirth: string;
} | null;

const authenticationAtom = atomWithStorage<AuthenticationAtom>(
  AtomLocalStorageKeys.AUTHENTICATION,
  null,
  undefined,
  { getOnInit: true }
);

export default authenticationAtom;
