import { NextPage } from "next";
import LoginProtection from "../../../Guards/LoginProtection";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { Col, Container, Row } from "react-bootstrap";
import DashboardLayout from "../../../layouts/dashboardlayout";
import { Button, Empty, Spin } from "antd";
import VehicleModel from "../../../modals/VehicleModel";
import { useEffect, useState } from "react";
import Vehicle from "../../../components/vehicle";
import { getRiderVehicles } from "../../../redux/auth/action";
type Props = {};
const Index: NextPage<Props> = () => {
  const [modalShow, setModalShow] = useState<boolean>(false);
  const [loader, setLoader] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const { vehicles } = useAppSelector((state) => state.auth);
  const addVehicleHandler = () => {
    setModalShow(true);
  };

  useEffect(() => {
    setLoader(true);
    dispatch(getRiderVehicles(() => setLoader(false)));
  }, [dispatch]);
  return (
    <Container fluid>
      <Row className="gap-2">
        <Col lg={12}>
          <h1 className="dashboard-main-heading">Vehicles</h1>
        </Col>
        <Col lg={12} className="text-end">
          <Button
            type="primary"
            onClick={addVehicleHandler}
            className="fw-bold"
          >
            Add vehicle
          </Button>
        </Col>
        <Spin spinning={loader}>
          {vehicles?.length ? (
            <Row>
              {vehicles.map((veh) => (
                <Col lg={6} key={veh.id}>
                  <Vehicle vehicle={veh} />
                </Col>
              ))}
            </Row>
          ) : (
            <Empty />
          )}
        </Spin>
      </Row>
      {modalShow && (
        <VehicleModel show={modalShow} onHide={() => setModalShow(false)} />
      )}
    </Container>
  );
};
export default Index;

Object.assign(Index, {
  pageTitle: "Vehicle",

  layout: DashboardLayout,
  protection: LoginProtection,
});
