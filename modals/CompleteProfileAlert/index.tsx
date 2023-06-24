import Image from "next/image";
import Link from "next/link";
import { memo } from "react";
import { Button, Col, Container, Modal, Row } from "react-bootstrap";
import { FaTimes } from "react-icons/fa";
import styles from "../../styles/CompleteProfile.module.css";
type Props = {
  show: boolean;
  onClose: () => void;
};
const Index: React.FC<Props> = ({ show, onClose }) => {
  return (
    <Modal show={show} onHide={onClose} centered>
      <Container className={`${styles.completeContainer} p-3`}>
        <button onClick={onClose} className={styles.modelBtn}>
          <FaTimes />
        </button>
        <Row className="gap-2">
          <Col lg={12} className="d-flex justify-content-center">
            <div className={styles.completeIconTop}>
              <Image
                layout="fill"
                alt="checkSuccess"
                src="/images/checkSuccess.gif"
              />
            </div>
          </Col>
          <Col lg={12}>
            <p className="text-center fs-7">
              Thankyou for signing up with Navigo.
            </p>
          </Col>
          <Col lg={12}>
            <p className="text-center fs-7">
              Your documents have been successfully submitted. Our team will
              reach out to you within 2-3 working days. Thank you!
            </p>
          </Col>
          <Col lg={12}>
            <p className="text-center fs-7">
              Looking forward to get you on board!
            </p>
          </Col>
          <Col lg={12}>
            <p className="text-center fs-7">
              Visit our website to read about{" "}
              <Link
                href={`https://${process.env.NEXT_PUBLIC_WEBSITE_LINK}/privacy-policy`}
              >
                <a className="text-secondary">our policy</a>
              </Link>
              ,{" "}
              <Link
                href={`https://${process.env.NEXT_PUBLIC_WEBSITE_LINK}/safety-and-community-guidelines`}
              >
                <a className="text-secondary">community guidelines</a>
              </Link>{" "}
              and{" "}
              <Link
                href={`https://${process.env.NEXT_PUBLIC_WEBSITE_LINK}/terms-and-conditions`}
              >
                <a className="text-secondary">terms and conditions</a>
              </Link>{" "}
              to know more about us.
            </p>
          </Col>
          <Col lg={12}>
            <div className="text-center">
              <Button onClick={onClose} className="px-3">
                OK
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
    </Modal>
  );
};

export default memo(Index);
