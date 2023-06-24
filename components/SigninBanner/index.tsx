import Link from "next/link";
import { memo, useContext } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { UserContext } from "../../contexts/userContext";
import styles from "../../styles/Signup.module.css";
import BasicForm from "./BasicForm";
import { motion, AnimatePresence } from "framer-motion";

type Props = {};

const Index: React.FC<Props> = () => {
  const { state } = useContext(UserContext);
  return (
    <Container
      fluid
      className={`${styles.BannerContainer} mb-4`}
      style={{
        backgroundImage: `url("/images/signup.jpeg")`,
      }}
    >
      <Container className="h-100 p-0">
        <Row>
          <AnimatePresence>
            <Col className={styles.BanerDescription}>
              <motion.h1
                initial={{
                  y: 100,
                  opacity: 0,
                }}
                animate={{
                  y: 0,
                  opacity: 1,
                }}
                transition={{
                  duration: 1,
                  type: "tween",
                  ease: "easeInOut",
                }}
                exit={{
                  y: -100,
                  opacity: 0,
                }}
              >
                Sign in to begin your <br /> journey <br />
                with Navigo
              </motion.h1>
            </Col>
          </AnimatePresence>

          <Col lg={5} className={styles.formContainer}>
            <div
              className="w-100 bg-white p-4"
              style={{
                borderRadius: "8px",
                overflow: "hidden",
              }}
            >
              <div>
                <BasicForm />
                <hr />
                <div className="navigo-Links d-flex flex-row justify-content-center">
                  <p className={`${styles.link} mx-1 `}>Create an account</p>
                  <Link href="/signup">
                    <a className={styles.link}> Sign up</a>
                  </Link>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </Container>
  );
};

export default memo(Index);
