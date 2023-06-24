import React, { memo, useId } from "react";
import { Button } from "react-bootstrap";
import { FaPaperclip } from "react-icons/fa";

type Props = {
  name: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRemove?: (name: string) => void;
  value?: string;
  multiple: boolean;
};
const Index: React.FC<Props> = ({
  name,
  onChange,
  value,
  onRemove,
  multiple,
}) => {
  const id = useId();
  if (value) {
    return (
      <Button onClick={() => onRemove?.(name)} variant="outline-danger py-0">
        <FaPaperclip />
        <span className="mx-1">Remove file&apos;s</span>
      </Button>
    );
  }
  return (
    <div className={"navigo-file-box btn  py-0 mx-1 btn-outline-secondary"}>
      <input
        name={name}
        type="file"
        onChange={onChange}
        hidden
        multiple={multiple}
        id={"file-selection" + id}
      />

      <label
        style={{
          cursor: "pointer",
        }}
        htmlFor={"file-selection" + id}
      >
        <FaPaperclip />
        <span className="mx-1">Attach file&apos;s</span>
      </label>
    </div>
  );
};

export default memo(Index);
