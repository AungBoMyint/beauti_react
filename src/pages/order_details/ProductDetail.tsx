import Purchase from "@/entity/Purchase";
import PurchaseItem from "@/entity/PurchaseItem";
import { formatPrice2 } from "@/utils/fun";
import { Badge, Box, Flex, Stack, Text } from "@chakra-ui/react";

interface Props {
  purchase: Purchase;
}
const ProductDetail = ({ purchase }: Props) => {
  return (
    <Stack spaceY={2} p={4} bg={"white"} shadow={"sm"} rounded={"md"}>
      <Text fontWeight={"semibold"}>Product Details</Text>
      <Stack align={"start"} gap={4} divideY={"1px"}>
        {purchase.items.map((item, index) => {
          return (
            <Stack pt={2} key={index}>
              <Text>{item.itemName}</Text>
              <Flex gap={2}>
                {item?.isGift && (
                  <Badge variant={"solid"} width={"fit"}>
                    Birthday Gift
                  </Badge>
                )}
                {item?.size && (
                  <Badge variant={"solid"} width={"fit"}>
                    {item.size}
                  </Badge>
                )}
                <Text color={"gray.600"}>✕</Text>
                <Text color={"gray.600"}>{item.count}</Text>
              </Flex>
              {!item.isGift && (
                <Box textStyle="sm" fontWeight="medium" letterSpacing="tight">
                  <ItemPrice item={item} />
                </Box>
              )}
            </Stack>
          );
        })}
      </Stack>
      {purchase.promotionCode && (
        <Flex
          borderTopColor={"gray.200"}
          borderTopWidth={"1px"}
          align={"start"}
          justify={"space-between"}
          pt={2}
        >
          <Text color={"gray.500"} fontWeight={"semibold"}>
            {" "}
            Applied Promotion{" "}
          </Text>
          <Stack fontWeight={"semibold"} spaceY={0} gap={0}>
            <Text>{purchase.promotionCode}</Text>
            <Text>{purchase.promotionValue}</Text>
          </Stack>
        </Flex>
      )}
    </Stack>
  );
};

export default ProductDetail;

interface ItemPriceProps {
  item: PurchaseItem;
}
export const ItemPrice = ({ item }: ItemPriceProps) => {
  return item.requirePoint && item.requirePoint > 0 ? (
    <Text fontSize={"lg"} fontWeight={"medium"}>
      {item.requirePoint} Points
    </Text>
  ) : (
    <>
      <Text
        fontSize={`${
          item.discountPrice && item.discountPrice > 0 ? "sm" : "lg"
        }`}
        color={`${
          item.discountPrice && item.discountPrice > 0 ? "gray.500" : "black"
        }`}
        fontWeight={"medium"}
        textDecorationLine={`${
          item.discountPrice && item.discountPrice > 0 ? "line-through" : "none"
        }`}
      >
        {formatPrice2(item.price)} Ks
      </Text>
      {item.discountPrice && item.discountPrice > 0 ? (
        <Text fontSize={"lg"} fontWeight={"medium"}>
          {formatPrice2(item.discountPrice)} Ks
        </Text>
      ) : (
        <></>
      )}
    </>
  );
};
