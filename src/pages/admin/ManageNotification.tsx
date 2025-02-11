import Advertisement from "@/entity/Advertisement";
import useAdvertisementOne from "@/hooks/useAdvertisementOne";
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
import useNotifications from "@/hooks/useNotification";
import NotiModel from "@/entity/Notification";
import AppDialog from "@/components/app/AppDialog";
import AddNotification from "./AddNotification";

const ManageNotification = () => {
  const navigate = useNavigate();
  const { isLoading, data, isError } = useNotifications();
  const [items, setItems] = useState<NotiModel[] | undefined>();
  useEffect(() => {
    if (data) {
      setItems(data);
    }
  }, [data]);
  const handleDelete = (id: string) => {
    setItems((pre) => pre?.filter((item) => item.id !== id));
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
        <Text>Push Notifications</Text>
      </Flex>
      {/**Notfication */}
      <AddNotification />
      <Box height={"75px"}></Box>
      <SwipeableList fullSwipe={false} type={ListType.IOS}>
        {items?.map((item) => (
          <SwipeableListItem
            key={item.id}
            trailingActions={
              <TrailingActions>
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
                    <Text fontWeight={"bold"} color={"white"} fontSize={"xs"}>
                      Delete
                    </Text>
                  </Box>
                </SwipeAction>
              </TrailingActions>
            }
          >
            <Card.Root
              key={item.id}
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
              <Card.Body padding={2}>
                <Card.Title>
                  <Text>{item.title}</Text>
                </Card.Title>
                <Card.Description color={"black"} fontWeight={"medium"}>
                  <Text lineClamp="2">{item.body}</Text>
                </Card.Description>
              </Card.Body>
            </Card.Root>
          </SwipeableListItem>
        ))}
      </SwipeableList>
    </Box>
  );
};

export default ManageNotification;
