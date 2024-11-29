import { yupResolver } from "@hookform/resolvers/yup";
import {
  Button,
  Card,
  CircularProgress,
  FormControl,
  FormHelperText,
  FormLabel,
  InputLabel,
  MenuItem,
  Select,
  Snackbar,
  TextField,
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
import { CreateTeamRequest, CreateTeamResponse } from "../api/types/Team.ts";
import { Tournament } from "../api/types/Tournament.ts";
import { User } from "../api/types/User.ts";
import authenticationAtom from "../atoms/authenticationAtom.tsx";
import { BrowserRoutes } from "../router/BrowserRoutes.ts";
import {
  commonStringValidation,
  numberValidation,
} from "./commonValidationSchemas.ts";

interface RegisterTeamFormProps {
  tournaments: Tournament[];
  technicalDirectors: User[];
}

const schema = yup.object({
  idTechnicalDirector: numberValidation(),
  name: commonStringValidation(),
  idTournament: numberValidation(),
});

type RegisterTeamFormSchema = yup.InferType<typeof schema>;

const snackbarAtom = atom({ show: false, message: "" });

const RegisterTeamForm: FC<RegisterTeamFormProps> = ({
  tournaments,
  technicalDirectors,
}) => {
  const authStatus = useAtomValue(authenticationAtom);
  const navigation = useNavigate();
  const [snackbarStatus, setSnackbarStatus] = useAtom(snackbarAtom);
  const {
    control,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm<RegisterTeamFormSchema>({
    mode: "onBlur",
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<RegisterTeamFormSchema> = async (data) => {
    try {
      const parsedData: CreateTeamRequest = {
        nombre: data.name,
        idDirectorTecnico: data.idTechnicalDirector,
        idTorneo: data.idTournament,
        idRepresentanteEquipo: authStatus!.user.id,
      };
      const response = await axios.post<
        never,
        CreateTeamResponse,
        CreateTeamRequest
      >(BaseRoutes[ApiResource.TEAMS](), parsedData, {
        headers: { Authorization: `Bearer ${authStatus!.bearerToken}` },
      });

      setSnackbarStatus(() => ({ show: true, message: response.data.mensaje }));
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
        Inscribir equipo a torneo
      </Typography>
      <Controller
        control={control}
        name="name"
        render={({ field }) => (
          <FormControl
            size={"small"}
            error={!!errors.name}
          >
            <FormLabel htmlFor={field.name}>{"Nombre del equipo"}</FormLabel>
            <TextField
              variant={"standard"}
              error={!!errors.name}
              helperText={errors.name?.message}
              placeholder="Los Rayo McQueen"
              {...field}
            />
          </FormControl>
        )}
      />
      <Controller
        control={control}
        name="idTournament"
        render={({ field }) => (
          <FormControl
            size={"small"}
            error={!!errors.idTournament || !tournaments.length}
          >
            <InputLabel htmlFor={field.name}>Torneo a inscribir</InputLabel>
            {tournaments.length ? (
              <Select
                variant={"standard"}
                {...field}
              >
                {tournaments.map((d) => (
                  <MenuItem value={d.id}>{d.nombre}</MenuItem>
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
                  No existen torneos con inscripciones abiertas
                </FormHelperText>
              </>
            )}
          </FormControl>
        )}
      />
      <Controller
        control={control}
        name="idTechnicalDirector"
        render={({ field }) => (
          <FormControl
            size={"small"}
            error={!!errors.idTechnicalDirector || !technicalDirectors.length}
          >
            <InputLabel htmlFor={field.name}>Director técnico</InputLabel>
            {technicalDirectors.length ? (
              <Select
                variant={"standard"}
                {...field}
              >
                {technicalDirectors.map((d) => (
                  <MenuItem
                    value={d.id}
                  >{`${d.nombre} ${d.apellido} ${d.dni}`}</MenuItem>
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
          !!Object.keys(errors).length ||
          isSubmitting ||
          !technicalDirectors.length ||
          !tournaments.length
        }
      >
        {isSubmitting ? <CircularProgress size={24} /> : "Inscribir equipo"}
      </Button>
      <FormControl error={!!errors.root}>
        {!!errors.root && (
          <FormHelperText>{errors.root.message}</FormHelperText>
        )}
      </FormControl>
    </Card>
  );
};

export default RegisterTeamForm;
