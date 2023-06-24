import { memo } from "react";
import { Col, Container, Row } from "react-bootstrap";
import UploadWithTitle from "../Uploadwithtitle";

type Props = {};
const Index: React.FC<Props> = () => {
  return (
    <Container>
      <Row className="gap-3">
        <Col lg={12}>
          <UploadWithTitle
            name="DVLAPlastic"
            label="driving_License"
            title="1. DVLA Plastic Driving Licence"
          />
        </Col>
        <Col lg={12}>
          <UploadWithTitle
            name="DVLAElectronicCode"
            label="driving_License"
            title="2. DVLA Electronic Counterpart Check Code"
          />
        </Col>
        <Col lg={12}>
          <UploadWithTitle
            name="privateHire"
            label="driving_License"
            title="3. Private Hire Driver Licence / PCO Licence"
          />
        </Col>
      </Row>
    </Container>
  );
};

export default memo(Index);
