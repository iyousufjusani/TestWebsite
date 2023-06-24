import { Switch } from "antd";

import { memo, useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { cookiesState } from "../../interfaces";
import { saveCookiePreference } from "../../redux/site/action";
import styles from "../../styles/CookiesPreference.module.css";
type Props = {
  onClose: () => void;
};
const Index: React.FC<Props> = ({ onClose }) => {
  const { cookies } = useAppSelector((state) => state.site);
  const dispatch = useAppDispatch();
  const [cookiesOptions, setCookiesOptions] = useState<cookiesState>({
    marketingAndCommunication: "no",
    measureWebsiteUse: "no",
    rememberSiteSetting: "no",
  });
  useEffect(() => {
    if (cookies) {
      setCookiesOptions((p) => {
        return {
          ...p,
          ...cookies,
        };
      });
    }
  }, [cookies]);

  const onChangeHandle = (name: string, checked: boolean) => {
    setCookiesOptions({
      ...cookiesOptions,
      [name]: checked === true ? "yes" : "no",
    });
  };

  const saveCookieSetting = () => {
    dispatch(saveCookiePreference(cookiesOptions, () => onClose()));
  };
  return (
    <div className={styles.preferencesWrapper}>
      <Container>
        <Row className="gap-3">
          <Col lg={12}>
            <h1>Cookies Preferences</h1>
            <p>
              Cookies are files saved on your phone, tablet or computer when you
              visit a website.
            </p>
            <p>
              We use cookies to collect and store information about how you use
              the Navigo website and its services. This page has a brief
              explanation of each type of cookie we use.
            </p>
          </Col>
          <Col lg={12}>
            <h1>Cookie settings</h1>
            <p>
              We use 4 types of cookies. You can choose which cookies
              you&apos;re happy for us to use.
            </p>
          </Col>
          <Col lg={12}>
            <h1>Strictly necessary cookies</h1>
            <p>
              These essential cookies remember your progress through a form (for
              example a registration application).
            </p>
            <p>They must constantly be on.</p>
          </Col>
          <Col lg={12}>
            <div className="d-flex justify-content-between">
              <h1>Cookies that measure website use</h1>
              <Switch
                checked={cookiesOptions?.measureWebsiteUse === "yes"}
                onChange={(e) => onChangeHandle("measureWebsiteUse", e)}
              />
            </div>
            <p>
              We use Google Analytics cookies to collect information about the
              pages you visit and your preferences while you&apos;re visiting
              the Navigo website.
            </p>
          </Col>
          <Col lg={12}>
            <div className="d-flex justify-content-between">
              <h1>Cookies that help with our communications and marketing</h1>
              <Switch
                checked={cookiesOptions?.marketingAndCommunication === "yes"}
                onChange={(e) => onChangeHandle("marketingAndCommunication", e)}
              />
            </div>
            <p>
              These cookies may be set by third-party websites and measure how
              use their services.
            </p>
          </Col>
          <Col lg={12}>
            <div className="d-flex justify-content-between">
              <h1>Cookies that remember your settings</h1>
              <Switch
                checked={cookiesOptions?.rememberSiteSetting === "yes"}
                onChange={(e) => onChangeHandle("rememberSiteSetting", e)}
              />
            </div>
            <p>
              These cookies remember your preferences and the choices you make,
              to personalise your experience of using the Navigo website.
            </p>
          </Col>
          <Col className="text-center">
            <Button onClick={saveCookieSetting} className="w-50">
              Save Changes
            </Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default memo(Index);
