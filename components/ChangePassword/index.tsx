import { ErrorMessage, Formik, FormikHelpers } from "formik";
import { useRouter } from "next/router";
import React, { memo } from "react";
import { Button, Col, Form } from "react-bootstrap";
import theme from "../../assets/theme";
import { useAppDispatch } from "../../hooks";
import { updateUserPassword } from "../../redux/auth/action";
import styles from "../../styles/Signup.module.css";
import { changePasswordValidation } from "../../validations";
import NavigoLoading from "../navigoLoading";

type Props = {};
export type changePassProps = {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
};
const Index: React.FC<Props> = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const updatePassword = (
    values: changePassProps,
    formikHelper: FormikHelpers<changePassProps>
  ) => {
    dispatch(updateUserPassword(values, stopLoader(formikHelper)));
  };
  const stopLoader =
    (formikHelper: FormikHelpers<changePassProps>) => (res: any) => {
      formikHelper.setSubmitting(false);
      if (res?.code === "auth/wrong-password") {
        formikHelper.setErrors({ oldPassword: "Password is wrong" });
        return;
      }
      router.push("/signin");
    };

  return (
    <>
      <Col lg={6} className="pb-4">
        <Col lg={12} className=" mb-3">
          <h1 className="dashboard-subHeading">Change Password</h1>
        </Col>

        <Formik
          initialValues={{
            oldPassword: "",
            newPassword: "",

            confirmPassword: "",
          }}
          validationSchema={changePasswordValidation}
          onSubmit={updatePassword}
        >
          {({
            values,

            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
            /* and other goodies */
          }) => (
            <Form
              onSubmit={handleSubmit}
              className=" profile-from d-flex gap-3 justify-content-center flex-column align-items-center"
            >
              <Form.Group controlId="oldPassword" className="w-100">
                <Form.Control
                  type="password"
                  placeholder="Old password"
                  value={values.oldPassword}
                  name="oldPassword"
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <ErrorMessage
                  name="oldPassword"
                  component="div"
                  className="error-message"
                />
              </Form.Group>
              <Form.Group controlId="newPassword" className="w-100">
                <Form.Control
                  type="password"
                  placeholder="New password"
                  value={values.newPassword}
                  name="newPassword"
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <ErrorMessage
                  name="newPassword"
                  component="div"
                  className="error-message"
                />
              </Form.Group>

              <Form.Group controlId="confirmPassword" className="w-100">
                <Form.Control
                  type="password"
                  placeholder="Confirm password"
                  value={values.confirmPassword}
                  name="confirmPassword"
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <ErrorMessage
                  name="confirmPassword"
                  component="div"
                  className="error-message"
                />
              </Form.Group>

              <Button
                type="submit"
                className={`btn-rounded   text-white ${styles.color}`}
                disabled={isSubmitting}
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
            </Form>
          )}
        </Formik>
      </Col>
    </>
  );
};
export default memo(Index);
