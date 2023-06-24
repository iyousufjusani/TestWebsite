import Image from "next/image";
import React, { memo } from "react";
import { Col, Container, Row } from "react-bootstrap";
import styles from "../../styles/Home.module.css";
import _ from "lodash";
import DropdownList from "./DropdownList";
type Props = {
  requirements: (string | { value: string; list: string[] })[];
};

const Index: React.FC<Props> = ({ requirements }) => {
  return (
    <Container fluid className={`${styles.requirementContainer} pt-5`}>
      <Row className="gap-4 ">
        <Col lg={12}>
          <h1 className="home-main-heading text-secondary ">Requirments</h1>
        </Col>
        <Col lg={12}>
          <ul className={styles.homeRequirements}>
            {requirements?.map((requirement, index) => {
              if (_.isObject(requirement)) {
                return <DropdownList requirement={requirement} />;
              } else {
                return <li key={index}>{requirement}</li>;
              }
            })}
          </ul>
        </Col>
        <Col lg={12}>
          <div className={styles.requireCarImg}>
            <Image layout="fill" src="/images/car require.png" alt="car" />
          </div>
        </Col>
      </Row>
      <div className={styles.requireCircle}>
        <div className=" circle  left" />
      </div>
      <div className={`${styles.requireMobile} d-none d-lg-block`}>
        <Image layout="fill" src="/images/mobile rotate.png" alt="car" />
      </div>
    </Container>
  );
};

export default memo(Index);
