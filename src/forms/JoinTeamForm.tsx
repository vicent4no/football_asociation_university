import { yupResolver } from "@hookform/resolvers/yup";
import {
  Button,
  Card,
  CircularProgress,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  Snackbar,
  Typography,
} from "@mui/material";
import axios from "axios";
import { atom } from "jotai";
import { useAtom, useAtomValue } from "jotai/index";
import { FC } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import * as yup from "yup";
import { ApiResource } from "../api/ApiResource.ts";
import { BaseRoutes } from "../api/BaseRoutes.ts";
import { JoinTeamRequest, JoinTeamResponse, Team } from "../api/types/Team.ts";
import authenticationAtom from "../atoms/authenticationAtom.tsx";
import { BrowserRoutes } from "../router/BrowserRoutes.ts";
import { numberValidation } from "./commonValidationSchemas.ts";

type JoinTeamFormProps = {
  availableTeams: Team[];
};
const schema = yup.object({
  teamId: numberValidation(),
});

type JoinTeamFormSchema = yup.InferType<typeof schema>;

const snackbarAtom = atom({ show: false, message: "" });

const JoinTeamForm: FC<JoinTeamFormProps> = ({ availableTeams }) => {
  const authStatus = useAtomValue(authenticationAtom);

  const navigation = useNavigate();
  const [snackbarStatus, setSnackbarStatus] = useAtom(snackbarAtom);
  const {
    control,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm<JoinTeamFormSchema>({
    mode: "onBlur",
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<JoinTeamFormSchema> = async (data) => {
    try {
      const parsedData: JoinTeamRequest = {
        idJugador: authStatus!.user.id,
      };
      const response = await axios.post<
        never,
        JoinTeamResponse,
        JoinTeamRequest
      >(BaseRoutes[ApiResource.JOIN_TEAM](data.teamId), parsedData, {
        headers: { Authorization: `Bearer ${authStatus!.bearerToken}` },
      });

      setSnackbarStatus(() => ({ show: true, message: response.data.mensaje }));
      setTimeout(() => setSnackbarStatus({ show: false, message: "" }), 2000);
      setTimeout(() => navigation(BrowserRoutes.HOME), 3000);
    } catch (error) {
      if (axios.isAxiosError(error) && error.status === 400) {
        setError("root", {
          message: error.response
            ? String(error.response.data)
            : "Algo ha ocurrido, por favor, vuelva a intentar",
        });
      } else {
        setError("root", {
          message: "Error inesperado, por favor intente de nuevo",
        });
      }
      setTimeout(() => clearErrors("root"), 4000);
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
        maxHeight: "90vh",
        height: "100%",
        padding: "3rem",
        borderRadius: "1rem",
        boxShadow:
          "hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px",
        overflowY: "auto",
      }}
      variant={"outlined"}
    >
      <Snackbar
        open={snackbarStatus.show}
        autoHideDuration={3000}
        message={snackbarStatus.message}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      />
      <Typography
        component="h1"
        fontWeight="500"
        fontSize="2rem"
      >
        Inscribirse a un equipo
      </Typography>
      <Controller
        control={control}
        name="teamId"
        render={({ field }) => (
          <FormControl
            size={"small"}
            error={!!errors.teamId || !availableTeams.length}
          >
            <InputLabel htmlFor={field.name}>
              Equipos disponibles para inscripción
            </InputLabel>
            {availableTeams.length ? (
              <Select
                variant={"standard"}
                {...field}
              >
                {availableTeams.map((t) => (
                  <MenuItem
                    value={t.id}
                  >{`Equipo: ${t.nombre}. Torneo: ${t.torneo.nombre}. DT: ${t.directorTecnico.nombre} ${t.directorTecnico.apellido}`}</MenuItem>
                ))}
              </Select>
            ) : (
              <>
                <Select
                  variant={"standard"}
                  {...field}
                  disabled
                />
                <FormHelperText>
                  No existen directores técnicos disponibles para inscribir
                </FormHelperText>
              </>
            )}
          </FormControl>
        )}
      />

      <Button
        type="submit"
        fullWidth
        variant="contained"
        disabled={
          !!Object.keys(errors).length || isSubmitting || !availableTeams.length
        }
      >
        {isSubmitting ? <CircularProgress size={24} /> : "Unirse a equipo"}
      </Button>
      <FormControl error={!!errors.root}>
        {!!errors.root && (
          <FormHelperText>{errors.root.message}</FormHelperText>
        )}
      </FormControl>
    </Card>
  );
};

export default JoinTeamForm;
