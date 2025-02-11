import { Flex, Text } from "@chakra-ui/react";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { ColorModeButton } from "../ui/color-mode";
import Messenger from "./Messenger";

const TopNavBar = () => {
  const navigate = useNavigate();
  return (
    <Flex
      alignItems={"center"}
      justifyContent={"space-between"}
      padding={4}
      position={"fixed"}
      width={"full"}
      bg={{ base: "white", _dark: "gray.900" }}
      top={0}
      zIndex={2000}
    >
      <Text onClick={() => navigate("/")} fontWeight={"bold"} fontSize={18}>
        DELUX BEAUTI
      </Text>
      <Flex gap={6} alignItems={"center"}>
        <FaSearch
          cursor={"pointer"}
          onClick={() => navigate("/search")}
          size={24}
        />
        <Messenger />
        <ColorModeButton />
      </Flex>
    </Flex>
  );
};

export default TopNavBar;
