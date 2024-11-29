import { Typography } from "@mui/material";
import { useAtomValue } from "jotai";
import { FC } from "react";
import authenticationAtom from "../atoms/authenticationAtom.tsx";
import printRoleToName from "../utils/printRoleToName.ts";

const HomeView: FC = () => {
  const authenticationStatus = useAtomValue(authenticationAtom);

  if (!authenticationStatus) {
    return <div>Bienvenido a la Asociación de Futbol.</div>;
  }
  return (
    <div>
      <Typography
        component="h1"
        fontWeight="500"
        fontSize="2rem"
      >
        {`Bienvenido ${authenticationStatus.user.apellido}, ${authenticationStatus.user.nombre}`}
      </Typography>
      <p>
        Por favor, elija una de las opciones en el menú superior izquierdo para
        operar.
      </p>
      {authenticationStatus.roles.length ? (
        <p>{`Sus roles asignados son: ${authenticationStatus.roles.map((r) => printRoleToName(r)).join(", ")}.`}</p>
      ) : null}
    </div>
  );
};

export default HomeView;
