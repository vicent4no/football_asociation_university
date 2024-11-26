import { User } from "../api/types/User.ts";

type AuthenticationAtom = {
  id: string;
  accessToken: string;
  refreshToken: string;
  accessTokenExpiration: Date;
  refreshTokenExpiration: Date;
  user: User;
};
