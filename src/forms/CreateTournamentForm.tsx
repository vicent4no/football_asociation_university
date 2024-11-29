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
import { Category } from "../api/types/Category.ts";
import { Division } from "../api/types/Division.ts";
import {
  CreateTournamentRequest,
  CreateTournamentResponse,
} from "../api/types/Tournament.ts";
import { User } from "../api/types/User.ts";
import { BrowserRoutes } from "../router/BrowserRoutes.ts";
import {
  commonStringValidation,
  dateValidation,
  numberValidation,
} from "./commonValidationSchemas.ts";

interface CreateTournamentFormProps {
  divisions: Division[];
  categories: Category[];
  user: User;
  bearerToken: string;
}

const schema = yup.object({
  name: commonStringValidation(),
  categoryId: numberValidation(),
  divisionId: numberValidation(),
  wheels: numberValidation(),
  registrationStartDate: dateValidation(),
  registrationEndDate: dateValidation(),
  startDate: dateValidation(),
  endDate: dateValidation(),
});

type CreateTournamentFormSchema = yup.InferType<typeof schema>;

const snackbarAtom = atom({ show: false, message: "" });

const CreateTournamentForm: FC<CreateTournamentFormProps> = ({
  categories,
  user,
  bearerToken,
  divisions,
}) => {
  const navigation = useNavigate();
  const [snackbarStatus, setSnackbarStatus] = useAtom(snackbarAtom);
  const {
    control,
    handleSubmit,
    setError,
    clearErrors,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<CreateTournamentFormSchema>({
    mode: "onBlur",
    resolver: yupResolver(schema),
  });

  const registrationStartDate = watch("registrationStartDate");
  const registrationEndDate = watch("registrationEndDate");
  const startDate = watch("startDate");
  const endDate = watch("endDate");

  const onSubmit: SubmitHandler<CreateTournamentFormSchema> = async (data) => {
    try {
      if (registrationStartDate > registrationEndDate) {
        setError("registrationStartDate", {
          message:
            "La fecha de inicio de inscripción no puede ser mayor a la de cierre",
        });
        setTimeout(() => clearErrors("registrationStartDate"), 5000);
      }
      if (registrationEndDate > startDate) {
        setError("registrationEndDate", {
          message:
            "La fecha de cierre de inscripción no puede ser mayor a la de inicio de competición",
        });
        setTimeout(() => clearErrors("registrationEndDate"), 5000);
      }
      if (startDate > endDate) {
        setError("startDate", {
          message:
            "La fecha de inicio de competición no puede ser mayor a la de fin de competición",
        });
        setTimeout(() => clearErrors("startDate"), 5000);
      }

      const parsedData: CreateTournamentRequest = {
        Nombre: data.name,
        FechaInicio: data.startDate,
        FechaFinalizacion: data.endDate,
        FechaInicioInscripcion: data.registrationStartDate,
        FechaFinalizacionInscripcion: data.registrationEndDate,
        IdCategoria: data.categoryId,
        IdDivision: data.divisionId,
        Ruedas: data.wheels,
        IdEncargadoAsociacion: user.id,
      };
      const response = await axios.post<
        never,
        CreateTournamentResponse,
        CreateTournamentRequest
      >(BaseRoutes[ApiResource.TOURNAMENTS](), parsedData, {
        headers: { Authorization: `Bearer ${bearerToken}` },
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
        Crear torneo
      </Typography>
      <Controller
        control={control}
        name="name"
        render={({ field }) => (
          <FormControl
            size={"small"}
            error={!!errors.name}
          >
            <FormLabel htmlFor={field.name}>{"Nombre del torneo"}</FormLabel>
            <TextField
              variant={"standard"}
              error={!!errors.name}
              helperText={errors.name?.message}
              placeholder="Liga solidaria de Tres Isletas"
              {...field}
            />
          </FormControl>
        )}
      />
      <Controller
        control={control}
        name="categoryId"
        render={({ field }) => (
          <FormControl
            size={"small"}
            error={!!errors.categoryId || !categories.length}
          >
            <InputLabel htmlFor={field.name}>Categoria</InputLabel>
            {categories.length ? (
              <Select
                variant={"standard"}
                {...field}
              >
                {categories.map((c) => (
                  <MenuItem
                    value={c.id}
                  >{`Nombre: ${c.nombre} - Edad mínima: ${c.edadMinima} - Edad máxima: ${c.edadMaxima}`}</MenuItem>
                ))}
              </Select>
            ) : (
              <>
                <Select
                  variant={"standard"}
                  {...field}
                  disabled
                />
                <FormHelperText>No se han creado categorías</FormHelperText>
              </>
            )}
          </FormControl>
        )}
      />
      <Controller
        control={control}
        name="divisionId"
        render={({ field }) => (
          <FormControl
            size={"small"}
            error={!!errors.divisionId || !divisions.length}
          >
            <InputLabel htmlFor={field.name}>División</InputLabel>
            {divisions.length ? (
              <Select
                variant={"standard"}
                {...field}
              >
                {divisions.map((c) => (
                  <MenuItem value={c.id}>{`${c.nombre}`}</MenuItem>
                ))}
              </Select>
            ) : (
              <>
                <Select
                  variant={"standard"}
                  {...field}
                  disabled
                />
                <FormHelperText>No se han creado divisiones aún</FormHelperText>
              </>
            )}
          </FormControl>
        )}
      />
      <Controller
        control={control}
        name="wheels"
        render={({ field }) => (
          <FormControl
            size={"small"}
            error={!!errors.wheels}
          >
            <InputLabel htmlFor={field.name}>Cantidad de ruedas</InputLabel>
            <Select
              variant={"standard"}
              {...field}
            >
              {[1, 2, 3, 4, 5, 6, 7, 8].map((c) => (
                <MenuItem value={c}>{`${c}`}</MenuItem>
              ))}
            </Select>
          </FormControl>
        )}
      />
      <Controller
        control={control}
        name="registrationStartDate"
        render={({ field }) => (
          <FormControl
            size={"small"}
            error={!!errors.registrationStartDate}
          >
            <FormLabel htmlFor={field.name}>
              {"Fecha de inicio de inscripción"}
            </FormLabel>
            <LocalizationProvider
              dateAdapter={AdapterDateFns}
              adapterLocale={enGB}
            >
              <DatePicker
                closeOnSelect
                slotProps={{
                  textField: {
                    error: !!errors.registrationStartDate,
                    helperText: errors.registrationStartDate?.message || "",
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
        name="registrationEndDate"
        render={({ field }) => (
          <FormControl
            size={"small"}
            error={!!errors.registrationEndDate}
          >
            <FormLabel htmlFor={field.name}>
              {"Fecha de fin de inscripción"}
            </FormLabel>
            <LocalizationProvider
              dateAdapter={AdapterDateFns}
              adapterLocale={enGB}
            >
              <DatePicker
                closeOnSelect
                slotProps={{
                  textField: {
                    error: !!errors.registrationEndDate,
                    helperText: errors.registrationEndDate?.message || "",
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
        name="startDate"
        render={({ field }) => (
          <FormControl
            size={"small"}
            error={!!errors.startDate}
          >
            <FormLabel htmlFor={field.name}>
              {"Fecha de inicio de competición"}
            </FormLabel>
            <LocalizationProvider
              dateAdapter={AdapterDateFns}
              adapterLocale={enGB}
            >
              <DatePicker
                closeOnSelect
                slotProps={{
                  textField: {
                    error: !!errors.startDate,
                    helperText: errors.startDate?.message || "",
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
        name="endDate"
        render={({ field }) => (
          <FormControl
            size={"small"}
            error={!!errors.endDate}
          >
            <FormLabel htmlFor={field.name}>
              {"Fecha de fin de competición"}
            </FormLabel>
            <LocalizationProvider
              dateAdapter={AdapterDateFns}
              adapterLocale={enGB}
            >
              <DatePicker
                closeOnSelect
                slotProps={{
                  textField: {
                    error: !!errors.endDate,
                    helperText: errors.endDate?.message || "",
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

      <Button
        type="submit"
        fullWidth
        variant="contained"
        disabled={
          !!Object.keys(errors).length ||
          isSubmitting ||
          !categories.length ||
          !divisions.length
        }
      >
        {isSubmitting ? <CircularProgress size={24} /> : "Crear torneo"}
      </Button>
      <FormControl error={!!errors.root}>
        {!!errors.root && (
          <FormHelperText>{errors.root.message}</FormHelperText>
        )}
      </FormControl>
    </Card>
  );
};

export default CreateTournamentForm;
