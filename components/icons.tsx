import React from "react";
import { PropsWithChildren } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
type IconsProps = PropsWithChildren<{
  name: string;
}>;

const Icons = ({ name }: IconsProps) => {
  switch (name) {
    case "circle":
      return <Ionicons name="add-circle" size={38} color={"#F7CD2E"} />;
    case "cross":
      return (
        <Ionicons
          name="stop-circle"
          iconStyle="solid"
          size={38}
          color={"#3DCC77"}
        />
      );
    default:
      return <Ionicons name="pencil" size={32} color="green" />;
  }
};

export default Icons;
