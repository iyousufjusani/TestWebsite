import * as yup from "yup";

const password = yup.object().shape({
  oldPassword: yup.string().required("Enter your Password"),
  newPassword: yup.string().required("Enter your New Password"),
  confirmPassword: yup
    .string()
    .required("Enter your Confirm Password")
    .oneOf([yup.ref("newPassword"), null], "Confirm Password not match"),
});

export default password;
