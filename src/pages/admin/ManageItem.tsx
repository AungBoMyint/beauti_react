import { useDeleteItem, useItems } from "@/hooks/useItem";
import { MdDeleteOutline } from "react-icons/md";
import { RiEditBoxLine } from "react-icons/ri";

import { Card, Text, Image, Flex, Box, Kbd, Input } from "@chakra-ui/react";
import {
  LeadingActions,
  SwipeableList,
  SwipeableListItem,
  SwipeAction,
  TrailingActions,
  Type as ListType,
} from "react-swipeable-list";
import "react-swipeable-list/dist/styles.css";
import "./WithTwoAction.css";
import { InputGroup } from "@/components/ui/input-group";
import { LuSearch } from "react-icons/lu";
import { useEffect, useMemo, useState } from "react";
import Item from "@/entity/Item";
import debounce from "lodash.debounce";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { toaster } from "@/components/ui/toaster";

const ManageItem = () => {
  const { isLoading, data, isError } = useItems();
  const [items, setItems] = useState<Item[]>([]);
  const [searchItems, setSearchItems] = useState<Item[] | undefined>();
  const navigate = useNavigate();
  useEffect(() => {
    if (data) setItems(data);
  }, [data]);
  const queryClient = useQueryClient();
  const onSuccess = () => {
    toaster.create({
      title: `Product is deleted!`,
      type: "success",
    });
    queryClient.invalidateQueries({ queryKey: ["items"] });
  };
  const handleDelete = useDeleteItem(onSuccess);
  const handleSearch = /* useMemo(
    () =>
       */ debounce((event: React.ChangeEvent<HTMLInputElement>) => {
    const searchInput = event.target.value?.toLowerCase();
    const searchResult = items?.filter((item) =>
      item.name?.toLowerCase()?.includes(searchInput)
    );
    setSearchItems(searchResult);
  }, 500);
  /* []
  ) */ if (isLoading) {
    return <Text>Loading.......</Text>;
  }

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
        <Text>Manage Items</Text>
      </Flex>
      <Box height={"75px"}></Box>
      <Box mx={4}>
        <InputGroup
          flex="1"
          width={"full"}
          mb={4}
          startElement={<LuSearch size={20} />}
          //endElement={<Kbd>⌘K</Kbd>}
        >
          <Input
            onChange={(e) => handleSearch(e)}
            focusRing={"none"}
            css={{
              "--error-color": "none",
              "--focus-color": "none",
            }}
            borderColor={"gray.500"}
            border={"solid"}
            placeholder="Search contacts"
          />
        </InputGroup>
      </Box>
      <SwipeableList fullSwipe={false} type={ListType.IOS}>
        {(searchItems ?? items)?.map((item) => {
          return (
            <SwipeableListItem
              key={item.id}
              trailingActions={
                <TrailingActions>
                  <SwipeAction
                    onClick={() => console.info("swipe action triggered")}
                  >
                    <Box
                      direction={"column"}
                      alignContent={"center"}
                      justifyItems={"center"}
                      bg={"green.500"}
                      my={2}
                      cursor={"pointer"}
                      onClick={() =>
                        navigate("/upload-item", { state: { item: item } })
                      }
                    >
                      <RiEditBoxLine color="white" size={30} />
                      <Text fontWeight={"bold"} color={"white"} fontSize={"xs"}>
                        Edit
                      </Text>
                    </Box>
                  </SwipeAction>
                  <SwipeAction
                    destructive={true}
                    onClick={() => console.info("swipe action triggered")}
                  >
                    <Box
                      direction={"column"}
                      alignContent={"center"}
                      justifyItems={"center"}
                      bg={"red.600"}
                      my={2}
                      cursor={"pointer"}
                      onClick={() => handleDelete.mutate(item.id)}
                    >
                      <MdDeleteOutline color="white" size={30} />
                      <Text fontWeight={"bold"} color={"white"} fontSize={"xs"}>
                        Delete
                      </Text>
                    </Box>
                  </SwipeAction>
                </TrailingActions>
              }
            >
              <Card.Root
                width={"full"}
                height={"h-fit"}
                maxHeight={200}
                overflow="hidden"
                size={"lg"}
                variant={"elevated"}
                rounded={"xl"}
                my={2}
                mx={4}
              >
                <Flex>
                  <Image
                    className="pointer-events-none max-h-[100px] max-w-[200px]"
                    src={item?.photo1 ?? ""}
                    alt={`${item.name}'s image`}
                  />
                  <Card.Body padding={2}>
                    <Card.Description color={"black"} fontWeight={"medium"}>
                      <Text lineClamp="2">{item.name}</Text>
                    </Card.Description>
                    <Text
                      fontWeight="medium"
                      letterSpacing="tight"
                      mt="2"
                      maxLines={1}
                    >
                      {item.requirePoint && item.requirePoint > 0 ? (
                        <>{item.requirePoint} Points</>
                      ) : (
                        <>
                          {item.discountPrice && item.discountPrice > 0
                            ? item.discountPrice
                            : item.price}{" "}
                          Kyats
                        </>
                      )}
                    </Text>
                  </Card.Body>
                </Flex>
              </Card.Root>
            </SwipeableListItem>
          );
        })}
      </SwipeableList>
    </Box>
  );
};

export default ManageItem;
