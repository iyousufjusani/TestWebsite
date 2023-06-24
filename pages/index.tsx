import type { GetStaticProps, NextPage } from "next";
import { Fragment } from "react";
import { Container } from "react-bootstrap";
import HomePageData from "../assets/static-data/homepage";

import HomeBanner from "../components/HomeBanner";
import HomeDownloadApp from "../components/HomeDownloadApp";
import HomeFAQS from "../components/HomeFAQS";
import HomeRequirements from "../components/HomeRequirements";
import HomeWhyNavigo from "../components/HomeWhyNavigo";
import { HomeFAQSProps, WhyNavigoFeaturesProps } from "../interfaces";
import GerenalLayout from "../layouts/GerenalLayout";
import styles from "../styles/Home.module.css";
type Props = {
  homeData: {
    homeBanner: {
      imageUrl: string;
    };
    whyNavigo: {
      title: string;
      features: WhyNavigoFeaturesProps[];
      image: string;
    };
    requirements: (string | { value: string, list: string[] })[];
    carMustHave: string[];
    homeFaqs: HomeFAQSProps[];
    homeDownloadApp: {
      title?: string;
      description?: string;
      playStoreUrl?: string;
      appStoreUrl?: string;
      image?: string;
    };
  };
};
const Home: NextPage<Props> = ({ homeData }) => {
  const {
    whyNavigo,
    homeBanner,
    homeDownloadApp,
    requirements,
    carMustHave,
    homeFaqs,
  } = homeData;
  return (
    <Fragment>
      <Container fluid className={`p-0 bg-primary ${styles.homeContainer}`}>
        <Container
          fluid
          style={{
            backgroundImage: `url(${homeBanner.imageUrl})`,
          }}
          className={`p-0 ${styles.homeBannerMainContainer}`}
        >
          <HomeBanner />
        </Container>
      </Container>
      <HomeWhyNavigo {...whyNavigo} />
      <HomeRequirements requirements={requirements} />
      <HomeFAQS faqs={homeFaqs} />
      <HomeDownloadApp {...homeDownloadApp} />
    </Fragment>
  );
};

export default Home;

export const getStaticProps: GetStaticProps = async (context) => {
  return {
    props: {
      homeData: HomePageData,
    },
  };
  // ...
};
Object.assign(Home, {
  layout: GerenalLayout,
});
