import { GetStaticProps, NextPage } from "next";
import { Container } from "react-bootstrap";
import HomeDownloadApp from "../../components/HomeDownloadApp";
import SignupBanner from "../../components/SignupBanner";

import { UserProvider } from "../../contexts/userContext";
import LogoutProtection from "../../Guards/LogoutProtection";
import GerenalLayout from "../../layouts/GerenalLayout";

import HomePageData from "../../assets/static-data/homepage";
type Props = {
  signupDownloadApp: {
    title?: string;
    playStoreUrl?: string;
    appStoreUrl?: string;
    image?: string;
  };
};

const Signup: NextPage<Props> = ({ signupDownloadApp }) => {
  return (
    <Container fluid className="p-0">
      <SignupBanner />
      <br /> <br /> <br /> <br />
      <HomeDownloadApp {...signupDownloadApp} />
    </Container>
  );
};

export default Signup;

export const getStaticProps: GetStaticProps = async (context) => {
  return {
    props: {
      signupDownloadApp: HomePageData.signupDownloadApp,
    },
  };
  // ...
};
Object.assign(Signup, {
  pageTitle: "Signup",
  context: UserProvider,
  layout: GerenalLayout,
  protection: LogoutProtection,
});
