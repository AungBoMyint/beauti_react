import { Box, Flex, Icon, Input, Text } from "@chakra-ui/react";
import { IoIosAddCircleOutline } from "react-icons/io";
import { CiCircleRemove } from "react-icons/ci";
import Size from "@/entity/Size";

interface Props {
  items: Size[];
  onRemove: (item: Size) => void;
  onAdd: () => void;
  handleInputChange: (id: string, key: string, value: string) => void;
}
const SizeInput = ({ items, onRemove, onAdd, handleInputChange }: Props) => {
  return (
    <Box spaceY={2}>
      <Flex alignItems={"center"} gap={6}>
        <Text fontWeight={"medium"} fontSize={15}>
          Add Size
        </Text>
        <IoIosAddCircleOutline size={24} onClick={() => onAdd()} />
      </Flex>
      {items?.map((size) => (
        <Flex key={size.id} gap={2} alignItems={"center"}>
          <Input
            border={"solid"}
            focusRing={"none"}
            px={2}
            defaultValue={size?.size}
            css={{
              "--error-color": "none",
              "--focus-color": "none",
            }}
            placeholder="အမျိုးအစား"
            onChange={(event) =>
              handleInputChange(size.id, "size", event.target.value)
            }
          />
          <Input
            border={"solid"}
            focusRing={"none"}
            px={2}
            css={{
              "--error-color": "none",
              "--focus-color": "none",
            }}
            defaultValue={size?.price}
            placeholder="စျေးနှုန်း"
            onChange={(event) =>
              handleInputChange(size.id, "price", event.target.value)
            }
          />

          <CiCircleRemove size={46} onClick={() => onRemove(size)} />
        </Flex>
      ))}
    </Box>
  );
};

export default SizeInput;
