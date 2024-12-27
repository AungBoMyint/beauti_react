import { Icon } from "@chakra-ui/react";
import React from "react";
import { FaFacebookMessenger } from "react-icons/fa";

const Messenger = () => {
  return (
    <Icon size={"lg"} color={{ base: "#1E88E5", _dark: "white" }}>
      <FaFacebookMessenger />
    </Icon>
  );
};

export default Messenger;
