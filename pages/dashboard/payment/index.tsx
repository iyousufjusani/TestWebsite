import { Spin } from "antd";
import { ErrorMessage, Formik, FormikHelpers } from "formik";
import { NextPage } from "next";
import { useEffect, useState } from "react";

import {
  Button,
  Col,
  Container,
  Form,
  FormControl,
  Row,
} from "react-bootstrap";
import theme from "../../../assets/theme";
import NavigoLoading from "../../../components/navigoLoading";
import LoginProtection from "../../../Guards/LoginProtection";
import { useAppDispatch } from "../../../hooks";
import { paymentForm } from "../../../interfaces";
import DashboardLayout from "../../../layouts/dashboardlayout";
import { getUserPayment, saveAccountDetail } from "../../../redux/auth/action";
import styles from "../../../styles/Signup.module.css";
import { paymentFormValidation } from "../../../validations";

type Props = {};
const Profile: NextPage<Props> = () => {
  const dispatch = useAppDispatch();
  const [initialValues, setInitialValues] = useState<paymentForm>({
    accountHolderName: "",
    bankName: "",
    accountNumber: "",
    sortCode: "",
    id: "",
  });
  const stopLoader = (formikHelper: FormikHelpers<paymentForm>) => () => {};
  const saveAccountDetailsHandler = (
    values: paymentForm,
    formikHelper: FormikHelpers<paymentForm>
  ) => {
    const id = initialValues?.id || "";
    delete values.id;
    dispatch(saveAccountDetail(values, id, stopLoader(formikHelper)));
  };
  const [loader, setLoader] = useState(false);
  const stopFetching = (data: paymentForm) => {
    setLoader(false);
    setInitialValues((p) => {
      return {
        ...p,
        ...data,
      };
    });
  };
  useEffect(() => {
    setLoader(true);
    dispatch(getUserPayment(stopFetching));
  }, [dispatch]);
  return (
    <Container fluid>
      <Row className="gap-3">
        <Col lg={12}>
          <h1 className="dashboard-main-heading">My Payment Details</h1>
        </Col>
        <Col lg={12} className="bg-white rounded-4 shadow p-4">
          <Spin spinning={loader}>
            <Formik
              initialValues={initialValues}
              enableReinitialize
              validationSchema={paymentFormValidation}
              onSubmit={saveAccountDetailsHandler}
            >
              {({
                values,
                handleChange,
                handleSubmit,
                isSubmitting,

                handleBlur,
              }) => (
                <Form
                  onSubmit={handleSubmit}
                  className="d-flex flex-column align-items-center gap-3"
                >
                  <Form.Group
                    controlId="accountHolderName"
                    className={styles.formElement}
                  >
                    <FormControl
                      type="text"
                      placeholder="Account holder name"
                      name="accountHolderName"
                      onChange={handleChange}
                      value={values.accountHolderName}
                      onBlur={handleBlur}
                    />
                    <ErrorMessage
                      name="accountHolderName"
                      component="div"
                      className="error-message"
                    />
                  </Form.Group>
                  <Form.Group
                    controlId="bankName"
                    className={styles.formElement}
                  >
                    <FormControl
                      type="text"
                      placeholder="Bank name"
                      name="bankName"
                      value={values.bankName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    <ErrorMessage
                      name="bankName"
                      component="div"
                      className="error-message"
                    />
                  </Form.Group>
                  <Form.Group
                    controlId="accountNumber"
                    className={styles.formElement}
                  >
                    <FormControl
                      type="text"
                      placeholder="Account number"
                      name="accountNumber"
                      value={values.accountNumber}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    <ErrorMessage
                      name="accountNumber"
                      component="div"
                      className="error-message"
                    />
                  </Form.Group>
                  <Form.Group
                    controlId="sortCode"
                    className={styles.formElement}
                  >
                    <FormControl
                      type="text"
                      placeholder="Sort code"
                      name="sortCode"
                      value={values.sortCode}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    <ErrorMessage
                      name="sortCode"
                      component="div"
                      className="error-message"
                    />
                  </Form.Group>

                  <Col lg={6} className="d-flex justify-content-center">
                    <div>
                      <Button
                        type="submit"
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
          </Spin>
        </Col>
      </Row>
    </Container>
  );
};
export default Profile;

Object.assign(Profile, {
  pageTitle: "Profile",

  layout: DashboardLayout,
  protection: LoginProtection,
});
