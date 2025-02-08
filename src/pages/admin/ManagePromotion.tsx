import { Box, Card, Flex, Text, Image, IconButton } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { MdDeleteOutline } from "react-icons/md";
import { RiEditBoxLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { IoMdAdd } from "react-icons/io";

import {
  SwipeableList,
  SwipeableListItem,
  SwipeAction,
  TrailingActions,
  Type as ListType,
} from "react-swipeable-list";
import { usePromotion } from "@/hooks/usePromotion";
import Promotion from "@/entity/Promotion";

const ManagePromotion = () => {
  const navigate = useNavigate();
  const { isLoading, data, isError } = usePromotion();
  const [items, setItems] = useState<Promotion[]>([]);
  useEffect(() => {
    if (data) {
      setItems(data);
    }
  }, [data]);
  const handleDelete = (id: string) => {
    setItems((pre) => pre.filter((i) => i.id !== id));
  };
  return isLoading ? (
    <Text>Loading...</Text>
  ) : (
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
        <Text>Manage Promotion</Text>
      </Flex>
      <Box
        zIndex={"2000"}
        position={"fixed"}
        bottom={4}
        right={4}
        justifyContent={"space-between"}
        alignItems={"center"}
        shadow={"xl"}
        rounded={"full"}
        bgColor={"black"}
        p={2}
        cursor={"pointer"}
        onClick={() => navigate("/upload-promotion")}
      >
        <IoMdAdd color="white" size={26} />
      </Box>
      <Box height={"75px"}></Box>

      <SwipeableList fullSwipe={false} type={ListType.IOS}>
        {data?.map((item) => {
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
                        navigate("/upload-promotion", {
                          state: { promotion: item },
                        })
                      }
                    >
                      <RiEditBoxLine color="white" size={30} />
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
                      onClick={() => handleDelete(item.id)}
                    >
                      <MdDeleteOutline color="white" size={30} />
                    </Box>
                  </SwipeAction>
                </TrailingActions>
              }
            >
              <Card.Root
                width={"full"}
                height={"h-fit"}
                maxHeight={100}
                overflow="hidden"
                size={"lg"}
                variant={"elevated"}
                rounded={"xl"}
                my={2}
                mx={4}
                px={2}
              >
                <Flex alignItems={"center"} justify={"space-between"}>
                  <Card.Body padding={2}>
                    <Card.Description color={"black"} fontWeight={"medium"}>
                      <Text lineClamp="2">{item.code}</Text>
                    </Card.Description>
                  </Card.Body>
                  <Text lineClamp="2">{item.promotionValue}</Text>
                </Flex>
              </Card.Root>
            </SwipeableListItem>
          );
        })}
      </SwipeableList>
    </Box>
  );
};

export default ManagePromotion;
