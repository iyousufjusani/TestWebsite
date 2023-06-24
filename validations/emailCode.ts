import * as yup from "yup";

const schema = yup.object().shape({
  code: yup
    .string()
    .required("Enter your Code")
    .min(3, "Enter atleast 4 digits Code"),
});

export default schema;
