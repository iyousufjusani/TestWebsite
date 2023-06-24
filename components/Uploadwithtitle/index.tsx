import { Spin } from "antd";
import React, { memo, useContext, useState, useEffect, useId } from "react";
import { FaExternalLinkAlt } from "react-icons/fa";
import { AdditionalContext } from "../../contexts/additionalContext";
import { useAppDispatch } from "../../hooks";
import { uploadAdditionalDocuments } from "../../redux/auth/action";
import NavigoUpload from "../NavigoUpload";

type Props = {
  title: string;
  label: string;
  name: string;
};

const subData = {
  vehicle_Document: 8,
  identity: 7,
  driving_License: 5,
};
const Index: React.FC<Props> = ({ title, name, label }) => {
  const dispatch = useAppDispatch();
  const { state, constants } = useContext(AdditionalContext);
  const id = useId();
  const contextDispatch = useContext(AdditionalContext).dispatch;
  const [loader, setLoader] = useState(false);
  const stopLoader = (data: any) => {
    contextDispatch({
      type: constants.UPDATE_ADDITIONAL_INFO,
      payload: { ...data, isCompleted: false },
    });
    setLoader(false);
  };

  const DataObj = state[label];

  useEffect(() => {
    if (
      subData[label] === Object.keys(DataObj || {}).length &&
      DataObj?.isCompleted === false
    ) {
      contextDispatch({
        type: constants.CHANGE_STATUS,
        payload: { label: DataObj?.name, isCompleted: true },
      });
    }
  }, [DataObj, label, constants, contextDispatch]);
  const onFileChangeHandle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;

    if (files?.length) {
      setLoader(true);
      dispatch(
        uploadAdditionalDocuments(
          { files, fileName: e.target.name },

          label,
          stopLoader
        )
      );
    }
  };

  const fileRemoveHandle = (field: string) => {
    const docId = DataObj?.id;

    contextDispatch({
      type: constants.REMOVE_ADDITIONAL_INFO,
      payload: { field, label, docId },
    });
  };

  const onFileHandler =
    (links: string[]) => (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault();

      links.forEach((link) => {
        window.open(link, "_blank");
      });
    };

  return (
    <div id={id}>
      <Spin spinning={loader}>
        <div className="d-flex align-items-center">
          <p
            style={{
              width: 250,
            }}
          >
            {title}
          </p>
          <NavigoUpload
            value={DataObj?.[name]}
            name={name}
            multiple
            onChange={onFileChangeHandle}
            onRemove={fileRemoveHandle}
          />
          {DataObj?.[name] && (
            <a
              target="_blank"
              className="mx-2"
              href="/"
              onClick={onFileHandler(DataObj?.[name])}
              rel="noreferrer"
            >
              <span className="text-primary">
                View <FaExternalLinkAlt />
              </span>
            </a>
          )}
        </div>
      </Spin>
    </div>
  );
};
export default memo(Index);
