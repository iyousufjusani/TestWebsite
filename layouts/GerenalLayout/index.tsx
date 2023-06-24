import { AnimatePresence } from "framer-motion";
import React, { memo } from "react";
import { Container } from "react-bootstrap";
import Footer from "../../components/Footer";
import Header from "../../components/Header";

type Props = {
  children?: JSX.Element;
};
const Index: React.FC<Props> = ({ children }) => {
  return (
    <AnimatePresence mode="wait">
      <Container fluid className="p-0">
        <Header />
        {children}
        <Footer key="footer" />
      </Container>
    </AnimatePresence>
  );
};
export default memo(Index);
