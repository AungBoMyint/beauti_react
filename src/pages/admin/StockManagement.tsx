import { Box, Flex, Text } from "@chakra-ui/react";
import React from "react";
import StockQuantityPieChart from "./StockQuantityPieChart";

const StockManagement = () => {
  return (
    <Box>
      <Flex
        zIndex={"2000"}
        bg={"white"}
        width={"full"}
        position={"fixed"}
        justifyContent={"space-between"}
        alignItems={"center"}
        shadow={"lg"}
        px={4}
        py={4}
        fontWeight={"bold"}
        bgColor={{ base: "white", _dark: "gray.800" }}
      >
        <Text>View Stock</Text>
      </Flex>

      <Box height={"75px"}></Box>
      <StockQuantityPieChart />
    </Box>
  );
};

export default StockManagement;
