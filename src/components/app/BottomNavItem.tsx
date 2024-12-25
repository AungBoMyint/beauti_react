import { Flex, Text } from "@chakra-ui/react";
import React, { ReactNode } from "react";

interface Props {
  children: ReactNode;
  label: string;
  isSelected?: boolean;
  onChange: () => void;
}
const BottomNavItem = ({
  children,
  label,
  isSelected = false,
  onChange,
}: Props) => {
  return (
    <Flex
      spaceY={0}
      gap={1}
      direction={"column"}
      alignItems={"center"}
      justifyContent={"center"}
      transition="color 0.2s ease-in"
      color={isSelected ? "primary" : "gray"}
      cursor={"pointer"}
      onClick={onChange}
    >
      {children}
      <Text
        padding={0}
        margin={0}
        fontSize={14}
        fontWeight={isSelected ? "bold" : "medium"}
      >
        {label}
      </Text>
    </Flex>
  );
};

export default BottomNavItem;
