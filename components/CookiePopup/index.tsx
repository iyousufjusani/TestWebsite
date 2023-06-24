import { memo, useEffect, useState } from "react";
import { Button, Col, Container, Row, Spinner } from "react-bootstrap";
import styles from "../../styles/CookiesPopup.module.css";
import { motion, AnimatePresence } from "framer-motion";
import Portal from "../Portal";
import CookiesPreferences from "../CookiesPreferences";
import { useAppDispatch } from "../../hooks";
import { allowAllCookies } from "../../redux/site/action";
type Props = {};
const Index: React.FC<Props> = () => {
  const [showModel, setShowModel] = useState(false);
  const dispatch = useAppDispatch();
  const [showPopup, setShowPop] = useState(false);
  const [loader, setLoader] = useState(false);
  const stopLoader = () => {
    setLoader(false);
    setShowPop(false);
    localStorage.setItem("IsCookiePopupHide", "yes");
  };
  const acceptAllHandler = () => {
    dispatch(allowAllCookies(stopLoader));
  };

  useEffect(() => {
    setShowPop(
      localStorage.getItem("IsCookiePopupHide") === "yes" ? false : true
    );
  }, []);
  if (!showPopup) {
    return null;
  }

  return (
    <>
      <AnimatePresence mode="wait">
        <motion.div
          initial={{ transform: "translateY(100%)", opacity: 0 }}
          animate={{
            transform: "translateY(0%)",
            opacity: 1,
          }}
          transition={{
            duration: 0.5,
            delay: 0.5,
            type: "spring",
          }}
          exit={{
            transform: "translateY(100%)",
            opacity: 0,
          }}
          className={`${styles.cookiesContainer} `}
        >
          <Container className="shadow bg-white  rounded-4 p-4">
            <Row className={styles.cookiesContentBox}>
              <Col lg={7}>
                <h1>
                  This website uses cookies to ensure you get the best
                  experience on our website
                </h1>
              </Col>
              <Col className="d-flex justify-content-center gap-3 align-items-center">
                <Button onClick={acceptAllHandler} className="w-50 bg-primary" style={{outline: "none"}}>
                  {loader ? (
                    <Spinner
                      color="white"
                      className="text-white"
                      animation="border"
                    />
                  ) : (
                    " Accept All"
                  )}
                </Button>
                <Button
                  onClick={() => setShowModel(true)}
                  className="w-50"
                  style={{borderColor: "#193b69", color: "#193b69"}}
                  variant="outline-primary"
                >
                  Cookies Preferences
                </Button>
              </Col>
            </Row>
          </Container>
        </motion.div>
      </AnimatePresence>

      <Portal show={showModel} onClose={() => setShowModel(false)}>
        <CookiesPreferences
          onClose={() => {
            setShowModel(false);
            setShowPop(false);
          }}
        />
      </Portal>
    </>
  );
};

export default memo(Index);
