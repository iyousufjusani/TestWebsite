import * as yup from "yup";

const basic = yup.object().shape({
  firstName: yup.string().required("First name is required."),
  lastName: yup.string().required("Last name is required."),

  email: yup
    .string()
    .required("Email is required.")
    .email("Enter a Valid Email"),
  phoneNumber: yup
    .string()
    .required("Phone number is required.")
    .min(13, "Enter atleast 11 characters")
    .max(13, "Enter atmost 11 characters"),
  city: yup.string().required("City is required."),
  isAllow: yup
    .boolean()
    .oneOf([true], "You must agree to the Terms and Conditions"),
  isAgree: yup
    .boolean()
    .oneOf([true], "You must agree to the Terms and Conditions"),
});
const password = yup.object().shape({
  password: yup.string().required("Enter your Password").min(6, "Password should have minimum 6 characters"),
  confirmPassword: yup
    .string()
    .required("Enter your Confirm Password")
    .oneOf([yup.ref("password"), null], "Confirm Password not match"),
});
const register = {
  basic,
  password,
};
export default register;
