import { CircularProgress } from "@mui/material";
import { useAtom } from "jotai/index";
import { FC } from "react";
import divisionsAtom from "../atoms/divisionsAtom.tsx";
import SignUpForm from "../forms/SignUpForm.tsx";
import StandaloneFormContainer from "./StandaloneFormContainer.tsx";

const SignUpView: FC = () => {
  const [{ data, isSuccess, isLoading, isError }] = useAtom(divisionsAtom);

  if (isSuccess) {
    return (
      <StandaloneFormContainer>
        <SignUpForm divisions={data} />
      </StandaloneFormContainer>
    );
  }

  if (isLoading) {
    return (
      <StandaloneFormContainer>
        <CircularProgress size={48} />
      </StandaloneFormContainer>
    );
  }
  if (isError) {
    return <div>Error...</div>;
  }

  return null;
};

export default SignUpView;
