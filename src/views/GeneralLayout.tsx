import { Container, Grid2 } from "@mui/material";
import { FC, PropsWithChildren } from "react";
import Topbar from "../components/navigation/Topbar.tsx";

const GeneralLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <Grid2>
      <Topbar />
      <Container>{children}</Container>
    </Grid2>
  );
};

export default GeneralLayout;
