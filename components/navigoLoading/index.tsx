import { memo } from "react";
import ReactLoading, { LoadingType } from "react-loading";
type Props = {
  type?: LoadingType;
  color?: string;
  height?: number | string;
  width?: number | string;
};
const Index: React.FC<Props> = ({
  type = "spin",
  color = "black",
  height = 100,
  width = 100,
}) => {
  return (
    <ReactLoading type={type} color={color} width={width} height={height} />
  );
};

export default memo(Index);
