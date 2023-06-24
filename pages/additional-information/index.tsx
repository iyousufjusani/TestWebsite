import { Spin } from "antd";
import { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useCallback, useContext, useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import CompleteProfileAlert from "../../modals/CompleteProfileAlert";
import Identity from "../../components/Identity";
import InfoSection from "../../components/InfoSection";
import VehicaleDocument from "../../components/VehicaleDocument";
import DrivingLicence from "../../components/drivingLicence";

import {
  AdditionalContext,
  AdditionalProvider,
} from "../../contexts/additionalContext";

import { useAppDispatch, useAppSelector } from "../../hooks";

import { toast } from "react-toastify";
import GerenalLayout from "../../layouts/GerenalLayout";
import {
  getUserAdditionalInfo,
  saveAdditionalDocuments,
  userLogout,
} from "../../redux/auth/action";
import NavigoLoading from "../../components/navigoLoading";
import theme from "../../assets/theme";
import LoginProtection from "../../Guards/LoginProtection";

type Props = {};
const AdditionalInformation: NextPage<Props> = () => {
  const { user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const onModalCloseHandle = () => {
    dispatch(
      userLogout(() => {
        setShowModal((prev) => !prev);
        router.push("/");
      })
    );
  };
  const context = useContext(AdditionalContext);
  const [terms, setTerms] = useState<boolean>(false);
  const contextDispatch = context.dispatch;
  const { constants, state } = context;
  const [saveLoading, setSaveLoading] = useState<boolean>(false);
  const [isCompleted, setCompleted] = useState<boolean>(false);
  const stopLoader = useCallback(
    (data: any[]) => {
      if (data.length > 0) {
        if (data.length === 4) {
          setCompleted(true);
        }
        data.forEach((element: any) => {
          contextDispatch({
            type: constants.SET_ADDITIONAL_INFO,
            payload: element,
          });
        });
      }
      setLoading(false);
    },
    [contextDispatch, constants]
  );
  const router = useRouter();
  useEffect(() => {
    setLoading(true);
    dispatch(getUserAdditionalInfo(stopLoader));
  }, [dispatch, stopLoader]);
  const handleSaveInformation = useCallback(() => {
    const fieldCompleted = Object.keys(state).every((e) => {
      const isComp = state[e]?.isCompleted;

      if (isComp) {
        return true;
      }
      return false;
    });

    if (!fieldCompleted) {
      toast.error("Please upload all documents");
      return;
    }
    if (!terms) {
      toast.error("Please verify terms and conditions");
      return;
    }
    setSaveLoading(true);
    dispatch(
      saveAdditionalDocuments(state, (_: any, hasError: boolean) => {
        if (hasError) {
          toast.error("Something went wrong! try again later");
        } else {
          setShowModal(true);
        }
        setSaveLoading(false);
      })
    );
  }, [state, terms, router, dispatch]);
  if (isCompleted) {
    return <div>404</div>;
  }
  return (
    <>
      <Spin spinning={loading}>
        <Container>
          <Row className="gap-2">
            <Col lg={12}>
              <h1 className="my-2 text-center my-4">
                Welcome
                <span className="text-secondary mx-1">{user?.name}</span>
              </h1>
              <p>
                Here are the steps you must follow to register your account:
              </p>
            </Col>
          </Row>

          <InfoSection title="Identity" asFor="identity">
            <Identity />
          </InfoSection>
          <InfoSection title="Driving Licence" asFor="driving_License">
            <DrivingLicence />
          </InfoSection>
          <InfoSection title="Vehicle Documents" asFor="vehicle_Document">
            <VehicaleDocument />
          </InfoSection>
          <InfoSection title="Terms and Conditions" asFor="terms">
            <Container>
              <p>
                Please read and acknowledge the following
                <Link
                  target="_blank"
                  href={`https://${process.env.NEXT_PUBLIC_WEBSITE_LINK}/terms-and-conditions`}
                >
                  <a className="text-secondary mx-1">Terms and Conditions</a>
                </Link>
              </p>
              <Form.Check
                type="checkbox"
                id="check"
                checked={terms}
                onChange={(e) => setTerms(e.target.checked)}
                label="I have read and accept terms and conditions"
                required
              />
            </Container>
          </InfoSection>
          <div className="w-100 d-lg-flex justify-content-center">
            <Button
              onClick={handleSaveInformation}
              disabled={saveLoading}
              className="bg-primary w-25"
            >
              {saveLoading ? (
                <div className=" d-flex justify-content-center algin-items-center ">
                  <NavigoLoading
                    type="bars"
                    color={theme.colors.secondary}
                    width={30}
                    height={25}
                  />
                </div>
              ) : (
                "Save Information"
              )}
            </Button>
          </div>
          {showModal && (
            <CompleteProfileAlert
              show={showModal}
              onClose={onModalCloseHandle}
            />
          )}
        </Container>
      </Spin>
    </>
  );
};

export default AdditionalInformation;

Object.assign(AdditionalInformation, {
  pageTitle: "Additional Information",
  context: AdditionalProvider,
  layout: GerenalLayout,
  protection: LoginProtection,
});
