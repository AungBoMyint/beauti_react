import { Box, Button, Center, Flex, Grid, Image, Text } from "@chakra-ui/react";
import { useWindowSize } from "react-use";
import Confetti from "react-confetti";
import gift from "../assets/gift.png";
import GiftAdded from "@/components/app/GiftAdded";
import birthdayGift from "../assets/birthday.svg";
import { IoCheckmarkCircleSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import useCart from "@/hooks/useCart";
import { useGetBirthdayGifts } from "@/hooks/useBirthdayGift";
import authStore from "@/hooks/authStore";

const BirthdayGiftProducts = () => {
  const navigate = useNavigate();
  const { width, height } = useWindowSize();
  const addItem = useCart.getState().addItem;
  const { isLoading, data: items } = useGetBirthdayGifts();
  const setUser = authStore.getState().setUser;
  const currentUser = authStore.getState().currentUser;
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
                      <GiftAdded
                        trigger={
                          <Button
                            onClick={() => {
                              addItem({
                                advertisementID: "",
                                brandID: "",
                                brandName: "",
                                category: [],
                                color: "",
                                comment: null,
                                dateTime: "",
                                deliveryTime: null,
                                description: item.desc,
                                discountPrice: null,
                                howToUse: null,
                                id: item.id,
                                ingredients: null,
                                love: null,
                                name: item.name,
                                originalPrice: 0,
                                originalQuantity: 0,
                                photo1: item.image,
                                photo2: null,
                                photo3: null,
                                price: 0,
                                remainQuantity: 0,
                                requirePoint: null,
                                reviewCount: null,
                                scheduleSale: null,
                                size: null,
                                status: null,
                                tags: null,
                                isGift: true,
                              });
                              setUser!({
                                ...currentUser!,
                                claimed: [
                                  new Date().getFullYear().toString(),
                                  ...(currentUser?.claimed ?? []),
                                ],
                              });
                            }}
                            width={"full"}
                            variant={"outline"}
                            border={"solid"}
                            borderColor={"gold"}
                            color={"gold"}
                            rounded={"lg"}
                            fontWeight={"medium"}
                            mt={2}
                          >
                            Claim
                          </Button>
                        }
                        content={
                          <>
                            <Confetti
                              tweenDuration={100}
                              width={width}
                              height={height}
                            />
                            <Box justifySelf={"center"}>
                              <Center>
                                <IoCheckmarkCircleSharp
                                  color="green"
                                  size={40}
                                />
                              </Center>
                              <Center>
                                <Image src={birthdayGift} />
                              </Center>
                              <Text
                                textAlign={"center"}
                                fontWeight={"bold"}
                                fontSize={"lg"}
                                mb={1}
                              >
                                Gift Added
                              </Text>
                              <Text fontSize={"md"}>
                                Your gift has been added to your cart!
                              </Text>
                              <Button
                                onClick={() => {
                                  navigate("/cart");
                                }}
                                mt={2}
                                variant={"solid"}
                                color={"white"}
                                width={"full"}
                                bg={{ base: "black", _dark: "gray.800" }}
                              >
                                Go to cart
                              </Button>
                            </Box>
                          </>
                        }
                      />
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
