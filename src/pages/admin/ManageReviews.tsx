import {
  Box,
  Card,
  Flex,
  Text,
  Image,
  IconButton,
  Button,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoMdAdd } from "react-icons/io";
import Promotion from "@/entity/Promotion";
import { useReviews } from "@/hooks/useReview";

const ManageReviews = () => {
  const navigate = useNavigate();
  const { isLoading, data, isError } = useReviews();
  const [items, setItems] = useState<Promotion[]>([]);

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
        <Text>Manage Reviews</Text>
      </Flex>

      <Box height={"75px"}></Box>

      <Box mx={4}>
        {data?.map((item) => {
          return (
            <Card.Root
              key={item.id}
              width={"full"}
              height={"h-fit"}
              maxHeight={100}
              overflow="hidden"
              size={"lg"}
              variant={"elevated"}
              rounded={"xl"}
              my={2}
              px={1}
            >
              <Card.Body textAlign={"left"}>
                <Card.Description color={"black"} fontWeight={"medium"}>
                  <Flex alignItems={"start"} justifyContent={"space-between"}>
                    <Text lineClamp="2" fontWeight={"medium"}>
                      {item.reviewMessage}
                    </Text>
                    <Flex gap={2}>
                      <Button
                        px={2}
                        color={"white"}
                        bg={item.approved ? "gray.400" : "green.500"}
                        size={"sm"}
                        fontSize={12}
                        variant={"solid"}
                      >
                        {item.approved ? "Approved" : "Approve"}
                      </Button>
                      <Button
                        px={2}
                        color={"white"}
                        bg={item.verifiedPurchase ? "gray.400" : "blue.500"}
                        size={"sm"}
                        fontSize={12}
                        variant={"solid"}
                      >
                        {item.verifiedPurchase ? "Verified" : "Verify"}
                      </Button>
                    </Flex>
                  </Flex>
                </Card.Description>
                <Card.Footer padding={0}>
                  <Text fontSize={"sm"}>user: {item.user?.userName}</Text>
                </Card.Footer>
              </Card.Body>
            </Card.Root>
          );
        })}
      </Box>
    </Box>
  );
};

export default ManageReviews;
