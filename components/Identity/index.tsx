import { memo } from "react";
import { Col, Container, Row } from "react-bootstrap";
import UploadWithTitle from "../Uploadwithtitle";

type Props = {};

const data = [
  {
    name: "proofOfIdentity",
    label: "identity",
    title: "1. Proof of Identity (Passport/Driver’s Licence)",
  },
  {
    name: "disclosureBarringService",
    label: "identity",
    title: "2. Disclosure and Barring Service (DBS)",
  },
  {
    name: "bankStatement",
    label: "identity",
    title: "3. Bank Statement (From the last month)",
  },
  {
    name: "profilePhoto",
    label: "identity",
    title: "4. Profile Photo (Recent)",
  },
  {
    name: "nationalInsuranceNumber",
    label: "identity",
    title: "5. National Insurance Number (Photo)",
  },
];
const Index: React.FC<Props> = () => {
  return (
    <Container>
      <Row className="gap-3">
        {data.map((dat) => {
          return (
            <Col key={dat.name + dat.label} lg={12}>
              <UploadWithTitle
                name={dat.name}
                label={dat.label}
                title={dat.title}
              />
            </Col>
          );
        })}
      </Row>
    </Container>
  );
};

export default memo(Index);
