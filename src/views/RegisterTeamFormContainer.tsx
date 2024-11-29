import { CircularProgress } from "@mui/material";
import { useAtom } from "jotai";
import { FC } from "react";
import { freeTechnicalDirectorsAtom } from "../atoms/technicalDirectorsAtom.tsx";
import tournamentsActiveAtom from "../atoms/tournamentsActive.tsx";
import RegisterTeamForm from "../forms/RegisterTeamForm.tsx";

const RegisterTeamFormContainer: FC = () => {
  const [tournaments] = useAtom(tournamentsActiveAtom);
  const [technicalDirectors] = useAtom(freeTechnicalDirectorsAtom);

  if (tournaments.isSuccess && technicalDirectors.isSuccess) {
    return (
      <RegisterTeamForm
        tournaments={tournaments.data}
        technicalDirectors={technicalDirectors.data}
      />
    );
  }
  if (tournaments.isError || technicalDirectors.isError) {
    return <div>Un error ha ocurrido. Vuelva a intentar</div>;
  }
  if (tournaments.isLoading || technicalDirectors.isLoading) {
    return <CircularProgress size={48} />;
  }
};

export default RegisterTeamFormContainer;
