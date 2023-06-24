import { DeleteOutlined } from "@ant-design/icons";
import { Collapse, Spin } from "antd";
import Image from "next/image";
import React from "react";
import { useState } from "react";
import { memo } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { FaArrowDown, FaArrowUp, FaEdit } from "react-icons/fa";
import { useDispatch } from "react-redux";
import VehicleType from "./vehicleType";
// import VehicleModel from "../../../modals/VehicleModel";
// import { deleteDriverVehicle } from "../../../redux/rider/action";

const { Panel } = Collapse;

function Index({ vehicle }) {
  const [showUpdate, setShowUpdate] = useState(false);
  const vehicleUpdateHandler = () => {
    setShowUpdate(true);
  };
  const [loader, setLoader] = useState(false);
  const dispatch = useDispatch();
  const vehicleDeleteHandler = () => {
    if (window.confirm("Are you want to delete this vehicle")) {
      setLoader(true);
      //   dispatch(
      //     deleteDriverVehicle(vehicle.id, () => {
      //       setLoader(false);
      //     })
      //   );
    }
  };
  return (
    <Spin spinning={loader}>
      <Collapse
        expandIcon={(props) => {
          return props.isActive ? (
            <FaArrowUp style={{ color: "white" }} />
          ) : (
            <FaArrowDown style={{ color: "white" }} />
          );
        }}
        accordion
        expandIconPosition="right"
      >
        <Panel
          className={`${
            vehicle?.isActive ? "rider_mainColor" : "bg-danger"
          } rounded shadow`}
          header={
            <h1 className="text-white text-base fs-6 fw-bold capitalize">
              {vehicle?.name} ({vehicle?.isActive ? "active" : "inactive"})
            </h1>
          }
          key="1"
        >
          <Container>
            <Row>
              <Col lg={6}>
                <p>
                  Make: <span>{vehicle.make}</span>
                </p>
              </Col>
              <Col lg={6}>
                <p className="d-flex gap-2">
                  type: <VehicleType id={vehicle?.type} />
                </p>
              </Col>
              <Col lg={6}>
                <p>
                  Color: <span>{vehicle.color}</span>
                </p>
              </Col>
              <Col lg={6}>
                <p>
                  Body type: <span>{vehicle.bodyType}</span>
                </p>
              </Col>
              <Col lg={6}>
                <p>
                  Keeper name: <span>{vehicle.keeperName}</span>
                </p>
              </Col>
              <Col lg={6}>
                <p>
                  Keeper address: <span>{vehicle.keeperAddress}</span>
                </p>
              </Col>
              <Col lg={6}>
                <p>
                  Model: <span>{vehicle.model}</span>
                </p>
              </Col>
              <Col lg={6}>
                <p>
                  MOT: <span>{vehicle.mot}</span>
                </p>
              </Col>
              <Col lg={6}>
                <p>
                  MOT Expiry: <span>{vehicle.motExpiry}</span>
                </p>
              </Col>
              <Col lg={6}>
                <p>
                  Passengers: <span>{vehicle.passengers}</span>
                </p>
              </Col>
              <Col lg={6}>
                <p>
                  Registration number: <span>{vehicle.registrationNumber}</span>
                </p>
              </Col>
              <Col lg={6}>
                <p>
                  Note: <span>{vehicle.note}</span>
                </p>
              </Col>
              <Col lg={6}>
                <p>
                  Photo:
                  <Image
                    width={200}
                    height={80}
                    src={vehicle.imageUrl}
                    alt={vehicle.name}
                  />
                </p>
              </Col>
            </Row>
          </Container>
        </Panel>
      </Collapse>
    </Spin>
  );
}

export default memo(Index);
