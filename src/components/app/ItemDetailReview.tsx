import useReview from "@/hooks/useReview";
import { Flex, Text, Button, Textarea } from "@chakra-ui/react";
import React, { useState } from "react";
import { Rating } from "../ui/rating";
import Comment from "./Comment";
interface Props {
  productId: string;
}
const ItemDetailReview = ({ productId }: Props) => {
  const [ratingValue, setRatingValue] = useState<number>(0);
  const { data, isLoading } = useReview(productId);
  if (isLoading) return <div>loading.....</div>;
  return (
    <Flex gap={2} alignItems={"start"} direction={"column"} width={"full"}>
      <Flex
        width={"full"}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <Text fontWeight={"bold"} fontSize={"md"}>
          Review Product
        </Text>
        <Text fontSize={"sm"} fontWeight={"medium"}>
          (0 Reviews)
        </Text>
      </Flex>
      <Flex alignItems={"center"} gap={2}>
        <Rating
          value={ratingValue}
          size={"lg"}
          colorPalette={"orange"}
          onValueChange={(e) => setRatingValue(e.value)}
        />
        <Text>{ratingValue}</Text>
      </Flex>
      <Textarea
        focusRing={"none"}
        border={"1px solid"}
        padding={2}
        size={"xl"}
        placeholder="Write a review..."
      />
      <Flex width={"full"} justifyContent={"center"}>
        <Button
          variant={"solid"}
          bg={{ base: "black", _dark: "gray.800" }}
          paddingX={2}
          rounded={"xl"}
          fontWeight={"bold"}
          color={"white"}
        >
          Submit
        </Button>
      </Flex>
      {data?.map((review) => (
        <Comment key={review.id} review={review} />
      ))}
    </Flex>
  );
};

export default ItemDetailReview;
