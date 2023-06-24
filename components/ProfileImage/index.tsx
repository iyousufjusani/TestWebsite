import React, { memo, useState } from "react";
import { Col, Row } from "react-bootstrap";

import { UserOutlined } from "@ant-design/icons";
import { Avatar, Button, Spin } from "antd";
import { useAppDispatch, useAppSelector } from "../../hooks";
import {
  removeProfileImage,
  uploadProfileImage,
} from "../../redux/auth/action";

type Props = {};
const Index: React.FC<Props> = () => {
  const [Loader, setLoader] = useState(false);
  const { user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const updateImage = (e: React.FormEvent<HTMLInputElement>) => {
    setLoader(true);
    const target = e.target as HTMLInputElement;

    const file = target.files?.[0];
    if (!file) return;
    dispatch(uploadProfileImage(file, stopLoader));
  };
  const stopLoader = () => {
    setLoader(false);
  };

  const removeImage = () => {
    setLoader(true);
    dispatch(removeProfileImage(stopLoader));
  };

  return (
    <Col lg={12}>
      <Row className="gap-2 flex flex-column justify-content-center">
        <Col lg={12} className=" d-flex  justify-content-center">
          <Spin spinning={Loader}>
            <Avatar
              size={100}
              src={user?.profileImage}
              icon={<UserOutlined />}
            />
          </Spin>
        </Col>
        <Col
          className="d-flex align-items-baseline justify-content-center gap-2 "
          lg={12}
        >
          <div>
            <input
              type="file"
              id="profileimg"
              hidden
              accept="image/png, image/gif, image/jpeg"
              onChange={updateImage}
            />
            <label
              className="text-secondary"
              htmlFor="profileimg"
              style={{ cursor: "pointer", fontWeight: 400 }}
            >
              Upload image
            </label>
          </div>
          <Button
            type="link"
            className="text-danger p-0"
            style={{ cursor: "pointer", fontWeight: 400 }}
            onClick={removeImage}
          >
            Remove image
          </Button>
        </Col>
      </Row>
    </Col>
  );
};

export default memo(Index);
