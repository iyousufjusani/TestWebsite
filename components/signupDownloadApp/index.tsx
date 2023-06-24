import Image from "next/image";
import Link from "next/link";
import React, { memo } from "react";
import { Col, Container, Row } from "react-bootstrap";
import styles from "../../styles/Signup.module.css";

// import HomeContactUs from "../HomeContactUs";

type Props = {
  title?: string;
  playStoreUrl?: string;
  appStoreUrl?: string;
};
const Index: React.FC<Props> = ({
  title,
  playStoreUrl,
  appStoreUrl,
}) => {
  return (
    <Container fluid>
      <Row className={`${styles.homeDownloadAppContainer} gap-3`}>
        <Col lg={10} className={`gap-3 ${styles.homeDownloadAppBox}`}>
          <h1>{title}</h1>

          <div className={`gap-3  ${styles.mobileIconBox}`}>
            <Link href={`${playStoreUrl}`} passHref>
              <a>
                <Image
                  width={150}
                  height={50}
                  style={{
                    borderRadius: 8,
                  }}
                  src="/images/google-play-badge.jpg"
                  alt="google-play-store"
                />
              </a>
            </Link>
            <Link href={`${appStoreUrl}`} passHref>
              <a>
                <Image
                  style={{
                    borderRadius: 8,
                  }}
                  width={150}
                  height={50}
                  src="/images/App store.jpg"
                  alt="apple-app-store"
                />
              </a>
            </Link>
          </div>
        </Col>
        <Col lg={8} className="d-flex align-items-center ">
          <Link href="/">
            <a
              style={{
                textTransform: "uppercase",
              }}
              className={`btn btn-rounded  fw-bolder mx-auto  ${styles.buttom}`} 
            >
              contact us
            </a>
          </Link>
        </Col>
      </Row>
    </Container>
  );
};
export default memo(Index);
