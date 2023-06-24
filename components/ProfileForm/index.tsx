import { useJsApiLoader } from "@react-google-maps/api";
import { ErrorMessage, Formik, FormikHelpers } from "formik";
import React, { memo } from "react";
import { Button, Col, Form, FormControl } from "react-bootstrap";
import PhoneInput from "react-phone-number-input";
import theme from "../../assets/theme";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { AddressProps } from "../../interfaces";
import { updateUserProfile } from "../../redux/auth/action";
import AuthApi from "../../redux/auth/authApi";
import styles from "../../styles/Signup.module.css";
import { updateProfileValidation } from "../../validations";
import AutoCompleteWithMap from "../AutoCompleteWithMap";
import NavigoLoading from "../navigoLoading";

type Props = {};
export type profileProps = {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  address: AddressProps;
};
const authApi = new AuthApi();
type Libraries = (
  | "drawing"
  | "geometry"
  | "localContext"
  | "places"
  | "visualization"
)[];
const libraries: Libraries = ["places"];
const Index: React.FC<Props> = () => {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    libraries: libraries,
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY || "",
  });
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);

  const handleSubmit = async (
    values: profileProps,
    formikHelper: FormikHelpers<profileProps>
  ) => {
    if (values.email !== user?.email) {
      const { data }: any = await authApi.emailIsExist({ email: values.email });
      if (data?.code !== "auth/user-not-found") {
        formikHelper.setErrors({ email: "Email already exists" });
        return;
      }
    }

    dispatch(updateUserProfile(values, stoploader(formikHelper)));
  };
  const stoploader = (formikHelper: FormikHelpers<profileProps>) => () => {
    formikHelper.setSubmitting(false);
  };

  return (
    <Col lg={6}>
      <Formik
        initialValues={{
          firstName: user?.name.split(" ")[0] || "",
          lastName: user?.name.split(" ")[1] || "",
          email: user?.email || "",
          phoneNumber: user?.phoneNumber || "",
          address: user?.address || {
            address: "",
            latValue: 0,
            lngValue: 0,
          },
        }}
        validationSchema={updateProfileValidation}
        onSubmit={handleSubmit}
      >
        {({
          values,
          handleChange,
          handleSubmit,
          isSubmitting,
          setFieldValue,
          handleBlur,
        }) => (
          <Form onSubmit={handleSubmit} className="d-flex flex-column gap-3">
            <div className="d-flex gap-2">
              <Form.Group controlId="firstName" className={styles.formElement}>
                <FormControl
                  value={values.firstName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  type="text"
                  placeholder="First Name"
                  name="firstName"
                />

                <ErrorMessage
                  name="firstName"
                  component="div"
                  className="error-message"
                />
              </Form.Group>
              <Form.Group controlId="lastName" className={styles.formElement}>
                <FormControl
                  value={values.lastName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  type="text"
                  placeholder="Last Name"
                  name="lastName"
                />
                <ErrorMessage
                  name="lastName"
                  component="div"
                  className="error-message"
                />
              </Form.Group>
            </div>
            <Form.Group controlId="email">
              <FormControl
                type="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Email"
                name="email"
              />
              <ErrorMessage
                name="email"
                component="div"
                className="error-message"
              />
            </Form.Group>
            <Form.Group controlId="phone">
              <PhoneInput
                international
                defaultCountry="GB"
                value={values.phoneNumber}
                onChange={(phone) => {
                  setFieldValue("phoneNumber", phone);
                }}
                placeholder="Enter phone number"
              />
              <ErrorMessage
                name="phoneNumber"
                component="div"
                className="error-message"
              />
            </Form.Group>

            <Form.Group controlId="location">
              {isLoaded && (
                <AutoCompleteWithMap
                  placeholder="Address"
                  value={values.address}
                  onChange={(address) => {
                    setFieldValue("address", address);
                  }}
                />
              )}
              <ErrorMessage
                name="address.address"
                component="div"
                className="error-message"
              />
            </Form.Group>
            <Col lg={12} className="d-flex justify-content-center">
              <div>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className={`btn-rounded my-2 text-white ${styles.color}`}
                >
                  {isSubmitting ? (
                    <div className=" d-flex justify-content-center algin-items-center ">
                      <NavigoLoading
                        type="bars"
                        color={theme.colors.primary}
                        width={30}
                        height={25}
                      />
                    </div>
                  ) : (
                    "Save"
                  )}
                </Button>
              </div>
            </Col>
          </Form>
        )}
      </Formik>
    </Col>
  );
};

export default memo(Index);
