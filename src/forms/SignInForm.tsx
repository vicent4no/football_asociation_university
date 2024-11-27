import { yupResolver } from "@hookform/resolvers/yup";
import {
  Button,
  Card,
  CircularProgress,
  Divider,
  FormControl,
  FormHelperText,
  FormLabel,
  Link,
  SvgIcon,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useSetAtom } from "jotai";
import { FC } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import * as yup from "yup";
import { ApiResource } from "../api/ApiResource.ts";
import { BaseRoutes } from "../api/BaseRoutes.ts";
import { SignInResponse } from "../api/types/SignIn.ts";
import FootballLogo from "../assets/football-svgrepo-com.svg?react";
import authenticationAtom from "../atoms/authenticationAtom.tsx";
import { BrowserRoutes } from "../router/BrowserRoutes.ts";
import {
  dniValidation,
  passwordValidation,
} from "./commonValidationSchemas.ts";

const SignInFormSchema = yup.object({
  dni: dniValidation(),
  password: passwordValidation(),
});

type SignInFormProps = yup.InferType<typeof SignInFormSchema>;

const SignInForm: FC = () => {
  const {
    control,
    handleSubmit,
    setError,
    clearErrors,
    formState: { isSubmitting, errors },
  } = useForm<SignInFormProps>({
    mode: "onBlur",
    resolver: yupResolver(SignInFormSchema),
  });
  const navigation = useNavigate();
  const setAuthentication = useSetAtom(authenticationAtom);

  const onSubmit: SubmitHandler<SignInFormProps> = async (data) => {
    try {
      const response = await axios.post<SignInResponse>(
        BaseRoutes[ApiResource.SIGN_IN](),
        { ...data }
      );

      setAuthentication({
        bearerToken: response.data.token,
        bearerTokenExpiration: new Date(response.data.expirationDate),
      });

      navigation(BrowserRoutes.HOME);
    } catch (error) {
      if (axios.isAxiosError(error) && error.status === 401) {
        setError("root", {
          message: "Credenciales inválidas, intente de nuevo",
        });
      } else {
        setError("root", {
          message: "Error inesperado, por favor intente de nuevo",
        });
      }
      setTimeout(() => clearErrors("root"), 3000);
    }
  };
  return (
    <Card
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "4vh",
        width: "50vw",
        minWidth: "300px",
        padding: "3rem",
        borderRadius: "1rem",
        boxShadow:
          "hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px",
      }}
      variant={"outlined"}
    >
      <Typography
        component="h1"
        fontWeight="500"
        fontSize="2rem"
      >
        Iniciar sesión &nbsp;
        <SvgIcon>
          <FootballLogo />
        </SvgIcon>
      </Typography>
      <Controller
        control={control}
        name="dni"
        render={({ field }) => (
          <FormControl
            size={"small"}
            error={!!errors.dni}
          >
            <FormLabel htmlFor={field.name}>
              {field.name.toUpperCase()}
            </FormLabel>
            <TextField
              variant={"standard"}
              error={!!errors.dni}
              helperText={errors.dni?.message}
              placeholder="40803469"
              {...field}
            />
          </FormControl>
        )}
      />
      <Controller
        control={control}
        name="password"
        render={({ field }) => (
          <FormControl
            size={"small"}
            error={!!errors.password}
          >
            <FormLabel htmlFor={field.name}>Contraseña</FormLabel>
            <TextField
              variant={"standard"}
              error={!!errors.password}
              helperText={errors.password?.message}
              type="password"
              placeholder="••••••"
              {...field}
            />
          </FormControl>
        )}
      />
      <Button
        type="submit"
        fullWidth
        variant="contained"
        disabled={!!Object.keys(errors).length || isSubmitting}
      >
        {isSubmitting ? <CircularProgress size={24} /> : "Iniciar"}
      </Button>
      <FormControl error={!!errors.root}>
        {!!errors.root && (
          <FormHelperText>{errors.root.message}</FormHelperText>
        )}
      </FormControl>
      <Divider />
      <Link
        component="button"
        type="button"
        onClick={() => navigation(BrowserRoutes.SIGN_UP)}
        variant="body2"
        sx={{ alignSelf: "center" }}
      >
        ¿No tenés cuenta? Hacé click
      </Link>
    </Card>
  );
};

export default SignInForm;
