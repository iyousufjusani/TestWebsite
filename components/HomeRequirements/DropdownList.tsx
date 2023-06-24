import React, { useCallback } from "react";
import { FaChevronDown } from "react-icons/fa";
import cs from "classnames";
import { motion } from "framer-motion";
type Props = {
  requirement: {
    value: string;
    list: string[];
  };
};
function DropdownList({ requirement }: Props) {
  const { value, list } = requirement;
  const [showList, setShowList] = React.useState<boolean>(false);
  const handleToggleList = useCallback(() => {
    setShowList((prev) => !prev);
  }, []);
  return (
    <li
      style={{
        marginBottom: "10px",
      }}
    >
      {value}
      <FaChevronDown
        className={cs("chevron-down-animation", { active: showList })}
        onClick={handleToggleList}
        style={{ marginLeft: 3 }}
      />
      {showList && (
        <motion.ol initial={{ y: -10 }} animate={{ y: 0 }} type="1">
          {list?.map((val, index) => {
            return (
              <li
                key={index}
                style={{
                  listStyle: "decimal",
                  marginBottom: "10px",
                }}
              >
                {val}
              </li>
            );
          })}
        </motion.ol>
      )}
    </li>
  );
}

export default DropdownList;
