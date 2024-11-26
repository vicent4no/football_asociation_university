import { Container } from "@mui/material";
import { FC } from "react";
import SignInForm from "../forms/SignInForm.tsx";

const SignInView: FC = () => {
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
      <SignInForm />
    </Container>
  );
};

export default SignInView;
