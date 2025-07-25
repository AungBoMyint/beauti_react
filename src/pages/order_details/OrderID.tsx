import Purchase from "@/entity/Purchase";
import { orderStatusToColor, orderStatusToString } from "@/utils/fun";
import { Stack, Text, Flex, Box } from "@chakra-ui/react";
import { format } from "date-fns";
import { TbClockHour3 } from "react-icons/tb";

interface Props {
  purchase: Purchase;
}
const OrderID = ({ purchase }: Props) => {
  return (
    <Stack shadow={"sm"} rounded={"md"} bg={"white"} p={4}>
      <Flex align={"start"} justify={"space-between"}>
        <Stack spaceY={0} gap={0}>
          <Text fontWeight={"semibold"} color={"gray.500"}>
            Order ID
          </Text>
          <Text fontWeight={"semibold"}>{purchase.id}</Text>
        </Stack>
        <Box
          bg={orderStatusToColor(purchase?.orderStatus)}
          color={"white"}
          px={2}
          py={1}
          rounded={"sm"}
          height={"fit"}
        >
          {orderStatusToString(purchase?.orderStatus)}
        </Box>
      </Flex>
      <Flex gap={2} align={"center"}>
        <TbClockHour3 size={20} color="gray" />
        <Text fontWeight={"semibold"} color={"gray.500"}>
          Placed on {format(new Date(purchase.dateTime), "dd MMM yyyy")}
        </Text>
      </Flex>
    </Stack>
  );
};

export default OrderID;
