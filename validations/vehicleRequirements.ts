import * as yup from "yup";

const password = yup.object().shape({
  carName: yup.string().required("Enter your car name"),
  carModel: yup.string().required("Enter your car model"),
  allowPassengers: yup
    .number()
    .required("Enter your allow passengers")
    .min(1, "Select at least one option"),
  mediumSizeSuitcases: yup
    .string()
    .required("Enter your medium size suitcases"),
  registrationNumber: yup.string().required("Enter your registration number"),
  foldAbleSeat: yup.boolean().required("Enter your foldable seat"),
  suitcasesWithFoldableSeat: yup.string().when("foldAbleSeat", {
    is: true,
    then: yup.string().required("Enter your suitcases with foldable seat"),
    otherwise: yup.string().notRequired(),
  }),
});

export default password;
