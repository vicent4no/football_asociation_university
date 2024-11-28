import { Container, Grid2 } from "@mui/material";
import Box from "@mui/material/Box";
import { FC, PropsWithChildren } from "react";
import Topbar from "../components/navigation/Topbar.tsx";

const GeneralLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid2
        container
        spacing={4}
        columns={1}
      >
        <Grid2 size={1}>
          <Topbar />
        </Grid2>
        <Grid2 size={1}>
          <Container
            style={{
              width: "100vw",
              display: "flex",
              justifyContent: "center",
            }}
          >
            {children}
          </Container>
        </Grid2>
      </Grid2>
    </Box>
  );
};

export default GeneralLayout;
