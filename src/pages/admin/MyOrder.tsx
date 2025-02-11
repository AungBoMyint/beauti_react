import { Box, Flex, Text } from "@chakra-ui/react";
import { Tabs } from "@chakra-ui/react/tabs";
import { GiTwoCoins } from "react-icons/gi";
import { MdOutlinePayments } from "react-icons/md";
import CashOnDeli from "./CashOnDeli";
import Prepay from "./Prepay";

const MyOrder = () => {
  return (
    <Box spaceY={2} justifySelf={"center"} width={"full"}>
      <Text textAlign={"center"} fontWeight={"bold"} fontSize={"xl"}>
        အော်ဒါများ
      </Text>
      <Tabs.Root defaultValue="cash">
        <Tabs.List px={2}>
          <Tabs.Trigger
            shadow={"xl"}
            roundedTopLeft={"2xl"}
            flex={1}
            value="cash"
          >
            <Flex
              alignItems={"center"}
              gap={2}
              justifyContent={"center"}
              width={"full"}
            >
              <GiTwoCoins />
              Cash On Deli
            </Flex>
          </Tabs.Trigger>
          <Tabs.Trigger
            shadow={"xl"}
            roundedTopRight={"2xl"}
            flex={1}
            value="pre"
          >
            <Flex
              alignItems={"center"}
              gap={2}
              justifyContent={"center"}
              width={"full"}
            >
              <MdOutlinePayments />
              Prepay
            </Flex>
          </Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value="cash">
          {" "}
          <CashOnDeli />
        </Tabs.Content>
        <Tabs.Content value="pre">
          <Prepay />
        </Tabs.Content>
      </Tabs.Root>
    </Box>
  );
};

export default MyOrder;
