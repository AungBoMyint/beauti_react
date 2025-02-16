import { Box, Flex, Image, Text } from "@chakra-ui/react";
import gift from "../assets/gift.png";

const BirthdayGiftProducts = () => {
  return (
    <>
      <Flex
        position={"fixed"}
        bg={"white"}
        width={"full"}
        py={2}
        justifyContent={"center"}
      >
        <Text fontWeight={"bold"} fontSize={"md"}>
          Claim Your Birthday Gift
        </Text>
      </Flex>
      <Box height={"56px"}></Box>
      <Flex
        direction={"column"}
        alignItems={"center"}
        justifyContent={"center"}
      >
        <Image width={"200px"} height={"200px"} src={gift} />
        <Text mt={4} letterSpacing={2} fontSize={"lg"} fontWeight={"bold"}>
          Your Special Birthday Offer
        </Text>
        <Text>Choose one premium gift below</Text>
      </Flex>
    </>
  );
};

export default BirthdayGiftProducts;
