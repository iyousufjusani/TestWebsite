import { ErrorMessage, Formik, FormikHelpers } from "formik";
import Link from "next/link";
import { memo, useState } from "react";
import { motion } from "framer-motion";
import { Button, Form, FormControl } from "react-bootstrap";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import theme from "../../assets/theme";

import styles from "../../styles/Signup.module.css";

import { useAppDispatch } from "../../hooks";
import { userLogin } from "../../redux/auth/action";
import AuthApi from "../../redux/auth/authApi";
import { userLoginValidation } from "../../validations";
import NavigoLoading from "../navigoLoading";
import { useRouter } from "next/router";
type Props = {};
const authApi = new AuthApi();
interface basicInfoProps {
  email: string;
  password: string;
}
const Index: React.FC<Props> = () => {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const stopLoader = (formikHelper: FormikHelpers<basicInfoProps>) => (res) => {
    formikHelper.setSubmitting(false);

    if (res.code === "auth/user-not-found") {
      formikHelper.setFieldError("email", "Email not registered");
      return;
    }
    if (res.code === "auth/too-many-requests") {
      formikHelper.setErrors({
        email: "Too many requests. Please try again later.",
      });
      return;
    }

    if (res.code === "auth/wrong-password") {
      formikHelper.setErrors({
        password: "Wrong password",
      });
      return;
    }
    router.push("/verify-email");
  };
  const handleSubmit = async (
    values: basicInfoProps,
    formikHelper: FormikHelpers<basicInfoProps>
  ) => {
    const { setErrors } = formikHelper;

    const email: string = values.email;
    const { data }: any = await authApi.emailIsExist({ email });
    if (data?.code === "auth/user-not-found") {
      setErrors({
        email: "Email does not exist",
      });
      return;
    }

    if (data?.role !== "driver") {
      setErrors({ email: "email not register yet." });
      return;
    }

    dispatch(userLogin(values, stopLoader(formikHelper)));
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -100 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{
        duration: 0.6,
        // ease: "easeInOut",
        delay: 0.3,
      }}
      exit={{ opacity: 0, x: 100 }}
    >
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={userLoginValidation}
        onSubmit={handleSubmit}
      >
        {({
          values,
          handleChange,
          handleSubmit,
          isSubmitting,

          handleBlur,
        }) => (
          <Form className="d-flex flex-column gap-3" onSubmit={handleSubmit}>
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
            <Form.Group controlId="password">
              <div className="password-input">
                <FormControl
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter password"
                  name="password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <a
                  onClick={(e) => {
                    e.preventDefault();
                    setShowPassword(!showPassword);
                  }}
                  className="btn bg-transparent"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </a>
              </div>

              <ErrorMessage
                name="password"
                component="div"
                className="error-message"
              />
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
                "Sign in"
              )}
            </Button>
            <div className="navigo-Links">
              <Link
                href={`https://${process.env.NEXT_PUBLIC_WEBSITE_LINK}/forgot-password`}
              >
                <a className={styles.link}>Forgot password?</a>
              </Link>
            </div>
          </Form>
        )}
      </Formik>
    </motion.div>
  );
};

export default memo(Index);
