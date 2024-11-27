import { Container } from "@mui/material";
import { FC, PropsWithChildren } from "react";

/**
 * Ideally used only to contain either a SignUp or a SignIn form.
 * @param children
 * @constructor
 */
const StandaloneFormContainer: FC<PropsWithChildren> = ({ children }) => {
  return (
    <Container
      style={{
        width: "35vw",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundImage:
          "radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))",
        backgroundRepeat: "no-repeat",
      }}
    >
      {children}
    </Container>
  );
};

export default StandaloneFormContainer;
