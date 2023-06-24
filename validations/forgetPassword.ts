import * as yup from "yup";

const schema = yup.object().shape({
  email: yup
    .string()
    .required("Enter your email")
    .email("Enter valid email address"),
});

export default schema;
