import IncreaseDecreaseButtons from "@/components/app/item/IncreaseDecreaseButtons";
import Item from "@/entity/Item";
import Size from "@/entity/Size";
import useCart from "@/hooks/useCart";
import { Box, Text, Button, Flex } from "@chakra-ui/react";
import { useEffect, useState } from "react";

interface Props {
  item: Item;
}
const ItemDetailAvailableOptionsAndAddToCart = ({ item }: Props) => {
  const { addItem, isAdded } = useCart();
  const pointError = useCart((state) => state.pointError);
  const size = item.size && item.size.length > 0 ? item.size[0] : undefined;
  const [selectedSize, setSelectedSize] = useState<Size | undefined>(size);
  const alreadyAdded = isAdded(item.id);

  useEffect(() => {
    useCart.getState().setPointError(false);
  }, []);

  return (
    <>
      <Box width={"full"} paddingTop={2} spaceY={1}>
        <Text fontWeight={"medium"} fontSize={"md"}>
          Available Options
        </Text>
        {item.size?.map((size) => (
          <Button
            marginRight={2}
            size={"sm"}
            border={"1px solid"}
            padding={0}
            paddingX={2}
            onClick={() => setSelectedSize(size)}
            bg={{
              base: selectedSize?.id === size.id ? "black" : "white",
              _dark: selectedSize?.id === size.id ? "white" : "black",
            }}
            color={{
              base: selectedSize?.id === size.id ? "white" : "black",
              _dark: selectedSize?.id === size.id ? "black" : "white",
            }}
            variant={selectedSize?.id === size.id ? "solid" : "outline"}
            key={size.id}
          >
            {size.size}
          </Button>
        ))}
      </Box>
      {pointError ? <Text color={"red"}>Your point is not enough</Text> : <></>}
      <Flex width={"full"} paddingTop={4} alignItems={"center"} gap={4}>
        <IncreaseDecreaseButtons item={item} size={selectedSize} />
        <Button
          variant={"solid"}
          bg={{ base: "black", _dark: "white" }}
          color={{ base: "white", _dark: "black" }}
          paddingX={2}
          paddingY={0}
          size={"sm"}
          disabled={alreadyAdded}
          onClick={() => addItem(item, selectedSize)}
        >
          {alreadyAdded ? "Added" : "Add To Cart"}
        </Button>
      </Flex>
    </>
  );
};

export default ItemDetailAvailableOptionsAndAddToCart;
