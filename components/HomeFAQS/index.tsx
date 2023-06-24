import { Collapse } from "antd";
import React, { memo } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { HomeFAQSProps } from "../../interfaces";
import styles from "../../styles/Home.module.css";

const { Panel } = Collapse;
type Props = {
  faqs: HomeFAQSProps[];
};
const Index: React.FC<Props> = ({ faqs }) => {
  return (
    <Container fluid className="py-5">
      {/* <Row className={`${styles.HomeFAQTopBox} gap-4 `}>
        <Col lg={12}>
          <h1 className="text-secondary text-center">
            do you still need any help?
          </h1>
        </Col>
        <Col lg={12}>
          <div className={styles.HomeFAQTopheading}>
            <h2 className="text-secondary text-center">
              We`ve got the answers
            </h2>
          </div>
        </Col>
      </Row> */}
      <Row className="mt-5">
        <Col lg={12}>
          <h1
            style={{
              fontSize: "30px",
              fontWeight: "bolder",
            }}
            className="text-secondary text-center"
          >
            {`FAQs`}
          </h1>
          <Col lg={12}>
            <Collapse className="bg-white" bordered={false}>
              {faqs?.map((faq) => (
                <Panel header={faq.title} key={faq.key}>
                  <p
                    dangerouslySetInnerHTML={{
                      __html: faq.description || "",
                    }}
                  />
                </Panel>
              ))}
            </Collapse>
          </Col>
        </Col>
      </Row>
    </Container>
  );
};

export default memo(Index);
