import Link from "next/link";
import React, { memo } from "react";
import { Container, Row, Col } from "react-bootstrap";
import styles from "../../styles/Home.module.css";

type Props = {};
const Index: React.FC<Props> = () => {
  return (
    <Container className={`${styles.homeBannerContainer}`} fluid>
      <Row className="w-100 h-100">
        <Col lg={12} className="h-100" style={{display: "flex", alignItems: "center", justifyContent: "start"}}>
          <div className={`${styles.homeBannerDescriptionBox} gap-2`}>
            <h1>
              Earn any time,
              <br /> any day
            </h1>
            <p>Drive with Navigo and earn on the go</p>
            <Link href={`/signup`}>
              <a className="btn bg-secondary btn-rounded">Sign Up</a>
            </Link>
          </div>
        </Col>
      </Row>
    </Container>
  );
};
export default memo(Index);
