import { motion } from "framer-motion";
import React, { memo } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { FaArrowRight } from "react-icons/fa";
import { useAppSelector } from "../../hooks";
type Props = {};
const Index: React.FC<Props> = () => {
  const { user } = useAppSelector((state) => state.auth);

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      transition={{
        type: "spring",
        stiffness: 200,
        delay: 0.5,
        duration: 0.4,
      }}
      animate={{ opacity: 1, y: 0 }}
    >
      <Container>
        <Row className="py-3">
          <Col lg={9}>
            <Container fluid className="p-0">
              <Row>
                <Col lg={12}>
                  <h6
                    style={{
                      fontSize: "14px",
                      fontWeight: "bold",
                    }}
                  >
                    Hey
                    <span className="text-secondary mx-1">{user?.name}</span>,
                    we need your basic information to get started.
                  </h6>
                </Col>
                <Col lg={12} className="text-right">
                  <p
                    style={{
                      fontSize: "12px",
                    }}
                  >
                    Please provide your complete details to get started.
                  </p>
                </Col>
              </Row>
            </Container>
          </Col>
          <Col className="d-flex justify-content-end align-items-center">
            <Button variant="secondary" href="/additional-information">
              <div>
                <span className="mx-3 ">Continue</span>
                <FaArrowRight />
              </div>
            </Button>
          </Col>
        </Row>
      </Container>
    </motion.div>
  );
};

export default memo(Index);
