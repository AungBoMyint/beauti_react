import { Flex, Text } from "@chakra-ui/react";
import { FaSearch } from "react-icons/fa";
import { FaFacebookMessenger } from "react-icons/fa";

const TopNavBar = () => {
  return (
    <Flex
      alignItems={"center"}
      justifyContent={"space-between"}
      bg={"white"}
      padding={4}
      position={"fixed"}
      width={"full"}
      top={0}
      zIndex={2000}
    >
      <Text fontWeight={"bold"} fontSize={18}>
        DELUX BEAUTI
      </Text>
      <Flex gap={6}>
        <FaSearch size={24} />
        <FaFacebookMessenger size={24} color="#1E88E5" />
      </Flex>
    </Flex>
  );
};

export default TopNavBar;
