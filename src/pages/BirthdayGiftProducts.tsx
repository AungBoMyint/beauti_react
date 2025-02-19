import { Box, Flex, Grid, Image, Text } from "@chakra-ui/react";

import gift from "../assets/gift.png";
import GiftAdded from "@/components/app/GiftAdded";

import { useGetBirthdayGifts } from "@/hooks/useBirthdayGift";
import { Toaster } from "@/components/ui/toaster";

const BirthdayGiftProducts = () => {
  const { isLoading, data: items } = useGetBirthdayGifts();

  return (
    <>
      <Toaster />
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
        <Text mt={4} letterSpacing={2} fontSize={"xl"} fontWeight={"bold"}>
          Your Special Birthday Offer
        </Text>
        <Text>Choose one premium gift below</Text>
        <Flex mt={6} gap={2} direction={"column"} width={"full"} px={4}>
          <Text fontSize={"lg"} fontWeight={"medium"}>
            Available Gifts
          </Text>
          {isLoading ? (
            <Text>Loading..</Text>
          ) : (
            <Grid templateColumns={"repeat(2, 1fr)"} gap={4}>
              {items?.map((item) => {
                return (
                  <Flex
                    key={item.id}
                    direction={"column"}
                    alignItems={"center"}
                    shadow={"lg"}
                    rounded={"xl"}
                  >
                    <Image
                      minHeight={140}
                      w={"full"}
                      objectFit={"cover"}
                      flex={1}
                      src={item.image}
                      width={"full"}
                      mt={2}
                    />
                    <Box py={2} width={"full"} px={2}>
                      <Text color={"black"} fontWeight={"medium"}>
                        {item.name}
                      </Text>
                      <Text color={"gray"} fontSize={"sm"}>
                        {item.desc}
                      </Text>
                      <GiftAdded item={item} />
                    </Box>
                  </Flex>
                );
              })}
            </Grid>
          )}
        </Flex>
      </Flex>
    </>
  );
};

export default BirthdayGiftProducts;
