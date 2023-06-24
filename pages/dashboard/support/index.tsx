import { NextPage } from "next";
import styles from "../../../styles/Signup.module.css";
import {
  Col,
  Container,
  Row,
  Button,
  Form,
  FormControl,
  InputGroup,
} from "react-bootstrap";
import LoginProtection from "../../../Guards/LoginProtection";
import { useAppSelector } from "../../../hooks";

import DashboardLayout from "../../../layouts/dashboardlayout";

type Props = {};
const Profile: NextPage<Props> = () => {
  const { user } = useAppSelector((state) => state.auth);

  return (
    <Container fluid>
      <Row className="gap-3">
        <Col lg={12}>
          <h1 className="dashboard-main-heading ">Support</h1>
        </Col>
        <Col lg={12} className="bg-white rounded-4 text-center shadow p-4 ">
          <p className="my-3">
            Our support team is ready to help you with any questions you may
            have.
            <br />
            Chat with one of our support team now or email us using the form
            below.
          </p>
          <Form className="d-flex flex-column justify-content-center align-items-center gap-3">
            <Form.Group controlId="question" className={styles.formElement}>
              <FormControl
                type="text"
                placeholder="Enter your email"
                name="yourQuestion"
              />
            </Form.Group>
            <Form.Group controlId="question" className={styles.formElement}>
              <FormControl
                type="text"
                placeholder="Your question"
                name="yourQuestion"
              />
            </Form.Group>
            <Form.Group controlId="answer" className={styles.formElement}>
              <FormControl
                as="textarea"
                type="text"
                placeholder="Explain here"
                name="answer"
              />
            </Form.Group>

            <Col lg={6} className="d-flex justify-content-center">
              <div>
                <Button
                  type="submit"
                  className={`btn-rounded  my-2  text-white ${styles.color}`}
                  variant="warning"
                >
                  Submit
                </Button>
              </div>
            </Col>
          </Form>
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
