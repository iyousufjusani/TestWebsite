import * as yup from "yup";

const schema = yup.object().shape({
  firstName: yup.string().required("Enter your first name"),
  lastName: yup.string().required("Enter your last name"),

  email: yup.string().required("Enter your email").email("Enter a valid email"),
  address: yup.object().shape({
    address: yup.string().required("Enter your address"),
    city: yup.string(),
    area: yup.string(),
    county: yup.string(),
    country: yup.string(),
    latValue: yup.number(),
    lngValue: yup.number(),
    postCode: yup.string(),
    road: yup.string(),
  }),
  phoneNumber: yup
    .string()
    .required("Enter your phone number")
    .min(13, "Enter atleast 11 characters")
    .max(13, "Enter atmost 11 characters"),
});
export default schema;
