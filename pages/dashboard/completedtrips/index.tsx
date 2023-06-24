import { NextPage } from "next";
import LoginProtection from "../../../Guards/LoginProtection";
import { useAppSelector } from "../../../hooks";

import { Col, Container, Row } from "react-bootstrap";
import DashboardLayout from "../../../layouts/dashboardlayout";
import { Empty } from "antd";
import { Tabs } from "antd";

const { TabPane } = Tabs;

type Props = {};
const Profile: NextPage<Props> = () => {
  return (
    <Container fluid>
      <Row className="gap-3">
        <Col lg={12}>
          <h1 className="dashboard-main-heading">Completed Trips</h1>
        </Col>
        <Col lg={12} className=" bg-white rounded-4 shadow h-100">
          <Tabs defaultActiveKey="1" centered>
            <TabPane tab="All Trips" key="1">
              <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
            </TabPane>
            <TabPane tab="Previous Month" key="2">
              <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
            </TabPane>
            <TabPane tab="This Month" key="3">
              <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
            </TabPane>
          </Tabs>
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
