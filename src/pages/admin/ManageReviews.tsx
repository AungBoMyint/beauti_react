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
import {
  useApproveReview,
  useReviews,
  useVerifyReview,
} from "@/hooks/useReview";
import { toaster } from "@/components/ui/toaster";
import { useQueryClient } from "@tanstack/react-query";

const ManageReviews = () => {
  const { isLoading, data, isError, error } = useReviews();
  const queryClient = useQueryClient();
  const onApproveSuccess = () => {
    toaster.create({
      title: "Review is approved!",
      type: "success",
    });
    queryClient.invalidateQueries({ queryKey: ["reviews"] });
  };
  const onVerifySuccess = () => {
    toaster.create({
      title: "Review is verified!",
      type: "success",
    });
    queryClient.invalidateQueries({ queryKey: ["reviews"] });
  };
  const handleApprove = useApproveReview(onApproveSuccess);
  const handleVerify = useVerifyReview(onVerifySuccess);
  return isError ? (
    <Text>{error.message}</Text>
  ) : isLoading ? (
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
                        onClick={() => handleApprove.mutate(item.id)}
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
                        onClick={() => handleVerify.mutate(item.id)}
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
