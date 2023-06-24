import { memo, useContext } from "react";
import { Col, Row } from "react-bootstrap";
import theme from "../../assets/theme";
import { AdditionalContext } from "../../contexts/additionalContext";

type Props = {
  children: React.ReactNode;
  title: string;
  asFor: string;
};
const Index: React.FC<Props> = ({ children, title, asFor }) => {
  const { state } = useContext(AdditionalContext);
  const isCompleted = state[asFor]?.isCompleted || false;
  return (
    <Row className="gap-2 my-2">
      <Col
        lg={12}
        className=" rounded-2 pt-1"
        style={{
          backgroundColor: isCompleted ? "green" : theme.colors.tertiary,
        }}
      >
        <h5 className="text-white">{title}</h5>
      </Col>
      <Col lg={12}>{children}</Col>
    </Row>
  );
};

export default memo(Index);
