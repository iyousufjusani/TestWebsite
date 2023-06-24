import { NextPage } from "next";
import { Col, Container, Row } from "react-bootstrap";

import ChangePassword from "../../../components/ChangePassword";
import ProfileForm from "../../../components/ProfileForm";

import ProfileImage from "../../../components/ProfileImage";

import LoginProtection from "../../../Guards/LoginProtection";
import { useAppSelector } from "../../../hooks";

import DashboardLayout from "../../../layouts/dashboardlayout";

type Props = {};
const Profile: NextPage<Props> = () => {
  const { user } = useAppSelector((state) => state.auth);

  return (
    <Container fluid>
      <Row className="gap-3">
        <Col lg={12}>
          <h1 className="dashboard-main-heading">My Profile</h1>
        </Col>
        <Col lg={12} className="bg-white rounded-4 shadow py-5">
          <Row className="d-flex justify-content-center align-items-center flex-column gap-2">
            <Col lg={6} className="mb-3">
              <h1
                style={{
                  fontSize: "22px",
                }}
                className="text-center break-words font-medium"
              >
                Welcome{" "}
                <span>
                  {user?.name.split(" ")[0]} {user?.name.split(" ")[1]} !
                </span>
              </h1>
            </Col>

            <ProfileImage />
            <ProfileForm />
            <ChangePassword />
          </Row>
        </Col>
      </Row>
    </Container>
  );
};
export default Profile;

Object.assign(Profile, {
  pageTitle: "Profile",

  layout: DashboardLayout,
  protection: LoginProtection,
});
