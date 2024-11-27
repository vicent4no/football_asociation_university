import { atomWithStorage } from "jotai/utils";
import AtomLocalStorageKeys from "./AtomLocalStorageKeys.ts";

type AuthenticationAtom = {
  // id: string;
  bearerToken: string;
  bearerTokenExpiration: Date;
  // user: User;
} | null;

const authenticationAtom = atomWithStorage<AuthenticationAtom>(
  AtomLocalStorageKeys.AUTHENTICATION,
  null,
  undefined,
  { getOnInit: true }
);

export default authenticationAtom;
