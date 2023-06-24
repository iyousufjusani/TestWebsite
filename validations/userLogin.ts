import * as yup from "yup";

const schema = yup.object().shape({
  password: yup
    .string()
    .required("Enter your password")
    .min(6, "Enter atleast 6 digits password"),
  email: yup
    .string()
    .required("Enter your email")
    .email("Enter valid email address"),
});

export default schema;
