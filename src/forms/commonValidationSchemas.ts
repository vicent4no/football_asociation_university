import * as yup from "yup";

const dniValidationRegex = /^\d+$/;
export const dniValidation = () =>
  yup
    .string()
    .required("DNI es requerido")
    .min(7, "DNI debe tener al menos 7 digitos")
    .max(8, "DNI debe tener hasta 8 digitos")
    .test(
      "validateDNI",
      "Solo números son admitidos. No escriba puntos ni caracteres",
      (value) => dniValidationRegex.test(value)
    );

const passwordNumberRegex = /\d+/;
const passwordSpecialSymbolRegex = /[*@!#%&()^~{}'"=\-\\/]+/;
export const passwordValidation = () =>
  yup
    .string()
    .required("Contraseña es requerida")
    .min(6, "Contraseña como mínimo debe tener 6 caracteres")
    .max(20, "Contraseña como máximo debe tener 20 caracteres")
    .test(
      "validatePasswordNumber",
      "Al menos un número es requerido",
      (value) => passwordNumberRegex.test(value)
    )
    .test(
      "validatePasswordSymbol",
      "Al menos un símbolo es requerido",
      (value) => passwordSpecialSymbolRegex.test(value)
    );

export const base64PhotoOptionalValidation = () =>
  yup
    .string()
    .optional()
    .trim()
    .matches(
      /^data:([a-z]+\/[a-z0-9-+.]+(;[a-z-]+=[a-z0-9-]+)?)?(;base64)?,([a-z0-9!$&',()*+;=\-._~:@/?%\s]*)$/i,
      "Debe ser una imagen válida"
    );

export const fileOptionalVerification = () =>
  yup.mixed().test({
    message: "Please provide a supported file type",
    test: (file, context) => {
      const casted = file as unknown as FileList;
      let isValid = casted.length === 1;
      if (!isValid) {
        context?.createError({ message: "Solo se debe subir un archivo" });
        return isValid;
      }
      const extension = casted[0].name.split(".")[1];
      const validExtensions = ["png", "jpg", "jpeg"];
      isValid = ["png", "jpg", "jpeg"].includes(extension);
      if (!isValid) {
        context?.createError({
          message: `Solo puede subir archivos de tipo ${validExtensions} `,
        });
      }
      return isValid;
    },
  });

export const commonStringValidation = () =>
  yup.string().required("Este campo es requerido");

const onlyNumbersRegex = /^[0-9]*$/;

export const numberStringValidation = () =>
  commonStringValidation().test(
    "onlyNumbers",
    "Solo números son aceptados",
    (value) => (value ? onlyNumbersRegex.test(value) : true)
  );

// export const selectValidation = (values: string[]) => {
//   return commonStringValidation().oneOf(
//     values,
//     "Valor inválido, escoja uno de la lista"
//   );
// };

export const numberValidation = () =>
  yup.number().required("Este campo es requerido");

export const booleanNonRequiredValidation = () => yup.boolean().optional();

export const dateValidation = (minAge?: number) => {
  let validation = yup.date().required("Este campo es requerido");

  if (minAge && !Number.isNaN(minAge)) {
    const agesFromNow = new Date();
    agesFromNow.setFullYear(agesFromNow.getFullYear() - minAge);
    validation = validation.max(
      agesFromNow,
      `Como maximo la fecha debe ser antes de ${agesFromNow.toLocaleDateString()}`
    );
  }

  return validation;
};
