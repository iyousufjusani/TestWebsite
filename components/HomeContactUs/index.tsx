import React, { memo } from "react";
import { Col, Container, Row } from "react-bootstrap";

type Props = {};
const Index: React.FC<Props> = () => {
  return (
    <Container fluid className=" rounded-3 bg-secondary">
      <Row className="gap-2">
        <Col lg={6}>
          <div className="contactus-bar text-white py-4">
            <h1 className="text-white">Contact Us!</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </div>
        </Col>
        <Col className="d-flex justify-content-center align-items-center">
          <div className="contactus-input-btn w-100">
            <input type="email" placeholder="Enter Email" />
            <button className="btn bg-secondary">send</button>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default memo(Index);
