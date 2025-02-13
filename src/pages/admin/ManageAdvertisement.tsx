import useAdvertisementOne, {
  useDeleteAdvertisementOne,
} from "@/hooks/useAdvertisementOne";
import { Box, Card, Flex, Text, Image } from "@chakra-ui/react";
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
import { useQueryClient } from "@tanstack/react-query";
import { toaster } from "@/components/ui/toaster";

const ManageAdvertisement = () => {
  const navigate = useNavigate();
  const { isLoading, data } = useAdvertisementOne();

  const queryClient = useQueryClient();
  const onSuccess = () => {
    toaster.create({
      title: `Advertisement is deleted`,
      type: "success",
    });
    queryClient.invalidateQueries({ queryKey: ["advertisement1"] });
  };
  const mutation = useDeleteAdvertisementOne(onSuccess);
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
        <Text>Manage Advertisements</Text>
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
        onClick={() => navigate("/upload-advertisement-one")}
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
                        navigate("/upload-advertisement-one", {
                          state: { advertisement: item },
                        })
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
                      onClick={() => mutation.mutate(item.id)}
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
                    src={item?.image ?? ""}
                    alt={`${item.description}'s image`}
                  />
                  <Card.Body padding={2}>
                    <Card.Description color={"black"} fontWeight={"medium"}>
                      <Text lineClamp="2">{item.description}</Text>
                    </Card.Description>
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

export default ManageAdvertisement;
