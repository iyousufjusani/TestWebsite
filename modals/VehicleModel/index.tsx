import { Formik, FormikHelpers } from "formik";
import React, { memo, useMemo, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import Select from "react-select";
import {
  addDriverVehicle,
  getVehicleTypes,
  uploadFiles,
} from "../../redux/auth/action";

import { useEffect } from "react";

import { useAppDispatch } from "../../hooks";
import { driverVehicle } from "../../interfaces";
import addVehicleValidation from "../../validations/addVehicles";

type Props = {
  show?: boolean;
  onHide?: () => void;
};
const Index: React.FC<Props> = ({ show, onHide }) => {
  const dispatch = useAppDispatch();

  const [loader, setLoader] = useState(false);

  const submitHandle = (
    values: driverVehicle,
    helper: FormikHelpers<driverVehicle>
  ) => {
    dispatch(
      addDriverVehicle(values, () => {
        helper.setSubmitting(false);
        onHide?.();
      })
    );
  };
  const [fetching, setFetching] = useState(false);
  const [vehicleTypes, setVehicleTypes] = useState<any[]>([]);
  const vehicleTypesOption = useMemo(() => {
    return vehicleTypes.map((type) => {
      return {
        label: type.name,
        value: type.id,
      };
    });
  }, [vehicleTypes]);
  useEffect(() => {
    setFetching(true);
    dispatch(
      getVehicleTypes((data: any) => {
        setVehicleTypes(data);
        setFetching(false);
      })
    );
  }, [dispatch]);
  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title
          id="contained-modal-title-vcenter"
          className="capitalize fs-6"
        >
          Add new car
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          initialValues={{
            name: "",
            type: "",
            imageUrl: "",
            registrationNumber: "",
            mot: "",
            motExpiry: "",
            make: "",
            model: "",
            color: "",
            bodyType: "",
            passengers: 1,
            keeperName: "",
            keeperAddress: "",
            note: "",
          }}
          validationSchema={addVehicleValidation}
          onSubmit={submitHandle}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
            setFieldValue,
            /* and other goodies */
          }) => (
            <Form
              className=" mx-auto d-flex flex-column gap-2 "
              onSubmit={handleSubmit}
            >
              <div className="d-flex gap-3 ">
                <Form.Group className="w-50" controlId="formBasicName">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Name"
                    name="name"
                    value={values.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.name && touched.name && (
                    <span
                      className="w-100 text-danger text-start"
                      style={{ fontSize: "12px" }}
                    >
                      {errors.name}
                    </span>
                  )}
                </Form.Group>
                <Form.Group className="w-50" controlId="formBasicemail">
                  <Form.Label>Type</Form.Label>

                  <Select
                    placeholder="Select type"
                    isLoading={fetching}
                    className="basic-single"
                    classNamePrefix="select"
                    onChange={(e) => {
                      setFieldValue("type", e?.value);
                    }}
                    isSearchable={true}
                    name="type"
                    value={vehicleTypesOption.find(
                      (e) => e.value === values.type
                    )}
                    options={vehicleTypesOption}
                  />
                  {errors.type && touched.type && (
                    <span
                      className="w-100 text-danger text-start"
                      style={{ fontSize: "12px" }}
                    >
                      {errors.type}
                    </span>
                  )}
                </Form.Group>
              </div>
              <div className="d-flex gap-3 ">
                <Form.Group className="w-50" controlId="formBasicemail">
                  <Form.Label>Image</Form.Label>

                  <Form.Control
                    type="file"
                    multiple={false}
                    placeholder="Enter image"
                    name="imageUrl"
                    disabled={loader}
                    accept="image/png, image/jpeg"
                    onChange={(e: any) => {
                      setLoader(true);
                      dispatch(
                        uploadFiles(e.target.files, (img: string[]) => {
                          setFieldValue("imageUrl", img[0]);
                          setLoader(false);
                        })
                      );
                    }}
                  />

                  {errors.imageUrl && touched.imageUrl && (
                    <span
                      className="w-100 text-danger text-start"
                      style={{ fontSize: "12px" }}
                    >
                      {errors.imageUrl}
                    </span>
                  )}
                </Form.Group>
                <Form.Group className="w-50" controlId="formBasicemail">
                  <Form.Label>Registration number</Form.Label>

                  <Form.Control
                    type="text"
                    placeholder="Enter Registration number"
                    name="registrationNumber"
                    value={values.registrationNumber}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />

                  {errors.registrationNumber && touched.registrationNumber && (
                    <span
                      className="w-100 text-danger text-start"
                      style={{ fontSize: "12px" }}
                    >
                      {errors.registrationNumber}
                    </span>
                  )}
                </Form.Group>
              </div>
              <div className="d-flex gap-3 ">
                <Form.Group className="w-50" controlId="formluggage">
                  <Form.Label>MOT</Form.Label>

                  <Form.Control
                    type="string"
                    placeholder="Enter Mot"
                    name="mot"
                    value={values.mot}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />

                  {errors.mot && touched.mot && (
                    <span
                      className="w-100 text-danger text-start"
                      style={{ fontSize: "12px" }}
                    >
                      {errors.mot}
                    </span>
                  )}
                </Form.Group>

                <Form.Group className="w-50" controlId="formluggage">
                  <Form.Label>MOT Expiry</Form.Label>

                  <Form.Control
                    type="date"
                    placeholder="Enter MOT Expiry"
                    name="motExpiry"
                    value={values.motExpiry}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />

                  {errors.motExpiry && touched.motExpiry && (
                    <span
                      className="w-100 text-danger text-start"
                      style={{ fontSize: "12px" }}
                    >
                      {errors.motExpiry}
                    </span>
                  )}
                </Form.Group>
              </div>
              <div className="d-flex gap-3 ">
                <Form.Group className="w-50" controlId="formluggage">
                  <Form.Label>Make</Form.Label>

                  <Form.Control
                    type="string"
                    placeholder="Enter Make"
                    name="make"
                    value={values.make}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />

                  {errors.make && touched.make && (
                    <span
                      className="w-100 text-danger text-start"
                      style={{ fontSize: "12px" }}
                    >
                      {errors.make}
                    </span>
                  )}
                </Form.Group>
                <Form.Group className="w-50" controlId="formluggage">
                  <Form.Label>Model</Form.Label>

                  <Form.Control
                    type="string"
                    placeholder="Enter model"
                    name="model"
                    value={values.model}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />

                  {errors.model && touched.model && (
                    <span
                      className="w-100 text-danger text-start"
                      style={{ fontSize: "12px" }}
                    >
                      {errors.model}
                    </span>
                  )}
                </Form.Group>
              </div>
              <div className="d-flex gap-3 ">
                <Form.Group className="w-50" controlId="formluggage">
                  <Form.Label>Color</Form.Label>

                  <Form.Control
                    type="string"
                    placeholder="Enter color"
                    name="color"
                    value={values.color}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />

                  {errors.color && touched.color && (
                    <span
                      className="w-100 text-danger text-start"
                      style={{ fontSize: "12px" }}
                    >
                      {errors.color}
                    </span>
                  )}
                </Form.Group>

                <Form.Group className="w-50" controlId="formluggage">
                  <Form.Label>Body type</Form.Label>

                  <Form.Control
                    type="string"
                    placeholder="Enter body type"
                    name="bodyType"
                    value={values.bodyType}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />

                  {errors.bodyType && touched.bodyType && (
                    <span
                      className="w-100 text-danger text-start"
                      style={{ fontSize: "12px" }}
                    >
                      {errors.bodyType}
                    </span>
                  )}
                </Form.Group>
              </div>
              <div className="d-flex gap-3 ">
                <Form.Group className="w-50" controlId="formluggage">
                  <Form.Label>Keeper name</Form.Label>

                  <Form.Control
                    type="string"
                    placeholder="Enter keeper name"
                    name="keeperName"
                    value={values.keeperName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />

                  {errors.keeperName && touched.keeperName && (
                    <span
                      className="w-100 text-danger text-start"
                      style={{ fontSize: "12px" }}
                    >
                      {errors.keeperName}
                    </span>
                  )}
                </Form.Group>
                <Form.Group className="w-50" controlId="formluggage">
                  <Form.Label>Keeper address</Form.Label>

                  <Form.Control
                    type="string"
                    placeholder="Enter Keeper Address"
                    name="keeperAddress"
                    value={values.keeperAddress}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />

                  {errors.keeperAddress && touched.keeperAddress && (
                    <span
                      className="w-100 text-danger text-start"
                      style={{ fontSize: "12px" }}
                    >
                      {errors.keeperAddress}
                    </span>
                  )}
                </Form.Group>
              </div>
              <div className="d-flex gap-3 ">
                <Form.Group className="w-50" controlId="formluggage">
                  <Form.Label>Passengers</Form.Label>

                  <Form.Control
                    type="string"
                    placeholder="Enter passengers"
                    name="passengers"
                    value={values.passengers}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />

                  {errors.passengers && touched.passengers && (
                    <span
                      className="w-100 text-danger text-start"
                      style={{ fontSize: "12px" }}
                    >
                      {errors.passengers}
                    </span>
                  )}
                </Form.Group>
              </div>

              <Form.Group controlId="formluggage">
                <Form.Label>Note</Form.Label>

                <Form.Control
                  as="textarea"
                  placeholder="Enter note"
                  name="note"
                  value={values.note}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />

                {errors.note && touched.note && (
                  <span
                    className="w-100 text-danger text-start"
                    style={{ fontSize: "12px" }}
                  >
                    {errors.note}
                  </span>
                )}
              </Form.Group>
              <div className="d-flex">
                <Button
                  disabled={isSubmitting || loader}
                  className="mt-3 fw-bolder text-white "
                  type="submit"
                >
                  {isSubmitting ? "Adding..." : "Add"}
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </Modal.Body>
    </Modal>
  );
};

export default memo(Index);
