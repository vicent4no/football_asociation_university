import { UserRoles } from "../api/types/User.ts";

const printRoleToName = (role: UserRoles) => {
  switch (role) {
    case UserRoles.PLAYER:
      return "Jugador";
    case UserRoles.TECHNICAL_DIRECTOR:
      return "Director técnico";
    case UserRoles.TEAM_REPRESENTATIVE:
      return "Representante de equipo";
    case UserRoles.ASSOCIATION_REPRESENTATIVE:
      return "Representante de la asociación";
  }
};

export default printRoleToName;
