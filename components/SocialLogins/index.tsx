import React from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { FaAppleAlt, FaFacebookF, FaGoogle } from "react-icons/fa";

type Props = {};

const Index: React.FC<Props> = () => {
  return (
    <Container fluid className="p-0 my-4">
      <Row className="gap-3">
        <Col lg={12}>
          <Button variant="outline-secondary" className=" w-100">
            <div className="d-flex justify-content-center align-items-center">
              <FaAppleAlt className="mx-2" />
              Continue with Apple
            </div>
          </Button>
        </Col>

        <Col lg={12}>
          <Button variant="outline-secondary" className=" w-100">
            <div className="d-flex justify-content-center align-items-center">
              <FaFacebookF className="mx-2" />
              Continue with facebook
            </div>
          </Button>
        </Col>
        <Col lg={12}>
          <Button variant="outline-secondary" className=" w-100">
            <div className="d-flex justify-content-center align-items-center">
              <FaGoogle className="mx-2" />
              Continue with facebook
            </div>
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default Index;
