import { yupResolver } from "@hookform/resolvers/yup";
import DoneIcon from "@mui/icons-material/Done";
import {
  Button,
  Card,
  Checkbox,
  CircularProgress,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  InputLabel,
  MenuItem,
  Select,
  Snackbar,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
import axios from "axios";

import { enGB } from "date-fns/locale";
import { atom } from "jotai";
import { useAtom } from "jotai/index";
import { FC } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import * as yup from "yup";
import { ApiResource } from "../api/ApiResource.ts";
import { BaseRoutes } from "../api/BaseRoutes.ts";
import { Division } from "../api/types/Division.ts";
import { SignUpRequest, SignUpResponse } from "../api/types/SignUp.ts";
import { BrowserRoutes } from "../router/BrowserRoutes.ts";
import sleep from "../utils/sleep.ts";
import transformFileToBase64 from "../utils/transformFileToBase64.ts";
import {
  base64PhotoOptionalValidation,
  booleanNonRequiredValidation,
  commonStringValidation,
  dateValidation,
  dniValidation,
  numberOptionalValidation,
  numberStringValidation,
  passwordValidation,
} from "./commonValidationSchemas.ts";

interface SignUpFormProps {
  divisions: Division[];
}

const schema = yup.object({
  dni: dniValidation(),
  contraseña: passwordValidation(),
  nombre: commonStringValidation(),
  apellido: commonStringValidation(),
  fechaNacimiento: dateValidation(18),
  calle: commonStringValidation(),
  numero: numberStringValidation(),
  ciudad: commonStringValidation(),
  nTelefono: numberStringValidation(),
  esJugador: booleanNonRequiredValidation(),
  foto: base64PhotoOptionalValidation(),
  idDivision: numberOptionalValidation(),
  esRepresentanteEquipo: booleanNonRequiredValidation(),
  esDirectorTecnico: booleanNonRequiredValidation(),
});

type SignUpFormFields = yup.InferType<typeof schema>;

const snackbarAtom = atom({ show: false, message: "" });

const SignUpForm: FC<SignUpFormProps> = ({ divisions }) => {
  const navigation = useNavigate();

  const [snackbarStatus, setSnackbarStatus] = useAtom(snackbarAtom);
  const {
    control,
    handleSubmit,
    setError,
    clearErrors,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<SignUpFormFields>({
    mode: "onBlur",
    resolver: yupResolver(schema),
  });

  const isPlayerSelection = !!watch("esJugador");

  const onSubmit: SubmitHandler<SignUpFormFields> = async (data) => {
    try {
      const parsedData: SignUpRequest = {
        Dni: data.dni,
        Contraseña: data.contraseña,
        Nombre: data.nombre,
        Apellido: data.apellido,
        FechaNacimiento: data.fechaNacimiento,
        Calle: data.calle,
        Numero: data.numero,
        Ciudad: data.ciudad,
        NTelefono1: data.nTelefono,
        EsJugador: data.esJugador,
        Foto: data.foto,
        IdDivision: data.idDivision,
        EsRepresentanteEquipo: data.esRepresentanteEquipo,
        EsDirectorTecnico: data.esDirectorTecnico,
      };
      const response = await axios.post<never, SignUpResponse, SignUpRequest>(
        BaseRoutes[ApiResource.SIGN_UP](),
        parsedData
      );

      setSnackbarStatus(() => ({ show: true, message: response.data.mensaje }));
      await sleep(3000);
      navigation(BrowserRoutes.SIGN_IN);
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
        padding: "3rem",
        borderRadius: "1rem",
        boxShadow:
          "hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px",
        overflowY: "scroll",
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
        Registrarse
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
        name="contraseña"
        render={({ field }) => (
          <FormControl
            size={"small"}
            error={!!errors.contraseña}
          >
            <FormLabel htmlFor={field.name}>Contraseña</FormLabel>
            <TextField
              variant={"standard"}
              error={!!errors.contraseña}
              helperText={errors.contraseña?.message}
              type="password"
              placeholder="••••••"
              {...field}
            />
          </FormControl>
        )}
      />
      <Controller
        control={control}
        name="nombre"
        render={({ field }) => (
          <FormControl
            size={"small"}
            error={!!errors.nombre}
          >
            <FormLabel htmlFor={field.name}>
              {field.name.toUpperCase()}
            </FormLabel>
            <TextField
              variant={"standard"}
              error={!!errors.nombre}
              helperText={errors.nombre?.message}
              placeholder="Pedro"
              {...field}
            />
          </FormControl>
        )}
      />
      <Controller
        control={control}
        name="apellido"
        render={({ field }) => (
          <FormControl
            size={"small"}
            error={!!errors.apellido}
          >
            <FormLabel htmlFor={field.name}>
              {field.name.toUpperCase()}
            </FormLabel>
            <TextField
              variant={"standard"}
              error={!!errors.apellido}
              helperText={errors.apellido?.message}
              placeholder="Hernandez"
              {...field}
            />
          </FormControl>
        )}
      />
      <Controller
        control={control}
        name="fechaNacimiento"
        render={({ field }) => (
          <FormControl
            size={"small"}
            error={!!errors.fechaNacimiento}
          >
            <FormLabel htmlFor={field.name}>{"FECHA DE NACIMIENTO"}</FormLabel>
            <LocalizationProvider
              dateAdapter={AdapterDateFns}
              adapterLocale={enGB}
            >
              <DatePicker
                closeOnSelect
                slotProps={{
                  textField: {
                    error: !!errors.fechaNacimiento,
                    helperText: errors.fechaNacimiento?.message || "",
                  },
                }}
                inputRef={field.ref}
                value={field.value}
                onChange={(date) => field.onChange(date)}
              />
            </LocalizationProvider>
          </FormControl>
        )}
      />
      <Controller
        control={control}
        name="calle"
        render={({ field }) => (
          <FormControl
            size={"small"}
            error={!!errors.calle}
          >
            <FormLabel htmlFor={field.name}>
              {field.name.toUpperCase()}
            </FormLabel>
            <TextField
              variant={"standard"}
              error={!!errors.calle}
              helperText={errors.calle?.message}
              placeholder="Carlos Pellegrini"
              {...field}
            />
          </FormControl>
        )}
      />
      <Controller
        control={control}
        name="numero"
        render={({ field }) => (
          <FormControl
            size={"small"}
            error={!!errors.numero}
          >
            <FormLabel htmlFor={field.name}>
              {field.name.toUpperCase()}
            </FormLabel>
            <TextField
              variant={"standard"}
              error={!!errors.numero}
              helperText={errors.numero?.message}
              placeholder="1150"
              {...field}
            />
          </FormControl>
        )}
      />
      <Controller
        control={control}
        name="ciudad"
        render={({ field }) => (
          <FormControl
            size={"small"}
            error={!!errors.ciudad}
          >
            <FormLabel htmlFor={field.name}>
              {field.name.toUpperCase()}
            </FormLabel>
            <TextField
              variant={"standard"}
              error={!!errors.ciudad}
              helperText={errors.ciudad?.message}
              placeholder="Barranqueras"
              {...field}
            />
          </FormControl>
        )}
      />
      <Controller
        control={control}
        name="nTelefono"
        render={({ field }) => (
          <FormControl
            size={"small"}
            error={!!errors.nTelefono}
          >
            <FormLabel htmlFor={field.name}>{"NUMERO DE TELEFONO"}</FormLabel>
            <TextField
              variant={"standard"}
              error={!!errors.nTelefono}
              helperText={errors.nTelefono?.message}
              placeholder="3624771771"
              {...field}
            />
          </FormControl>
        )}
      />
      <FormControl component={"fieldset"}>
        <FormControlLabel
          control={
            <Controller
              control={control}
              name="esJugador"
              render={({ field }) => (
                <Checkbox
                  {...field}
                  checked={field.value}
                  onChange={(e) => field.onChange(e.target.checked)}
                  onBlur={(_e) => field.onBlur()}
                />
              )}
            />
          }
          label={"ES JUGADOR"}
          labelPlacement={"end"}
        />
      </FormControl>
      {isPlayerSelection && (
        <>
          <Controller
            control={control}
            name="idDivision"
            render={({ field }) => (
              <FormControl
                size={"small"}
                error={!!errors.idDivision}
              >
                <InputLabel htmlFor={field.name}>DIVISION</InputLabel>
                <Select
                  variant={"standard"}
                  {...field}
                >
                  {divisions.map((d) => (
                    <MenuItem value={d.id}>{d.nombre}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}
          />
          <Controller
            control={control}
            name="foto"
            render={({ field }) => (
              <FormControl
                size={"small"}
                error={!!errors.foto}
              >
                {field.value ? (
                  <>
                    <Stack
                      direction={"row"}
                      component={"div"}
                    >
                      <FormLabel htmlFor={field.name}>
                        Fotografía cargada &nbsp;
                      </FormLabel>
                      <DoneIcon />
                    </Stack>
                  </>
                ) : (
                  <Button
                    variant="contained"
                    component="label"
                  >
                    {"SUBIR FOTO"}
                    <input
                      type="file"
                      accept="image/*"
                      hidden
                      id={field.name}
                      ref={field.ref}
                      name={field.name}
                      onChange={(e) => {
                        const file = e.target.files && e.target.files[0];
                        file &&
                          transformFileToBase64(file).then((value) =>
                            field.onChange(value)
                          );
                      }}
                    />
                  </Button>
                )}
              </FormControl>
            )}
          />
        </>
      )}
      <FormControl component={"fieldset"}>
        <FormControlLabel
          control={
            <Controller
              control={control}
              name="esDirectorTecnico"
              render={({ field }) => (
                <Checkbox
                  {...field}
                  checked={field.value}
                  onChange={(e) => field.onChange(e.target.checked)}
                  onBlur={(_e) => field.onBlur()}
                />
              )}
            />
          }
          label={"ES DIRECTOR TECNICO"}
          labelPlacement={"end"}
        />
      </FormControl>
      <FormControl component={"fieldset"}>
        <FormControlLabel
          control={
            <Controller
              control={control}
              name="esRepresentanteEquipo"
              render={({ field }) => (
                <Checkbox
                  {...field}
                  checked={field.value}
                  onChange={(e) => field.onChange(e.target.checked)}
                  onBlur={(_e) => field.onBlur()}
                />
              )}
            />
          }
          label={"ES REPRESENTANTE DE EQUIPO"}
          labelPlacement={"end"}
        />
      </FormControl>

      <Button
        type="submit"
        fullWidth
        variant="contained"
        disabled={!!Object.keys(errors).length || isSubmitting}
      >
        {isSubmitting ? <CircularProgress size={24} /> : "Enviar"}
      </Button>
      <FormControl error={!!errors.root}>
        {!!errors.root && (
          <FormHelperText>{errors.root.message}</FormHelperText>
        )}
      </FormControl>
    </Card>
  );
};

export default SignUpForm;
