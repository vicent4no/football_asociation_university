import { CircularProgress } from "@mui/material";
import { useAtom, useAtomValue } from "jotai";
import { FC } from "react";
import authenticationAtom from "../atoms/authenticationAtom.tsx";
import categoriesAtom from "../atoms/categoriesAtom.tsx";
import divisionsAtom from "../atoms/divisionsAtom.tsx";
import CreateTournamentForm from "../forms/CreateTournamentForm.tsx";

const CreateTournamentFormContainer: FC = () => {
  const [divisions] = useAtom(divisionsAtom);
  const [categories] = useAtom(categoriesAtom);
  const authStatus = useAtomValue(authenticationAtom);

  if (divisions.isSuccess && categories.isSuccess && authStatus) {
    return (
      <CreateTournamentForm
        user={authStatus.user}
        bearerToken={authStatus.bearerToken}
        categories={categories.data}
        divisions={divisions.data}
      />
    );
  }
  if (divisions.isError || categories.isError || !authStatus) {
    return <div>Ha ocurrido un error inesperado. Vuelva a intentar</div>;
  }
  return <CircularProgress size={48} />;
};

export default CreateTournamentFormContainer;
