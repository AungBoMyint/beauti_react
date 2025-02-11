import CartItem from "@/entity/Cartitem";
import Item from "@/entity/Item";
import { Box, Button, Flex, Text } from "@chakra-ui/react";
interface Props {
  item: Item | CartItem;
}
const ItemDetailPrice = ({ item }: Props) => {
  const isScheduleSale = item?.scheduleSale
    ? new Date(item?.scheduleSale.endTime).getTime() > new Date().getTime()
    : false;
  return item.requirePoint && item.requirePoint > 0 ? (
    <Text fontSize={"lg"} fontWeight={"medium"}>
      {item.requirePoint} Points
    </Text>
  ) : isScheduleSale ? (
    <Box>
      <Text textDecoration={"line-through"}>{item.price} Ks</Text>
      <Flex alignItems={"center"} gap={2}>
        <Text fontWeight={"bold"} color={"red"}>
          {item.scheduleSale?.price} Ks
        </Text>
        <Button
          size={"sm"}
          fontWeight={"bold"}
          fontSize={12}
          height={6}
          bg={"red"}
          color={"white"}
        >
          Sale
        </Button>
      </Flex>
    </Box>
  ) : (
    <>
      {item.discountPrice && item.discountPrice > 0 ? (
        <Text fontSize={"lg"} fontWeight={"medium"}>
          {item.discountPrice} Ks
        </Text>
      ) : (
        <></>
      )}
      <Text
        fontSize={`${
          item.discountPrice && item.discountPrice > 0 ? "sm" : "lg"
        }`}
        fontWeight={"medium"}
        textDecorationLine={`${
          item.discountPrice && item.discountPrice > 0 ? "line-through" : "none"
        }`}
      >
        {item.price} Ks
      </Text>
    </>
  );
};

export default ItemDetailPrice;
