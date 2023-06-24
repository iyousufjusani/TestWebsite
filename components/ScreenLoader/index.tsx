import React, { memo } from "react";
import Image from "next/image";
import styles from "../../styles/Loader.module.css";
type Props = {
  src: string;
};
const Index: React.FC<Props> = ({ src }) => {
  return (
    <div className={styles.loaderConatiner}>
      <div className={styles.loaderImage}>
        <Image priority src={src} alt="boomaeats" layout="fill" />
      </div>
    </div>
  );
};

export default memo(Index);
