import Purchase from "@/entity/Purchase";
import { Flex, Stack, Text } from "@chakra-ui/react";
import { IoLocationOutline } from "react-icons/io5";

interface Props {
  purchase: Purchase;
}
const DeliveryInformation = ({ purchase }: Props) => {
  return (
    <Stack spaceY={2} p={4} bg={"white"} shadow={"sm"} rounded={"md"}>
      <Text pb={2} fontWeight={"semibold"}>
        Delivery Information
      </Text>
      <Flex align={"center"} gap={4}>
        <IoLocationOutline color="gray" size={26} />
        <Stack>
          <Text>
            {purchase.deliveryTownshipInfo
              ? purchase.deliveryTownshipInfo[0]
              : ""}
          </Text>
          <Text color={"gray.500"}>
            {purchase.deliveryTownshipInfo
              ? purchase.deliveryTownshipInfo[1]
              : ""}{" "}
            Ks
          </Text>
        </Stack>
      </Flex>
    </Stack>
  );
};

export default DeliveryInformation;
