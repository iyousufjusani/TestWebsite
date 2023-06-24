import { useRouter } from "next/router";
import React, { memo } from "react";
import { useAppSelector } from "../hooks";

interface Props {
  children: React.ReactNode;
}
const Index: React.FC<Props> = ({ children }) => {
  const router = useRouter();
  const { user } = useAppSelector((state) => state.auth);
  if (!user) {
    router.push("/signin");
  }
  return <div>{children}</div>;
};
export default memo(Index);
