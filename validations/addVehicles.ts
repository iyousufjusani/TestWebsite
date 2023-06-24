import * as yup from "yup";

const schema = yup.object().shape({
  name: yup.string().required("Enter name"),
  type: yup.string().required("Select type"),
  imageUrl: yup.string().required("Upload image"),
  registrationNumber: yup.string().required("Enter registration number"),
  mot: yup.string().required("Enter registration number"),
  motExpiry: yup.date().required("Select date"),
  make: yup.string().required("Enter make"),
  model: yup.string().required("Enter model"),
  color: yup.string().required("Enter color"),
  bodyType: yup.string().required("Enter body type"),
  passengers: yup.number().min(1, "Enter correct passenger"),
  keeperName: yup.string().required("Enter keeper name"),
  keeperAddress: yup.string().required("Enter keeper address"),
  note: yup.string().required("Enter note"),
});

export default schema;
