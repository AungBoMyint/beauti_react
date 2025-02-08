import CartItem from "@/entity/Cartitem";
import Item from "@/entity/Item";
import useCart from "@/hooks/useCart";
import { Flex, Text } from "@chakra-ui/react";
import React from "react";
import { CiCircleMinus, CiCirclePlus } from "react-icons/ci";

interface Props {
  item: CartItem | Item;
  size?: string;
  onAdd?: () => void;
  onRemove?: () => void;
}
const IncreaseDecreaseButtons = ({ item, size, onAdd, onRemove }: Props) => {
  const { addItem, removeItem, getCount } = useCart();

  const count = getCount(item.id);
  return (
    <Flex gap={4} alignItems={"center"}>
      <CiCircleMinus
        onClick={() => {
          removeItem(item);
          if (onRemove) onRemove();
        }}
        size={22}
      />
      <Text>{count}</Text>
      <CiCirclePlus
        onClick={() => {
          addItem(item, size);
          if (onAdd) onAdd();
        }}
        size={22}
      />
    </Flex>
  );
};

export default IncreaseDecreaseButtons;
