import { Icon } from "@chakra-ui/react";
import { BsMessenger } from "react-icons/bs";

const Messenger = () => {
  return (
    <BsMessenger
      onClick={() => {
        window.open("https://m.me/deluxbeauti", "_blank");
      }}
    />
  ); /* (
    <Icon size={"lg"} color={{ base: "#1E88E5", _dark: "white" }}>
      <BsMessenger />
    </Icon>
  ); */
};

export default Messenger;
