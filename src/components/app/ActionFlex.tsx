import { Card, Flex, Text } from "@chakra-ui/react";
import { ReactNode } from "react";

interface Props {
  label: string;
  children: ReactNode;
}
const ActionFlex = ({ label, children }: Props) => {
  return (
    <Card.Root
      cursor={"pointer"}
      _hover={{ base: { bg: "gray.100" }, _dark: { bg: "gray.900" } }}
      size={"lg"}
      variant={"elevated"}
      rounded={"lg"}
    >
      <Flex
        alignItems={"center"}
        justifyContent={"space-between"}
        paddingX={4}
        paddingY={3}
        position={"relative"}
      >
        <Text fontWeight={"bold"} fontSize={"sm"}>
          {label}
        </Text>
        {children}
      </Flex>
    </Card.Root>
  );
};

export default ActionFlex;
