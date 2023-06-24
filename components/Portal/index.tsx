import { AnimatePresence, motion } from "framer-motion";
import React, { memo } from "react";
import { Portal } from "react-portal";
import styles from "../../styles/Portal.module.css";

type Props = {
  children?: React.ReactNode;
  show?: boolean;
  onClose?: () => void;
};
const Index: React.FC<Props> = ({ children, onClose, show }) => {
  if (!show) {
    return null;
  }
  return (
    <Portal>
      <AnimatePresence mode="wait">
        <motion.div className={styles.portalWrapper}>
          <motion.div
            initial={{
              transform: "scale(.2)",
              opacity: 0,
            }}
            animate={{
              transform: "scale(1)",
              opacity: 1,
            }}
            exit={{
              transform: "scale(.2)",
              opacity: 0,
            }}
            transition={{
              duration: 1,
              type: "spring",
            }}
            className={styles.portalModel}
          >
            {children}
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </Portal>
  );
};

export default memo(Index);
