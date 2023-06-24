import Image from "next/image";
import Link from "next/link";
import React, { memo } from "react";
import { Col, Container, Row } from "react-bootstrap";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
} from "react-icons/fa";
import styles from "../../styles/Footer.module.css";
import { socialFb, socialTwitter, socialLinkdin, socialInstagram } from "../../utils/siteInfo";

type Props = {};

const Index: React.FC<Props> = () => {
  return (
    <Container fluid>
      <Row className="p-5 gap-4">
        <Col lg={3} md={3}>
          <div className={styles.footerLogoBox}>
            <Link href={`https://${process.env.NEXT_PUBLIC_WEBSITE_LINK}`}>
              <a className={styles.footerLogo}>
                <Image
                  layout="fill"
                  src="/images/navigoLogo.png"
                  alt="navigo taxis"
                />
              </a>
            </Link>

            <div
              className={`${styles.footerSocialBox} gap-2 justify-content-center`}
            >
              <Link href={socialFb?.()}>
                <a>
                  <FaFacebookF color="grey" />
                </a>
              </Link>
              <Link href={socialTwitter?.()}>
                <a>
                  <FaTwitter color="grey" />
                </a>
              </Link>
              <Link href={socialLinkdin?.()}>
                <a>
                  <FaLinkedinIn color="grey" />
                </a>
              </Link>
              <Link href={socialInstagram?.()}>
                <a>
                  <FaInstagram color="grey" />
                </a>
              </Link>
            </div>
          </div>
        </Col>

        <Col lg={3} md={3}>
          <ul className={`navigo-Links gap-2`}>
            <li>
              <Link
                href={`https://${process.env.NEXT_PUBLIC_WEBSITE_LINK}/about-us`}
              >
                <a>About Navigo</a>
              </Link>
            </li>
            <li>
              <Link
                href={`https://${process.env.NEXT_PUBLIC_WEBSITE_LINK}/our-services`}
              >
                <a>Services</a>
              </Link>
            </li>

            <li>
              <Link
                href={`https://${process.env.NEXT_PUBLIC_WEBSITE_LINK}/safety-and-community-guidelines`}
              >
                <a>Safety & Community Guidelines</a>
              </Link>
            </li>
            <li>
              <Link
                href={`https://${process.env.NEXT_PUBLIC_WEBSITE_LINK}/location`}
              >
                <a>Cities/Location</a>
              </Link>
            </li>
          </ul>
        </Col>
        <Col lg={3} md={3}>
          <ul className={`navigo-Links gap-2`}>
            <li>
              <Link
                href={`https://${process.env.NEXT_PUBLIC_WEBSITE_LINK}/contact-us`}
              >
                <a>Contact Us</a>
              </Link>
            </li>
            <li>
              <Link
                href={`https://${process.env.NEXT_PUBLIC_WEBSITE_LINK}/terms-and-conditions`}
              >
                <a>Terms & Conditions</a>
              </Link>
            </li>
            <li>
              <Link
                href={`https://${process.env.NEXT_PUBLIC_WEBSITE_LINK}/privacy-policy`}
              >
                <a>Our Policy</a>
              </Link>
            </li>
            <li>
              <Link
                href={`https://${process.env.NEXT_PUBLIC_WEBSITE_LINK}/career`}
              >
                <a>Career</a>
              </Link>
            </li>
          </ul>
        </Col>
        <Col>
          <ul className={`navigo-Links gap-2`}>
            <li>
              <Link
                href={`https://${process.env.NEXT_PUBLIC_BLOG_WEBSITE_LINK}`}
              >
                <a>Our Blog</a>
              </Link>
            </li>
          </ul>
        </Col>
      </Row>
    </Container>
  );
};
export default memo(Index);
