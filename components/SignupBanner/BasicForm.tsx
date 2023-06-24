import { City, ICity } from "country-state-city";
import { ErrorMessage, Formik, FormikHelpers } from "formik";
import { motion } from "framer-motion";
import React, { memo, useContext, useEffect, useState } from "react";
import { Button, Form, FormControl } from "react-bootstrap";
import PhoneInput from "react-phone-number-input";
import Select, { SingleValue } from "react-select";
import theme from "../../assets/theme";
import { UserContext } from "../../contexts/userContext";
import { registerState } from "../../interfaces";
import AuthApi from "../../redux/auth/authApi";
import styles from "../../styles/Signup.module.css";
import { userRegisterValidation } from "../../validations";
import NavigoLoading from "../navigoLoading";
type Props = {};
type selectOption = {
  value: string;
  label: string;
};

const authApi = new AuthApi();

interface basicInfoProps extends registerState {
  isAgree: boolean;
  isAllow: boolean;
}
const Index: React.FC<Props> = () => {
  const { dispatch, constants } = useContext(UserContext);
  const handleSubmit = async (
    values: basicInfoProps,
    formikHelper: FormikHelpers<basicInfoProps>
  ) => {
    const { setSubmitting, setErrors } = formikHelper;

    try {
      const email: string = values.email;
      const phoneNumber: string = values.phoneNumber;

      const { data }: any = await authApi.emailIsExist({ email });
      if (data?.code === "auth/user-found") {
        setErrors({ email: "Email already exists" });
        return;
      }

      const { data: dataPhone }: any = await authApi.checkPhoneNumber({
        phoneNumber,
      });
      if (dataPhone?.code === "auth/user-found") {
        setErrors({ phoneNumber: "Phone number is already exist" });
        return;
      }
      dispatch({
        type: constants.SET_BASIC_INFO,
        payload: values,
      });
    } catch (error) {}
    setSubmitting(false);
  };

  const [cities, setCities] = useState<selectOption[]>([]);
  useEffect(() => {
    const fetch: selectOption[] = City.getCitiesOfCountry("GB").map(
      (city: ICity) => {
        return {
          value: city.name,
          label: city.name,
        };
      }
    );
    setCities(fetch);
  }, []);
  return (
    <motion.div
      initial={{ opacity: 0, x: -100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 100 }}
      transition={{
        duration: 0.6,
        // ease: "easeInOut",
        delay: 0.3,
      }}
    >
      <Formik
        initialValues={{
          firstName: "",
          lastName: "",
          email: "",
          phoneNumber: "",
          city: "",
          isAgree: false,
          isAllow: false,
        }}
        validationSchema={userRegisterValidation.basic}
        onSubmit={handleSubmit}
      >
        {({
          values,
          handleChange,
          handleSubmit,
          isSubmitting,
          setFieldValue,
          errors,
          touched,
          handleBlur,
        }) => (
          <Form className="d-flex flex-column gap-3" onSubmit={handleSubmit}>
            <div className="d-flex gap-2">
              <Form.Group controlId="firstName" className={styles.formElement}>
                <FormControl
                  type="text"
                  placeholder="First name"
                  name="firstName"
                  value={values.firstName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />

                <ErrorMessage
                  name="firstName"
                  component="div"
                  className="error-message"
                />
              </Form.Group>
              <Form.Group controlId="lastName" className={styles.formElement}>
                <FormControl
                  type="text"
                  placeholder="Last name"
                  name="lastName"
                  value={values.lastName}
                  onChange={handleChange}
                  onBlur={handleBlur}
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
                placeholder="Email address"
                name="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
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
                placeholder="Phone number"
                value={values.phoneNumber}
                onChange={(value: string) => {
                  setFieldValue("phoneNumber", value);
                }}
              />

              <ErrorMessage
                name="phoneNumber"
                component="div"
                className="error-message"
              />
            </Form.Group>

            <Form.Group controlId="phone">
              <Select
                placeholder="City"
                styles={{
                  placeholder: (provided) => ({
                    ...provided,
                    fontSize: 14,
                  }),
                  control: (p) => ({
                    ...p,

                    borderRadius: "50px",
                  }),
                }}
                defaultValue={cities.find((city) => city.value === values.city)}
                options={cities}
                onChange={(data: SingleValue<selectOption>) => {
                  if (data) {
                    setFieldValue("city", data.value);
                  }
                }}
              />

              <ErrorMessage
                name="city"
                component="div"
                className="error-message"
              />
            </Form.Group>
            <Form.Group
              className={`${styles.signupTermsGroup} d-flex`}
              controlId="isAgree"
            >
              <Form.Check
                name="isAgree"
                checked={values.isAgree}
                onBlur={handleBlur}
                onChange={(event) => {
                  setFieldValue("isAgree", event.target.checked);
                }}
              />
              <Form.Label
                className={`m-0 mx-2 ${
                  errors.isAgree && touched.isAgree && "text-danger"
                } `}
              >
                By proceeding, I agree to Navigo’s Terms of Use and acknowledge
                that I have read the Privacy Policy.
              </Form.Label>
            </Form.Group>

            <Form.Group
              className={`${styles.signupTermsGroup} d-flex`}
              controlId="isAllow"
            >
              <Form.Check
                name="isAllow"
                checked={values.isAllow}
                onBlur={handleBlur}
                onChange={(event) => {
                  setFieldValue("isAllow", event.target.checked);
                }}
              />
              <Form.Label
                className={`m-0 mx-2 ${
                  errors.isAllow && touched.isAllow && "text-danger"
                } `}
              >
                I also agree that Navigo may contact me by email, phone or SMS
                (including by automated means) at the email address or number I
                provide, including for marketing purposes.
              </Form.Label>
            </Form.Group>
            <Button
              variant="primary"
              type="submit"
              name="submit"
              className=" text-white bg-primary"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <div className=" d-flex justify-content-center algin-items-center ">
                  <NavigoLoading
                    type="bars"
                    color={theme.colors.secondary}
                    width={30}
                    height={25}
                  />
                </div>
              ) : (
                "Continue"
              )}
            </Button>
          </Form>
        )}
      </Formik>
    </motion.div>
  );
};

export default memo(Index);
