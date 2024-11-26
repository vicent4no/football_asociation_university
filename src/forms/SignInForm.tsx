import { yupResolver } from "@hookform/resolvers/yup";
import {
  Button,
  Card,
  CircularProgress,
  FormControl,
  FormLabel,
  Link,
  SvgIcon,
  TextField,
  Typography,
} from "@mui/material";
import { FC } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import * as yup from "yup";
import FootballLogo from "../assets/football-svgrepo-com.svg?react";
import { BrowserRoutes } from "../router/BrowserRoutes.ts";
import sleep from "../utils/sleep.ts";

const dniValidationRegex = /^\d+$/;
const passwordNumberRegex = /d+/;
const passwordSpecialSymbolRegex = /[*@!#%&()^~{}'"=\-\\/]+/;

const SignInFormSchema = yup.object({
  dni: yup
    .string()
    .required("DNI es requerido")
    .min(7, "DNI debe tener al menos 7 digitos")
    .max(8, "DNI debe tener hasta 8 digitos")
    .test(
      "validateDNI",
      "Solo números son admitidos. No escriba puntos ni caracteres",
      (value) => dniValidationRegex.test(value)
    ),
  password: yup
    .string()
    .required("Contraseña es requerida")
    .min(6, "Contraseña como mínimo debe tener 6 caracteres")
    .max(20, "Contraseña como máximo debe tener 20 caracteres")
    .test(
      "validatePasswordNumber",
      "Al menos un número es requreido",
      (value) => passwordNumberRegex.test(value)
    )
    .test(
      "validatePasswordSymbol",
      "Al menos un símbolo es requerido",
      (value) => passwordSpecialSymbolRegex.test(value)
    ),
});

type SignInFormProps = yup.InferType<typeof SignInFormSchema>;

const SignInForm: FC = () => {
  const {
    control,
    handleSubmit,
    setError,
    formState: { isSubmitting, errors },
  } = useForm<SignInFormProps>({
    mode: "onBlur",
    resolver: yupResolver(SignInFormSchema),
  });

  const navigation = useNavigate();

  const onSubmit: SubmitHandler<SignInFormProps> = async (data) => {
    await sleep(2500);
    console.log("success!");
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
        padding: "3rem",
        borderRadius: "1rem",
        boxShadow:
          "hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px",
      }}
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
