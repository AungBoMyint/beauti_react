import CartItem from "@/entity/Cartitem";
import Item from "@/entity/Item";
import { Text } from "@chakra-ui/react";
interface Props {
  item: Item | CartItem;
}
const ItemDetailPrice = ({ item }: Props) => {
  return item.requirePoint && item.requirePoint > 0 ? (
    <Text fontSize={"lg"} fontWeight={"medium"}>
      {item.requirePoint} Points
    </Text>
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
