import Purchase from "@/entity/Purchase";
import { formatPrice2, getPriceSummary } from "@/utils/fun";
import { Flex, Stack, Text } from "@chakra-ui/react";

interface Props {
  purchase: Purchase;
}
const PriceSummary = ({ purchase }: Props) => {
  const { grandTotal, subTotal, discount, deliveryFee } =
    getPriceSummary(purchase);

  return (
    <Stack spaceY={2} p={4} bg={"white"} shadow={"sm"} rounded={"md"}>
      <Text pb={2} fontWeight={"semibold"}>
        Price Summary
      </Text>
      <Stack>
        <Flex
          fontWeight={"semibold"}
          align={"center"}
          justify={"space-between"}
        >
          <Text color={"gray"}>Subtotal</Text>
          <Text>{formatPrice2(subTotal)} Ks</Text>
        </Flex>
        <Flex
          fontWeight={"semibold"}
          align={"center"}
          justify={"space-between"}
        >
          <Text color={"gray"}>Delivery Fee</Text>
          <Text>{formatPrice2(parseInt(`${deliveryFee}`))} Ks</Text>
        </Flex>
        <Flex
          fontWeight={"semibold"}
          align={"center"}
          justify={"space-between"}
          pb={2}
        >
          <Text color={"gray"}>Discount</Text>
          <Text color={"green"}>-{formatPrice2(discount)} Ks</Text>
        </Flex>
        <Flex
          fontWeight={"semibold"}
          align={"center"}
          justify={"space-between"}
          borderTop={"solid 1px"}
          borderTopColor={"gray.300"}
          pt={2}
        >
          <Text>Total</Text>
          <Text>{formatPrice2(grandTotal)} Ks</Text>
        </Flex>
      </Stack>
    </Stack>
  );
};

export default PriceSummary;
