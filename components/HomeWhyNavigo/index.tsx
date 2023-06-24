import Image from "next/image";
import React, { memo } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { WhyNavigoFeaturesProps } from "../../interfaces";
import styles from "../../styles/Home.module.css";

type Props = {
  title: string;
  image: string;
  features: WhyNavigoFeaturesProps[];
};

const Index: React.FC<Props> = ({ title, features, image }) => {
  return (
    <Container fluid className="py-5">
      <Row className="gap-1">
        <Col lg={12}>
          <h1 className="home-main-heading ">{title}</h1>
        </Col>
        <Col className="p-0">
          <div className={styles.whyNavigoImage}>
            <Image alt="Why navigo" layout="fill" src={`/${image}`} />
          </div>
        </Col>
        <Col lg={7} className={styles.whyNavigoFeatureBox}>
          <Container fluid>
            <Row className="gap-4">
              {features?.map((feature, index) => (
                <Col className={styles.whyNavigoFeature} key={index} lg={12}>
                  <h2 className="home-sub-heading">{feature.title}</h2>
                  <p>{feature.description}</p>
                </Col>
              ))}
            </Row>
          </Container>
        </Col>
      </Row>
    </Container>
  );
};

export default memo(Index);
