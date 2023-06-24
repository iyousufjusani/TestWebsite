import { ErrorMessage, Formik, FormikHelpers, FormikProps } from "formik";
import { motion } from "framer-motion";
import { memo, useContext, useRef, useState } from "react";
import { Button, Container, Form, FormControl } from "react-bootstrap";
import theme from "../../assets/theme";
import { AdditionalContext } from "../../contexts/additionalContext";
import { useAppDispatch } from "../../hooks";
import { saveVehicleRequirments } from "../../redux/auth/action";
import { vehicleRequirementsValidation } from "../../validations";
import NavigoLoading from "../navigoLoading";
type Props = {
  label: string;
};

export type vehicleRequirmentsProps = {
  carName: string;
  carModel: string;
  allowPassengers: number;
  mediumSizeSuitcases: string;
  foldAbleSeat: boolean;
  suitcasesWithFoldableSeat: string;
  isCompleted?: boolean;
  registrationNumber: string;
};
const mediumSuitcases = [
  {
    label: "1 Large Suitcase",
    value: "1-large",
  },
  {
    label: "2 Large Suitcases",
    value: "2-large",
  },
  {
    label: "3 Large Suitcases",
    value: "3-large",
  },
  {
    label: "4 Large Suitcases",
    value: "4-large",
  },
  {
    label: "1 Medium Suitcases",
    value: "1-medium",
  },
  {
    label: "2 Medium Suitcases",
    value: "2-medium",
  },
  {
    label: "3 Medium Suitcases",
    value: "3-medium",
  },
  {
    label: "4 Medium Suitcases",
    value: "4-medium",
  },
  {
    label: "5 Medium Suitcases",
    value: "5-medium",
  },
];
const Index: React.FC<Props> = ({ label }) => {
  const { state, constants } = useContext(AdditionalContext);
  const contextDispatch = useContext(AdditionalContext).dispatch;
  const formikRef = useRef<FormikProps<vehicleRequirmentsProps>>(null);
  const DataObj = state[label];
  const docId = DataObj?.id;
  const stopLoader =
    (formikHelper: FormikHelpers<vehicleRequirmentsProps>) => (data: any) => {
      contextDispatch({
        type: constants.UPDATE_ADDITIONAL_INFO,
        payload: data,
      });

      formikHelper.setSubmitting(false);
    };
  const dispatch = useAppDispatch();
  const submitHandler = (
    values: vehicleRequirmentsProps,
    formikHelper: FormikHelpers<vehicleRequirmentsProps>
  ) => {
    dispatch(
      saveVehicleRequirments(
        { ...values, isCompleted: true },
        label,
        docId,
        stopLoader(formikHelper)
      )
    );
  };
  const [initialValues, setInitialValues] = useState<vehicleRequirmentsProps>({
    carName: "",
    carModel: "",
    allowPassengers: 0,
    mediumSizeSuitcases: "",
    foldAbleSeat: false,
    suitcasesWithFoldableSeat: "",
    registrationNumber: "",
  });

  return (
    <Container>
      <Formik
        innerRef={formikRef}
        enableReinitialize
        initialValues={initialValues}
        validationSchema={vehicleRequirementsValidation}
        onSubmit={submitHandler}
      >
        {({
          values,
          handleChange,
          handleSubmit,
          isSubmitting,
          setFieldValue,
          handleBlur,
        }) => (
          <Form
            className="d-flex flex-column justify-content-start align-items-start gap-3"
            onSubmit={handleSubmit}
          >
            <Form.Group controlId="carName">
              <Form.Label>1. What is the make of your car?</Form.Label>
              <FormControl
                type="text"
                placeholder="Enter car name"
                style={{ width: 400 }}
                name="carName"
                value={values.carName}
                onChange={handleChange}
                onBlur={handleBlur}
              />

              <ErrorMessage
                name="carName"
                component="div"
                className="error-message"
              />
            </Form.Group>
            <Form.Group controlId="carModel">
              <Form.Label>2. What is the model of your car?</Form.Label>
              <FormControl
                type="text"
                style={{ width: 400 }}
                placeholder="Enter car model"
                name="carModel"
                value={values.carModel}
                onChange={handleChange}
                onBlur={handleBlur}
              />

              <ErrorMessage
                name="carModel"
                component="div"
                className="error-message"
              />
            </Form.Group>
            <Form.Group controlId="carModel">
              <Form.Label>3. Vehicle registration number?</Form.Label>
              <FormControl
                type="text"
                style={{ width: 400 }}
                placeholder="Enter registration number"
                name="registrationNumber"
                value={values.registrationNumber}
                onChange={handleChange}
                onBlur={handleBlur}
              />

              <ErrorMessage
                name="registrationNumber"
                component="div"
                className="error-message"
              />
            </Form.Group>
            <Form.Group controlId="email">
              <Form.Label>4. How many passenger seats?</Form.Label>
              <Form.Select
                placeholder="Select number of passangers"
                name="allowPassengers"
                value={values.allowPassengers}
                style={{ width: 400 }}
                onChange={handleChange}
                onBlur={handleBlur}
              >
                <option value={0}>Please select one option</option>
                {[4, 5, 6, 7, 8, 9, 10].map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </Form.Select>

              <ErrorMessage
                name="allowPassengers"
                component="div"
                className="error-message"
              />
            </Form.Group>
            <Form.Group controlId="email">
              <Form.Label>
                5. How many suitcases can you accommodate in you boot space?
              </Form.Label>
              <Form.Select
                style={{ width: 400 }}
                placeholder="Select number of medium sized suitcases"
                name="mediumSizeSuitcases"
                value={values.mediumSizeSuitcases}
                onChange={handleChange}
                onBlur={handleBlur}
              >
                <option value={""}>Please select one option</option>
                {mediumSuitcases.map((item) => (
                  <option key={item.value} value={item.value}>
                    {item.label}
                  </option>
                ))}
              </Form.Select>
              <ErrorMessage
                name="mediumSizeSuitcases"
                component="div"
                className="error-message"
              />
            </Form.Group>

            <Form.Group controlId="email">
              <Form.Label>
                5. Can you fold the seats to accommodate luggage in your car?
              </Form.Label>
              <Form.Check
                type="radio"
                style={{ width: 400 }}
                label="Yes"
                name="foldAbleSeat"
                checked={values.foldAbleSeat}
                onChange={() => {
                  setFieldValue("foldAbleSeat", true);
                }}
                onBlur={() => {
                  setFieldValue("foldAbleSeat", true);
                }}
              />
              <Form.Check
                type="radio"
                style={{ width: 400 }}
                label="No"
                name="foldAbleSeat"
                checked={!values.foldAbleSeat}
                onChange={(e) => {
                  setFieldValue("foldAbleSeat", false);
                }}
                onBlur={(e) => {
                  setFieldValue("foldAbleSeat", false);
                }}
              />
              <ErrorMessage
                name="foldAbleSeat"
                component="div"
                className="error-message"
              />
            </Form.Group>
            {values.foldAbleSeat && (
              <motion.div
                initial={{
                  opacity: 0,
                  y: 20,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                exit={{
                  opacity: 0,
                  y: 20,
                }}
                transition={{
                  duration: 0.5,
                }}
              >
                <Form.Group controlId="suitcasesWithFoldableSeat">
                  <Form.Label>
                    6. How many maximum suitcases can you accommodate with
                    folded car seats?
                  </Form.Label>
                  <Form.Select
                    style={{ width: 400 }}
                    placeholder="Select number of suitcases"
                    name="suitcasesWithFoldableSeat"
                    value={values.suitcasesWithFoldableSeat}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  >
                    <option value="">Please select one option</option>
                    {mediumSuitcases.map((item) => (
                      <option key={item.value} value={item.value}>
                        {item.label}
                      </option>
                    ))}
                  </Form.Select>
                  <ErrorMessage
                    name="suitcasesWithFoldableSeat"
                    component="div"
                    className="error-message"
                  />
                </Form.Group>
              </motion.div>
            )}

            <Button
              variant="primary"
              type="submit"
              name="submit"
              className=" text-white "
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <div className=" d-flex justify-content-center algin-items-center ">
                  <NavigoLoading
                    type="bars"
                    color={theme.colors.secondary}
                    width={30}
                    height={25}
                  />
                </div>
              ) : (
                "Submit"
              )}
            </Button>
          </Form>
        )}
      </Formik>
    </Container>
  );
};

export default memo(Index);
