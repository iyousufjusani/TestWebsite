import Image from "next/image";
import React, { memo } from "react";
import Link from "next/link";
import { Container, Nav, Navbar, Row } from "react-bootstrap";
import styles from "../../styles/Header.module.css";

type Props = {};
const Index: React.FC<Props> = () => {
  return (
    <Container className={styles.headerContainer} fluid>
      <Row>
        <Navbar expand="lg" variant="dark">
          <Container fluid className={styles.navbarContainer}>
            <Navbar.Brand
              href={`https://${process.env.NEXT_PUBLIC_WEBSITE_LINK}`}
            >
              <div className={styles.navigoLogoBox}>
                <Image
                  src="/images/navigoLogo.png"
                  layout="fill"
                  alt="Navigo Taxis"
                  priority={true}
                />
              </div>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className={`  ${styles.navLinks} ms-auto gap-3`}>
                <Nav.Link
                  href={`https://${process.env.NEXT_PUBLIC_DRIVE_WEBSITE_LINK}/`}
                >
                  Drive
                </Nav.Link>
                <Nav.Link
                  href={`https://${process.env.NEXT_PUBLIC_RIDE_WEBSITE_LINK}/`}
                >
                  Ride
                </Nav.Link>
                <Nav.Link
                  href={`https://${process.env.NEXT_PUBLIC_WEBSITE_LINK}/location`}
                >
                  Location
                </Nav.Link>

                <Link
                  href={`https://${process.env.NEXT_PUBLIC_WEBSITE_LINK}/contact-us`}
                >
                  <a
                    style={{
                      height: 30,
                    }}
                    className={`btn ${styles.navBtn} d-flex  justify-content-center align-items-center  btn-rounded`}
                  >
                    Contact Us
                  </a>
                </Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </Row>
    </Container>
  );
};
export default memo(Index);
