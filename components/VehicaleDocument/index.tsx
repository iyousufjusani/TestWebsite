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
            name="insuranceCertificate"
            label="vehicle_Document"
            title="1. Insurance Certificate"
          />
        </Col>
        <Col lg={12}>
          <UploadWithTitle
            name="insuranceSupporting"
            label="vehicle_Document"
            title="2. Insurance Supporting Documents"
          />
        </Col>
        <Col lg={12}>
          <UploadWithTitle
            name="motTestCertificate"
            label="vehicle_Document"
            title="3. MOT Test Certificate"
          />
        </Col>
        <Col lg={12}>
          <UploadWithTitle
            name="logBook"
            label="vehicle_Document"
            title="4. Logbook (V5C)"
          />
        </Col>
        {/* <Col lg={12}>
          <UploadWithTitle
            name="nationalInsuranceNumber"
            label="national_Insurance_Number"
            title="4. National Insurance Number (Photo)"
          />
        </Col> */}
        <Col lg={12}>
          <UploadWithTitle
            name="publicLiabilityInsurance"
            label="vehicle_Document"
            title="5. Private Hire Vehicle Licence (PHV)"
          />
        </Col>
        <Col lg={12}>
          <UploadWithTitle
            name="phvLicence"
            label="vehicle_Document"
            title="6. Public Liability Insurance"
          />
        </Col>
      </Row>
    </Container>
  );
};

export default memo(Index);
