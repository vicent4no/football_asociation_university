import { CircularProgress } from "@mui/material";
import { useAtom } from "jotai";
import { FC } from "react";
import availableTeamsAtom from "../atoms/availableTeamsAtom.tsx";
import JoinTeamForm from "../forms/JoinTeamForm.tsx";

const JoinTeamFormContainer: FC = () => {
  const [availableTeams] = useAtom(availableTeamsAtom);

  if (availableTeams.isSuccess) {
    return <JoinTeamForm availableTeams={availableTeams.data} />;
  }
  if (availableTeams.isError) {
    return <div>Un error ha ocurrido. Vuelva a intentar</div>;
  }
  if (availableTeams.isLoading) {
    return <CircularProgress size={48} />;
  }
};

export default JoinTeamFormContainer;
