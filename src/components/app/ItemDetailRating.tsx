import { Box, Flex, HStack, Text } from "@chakra-ui/react";
import { Rating } from "../ui/rating";
import useRating from "@/hooks/useRating";
import { ProgressBar, ProgressLabel, ProgressRoot } from "../ui/progress";

interface Props {
  productId: string;
}
const ItemDetailRating = ({ productId }: Props) => {
  const { data, isLoading } = useRating(productId);
  if (isLoading) return <div>loading.....</div>;
  return (
    <Flex
      direction={{ base: "column" }}
      width={"full"}
      alignItems={{ base: "center", md: "start" }}
      //justifyContent={"center"}
    >
      <Flex alignItems={"start"} justifyContent={"start"} gap={8}>
        <Flex
          direction={"column"}
          alignItems={{ base: "center", md: "start" }}
          minW={150}
        >
          <Text fontWeight={"bold"} fontSize={"md"}>
            Overall Rating
          </Text>
          <Text fontSize={"xl"} textAlign={"center"} fontWeight={"bold"}>
            {data?.rating.toFixed(1)}
          </Text>
        </Flex>
        <Box>
          <Rating
            readOnly
            colorPalette={"orange"}
            value={data?.rating}
            size="md"
          />
          <Text color={"gray.600"}>base on {data?.ratingCount} reviews</Text>
        </Box>
      </Flex>
      <Flex
        width={"full"}
        alignItems={"center"}
        justifyContent={{ base: "center", md: "start" }}
        marginTop={4}
      >
        <Flex direction={"column"} gap="2" width={300}>
          <ProgressRoot colorPalette={"orange"} value={data?.excellent}>
            <HStack gap="5">
              <ProgressLabel width={100} fontWeight={"medium"}>
                Excellent
              </ProgressLabel>
              <ProgressBar flex="1" />
            </HStack>
          </ProgressRoot>
          <ProgressRoot colorPalette={"orange"} value={data?.good}>
            <HStack gap="5">
              <ProgressLabel width={100} fontWeight={"medium"}>
                Good
              </ProgressLabel>
              <ProgressBar flex="1" />
            </HStack>
          </ProgressRoot>
          <ProgressRoot colorPalette={"orange"} value={data?.average}>
            <HStack gap="5">
              <ProgressLabel width={100} fontWeight={"medium"}>
                Average
              </ProgressLabel>
              <ProgressBar flex="1" />
            </HStack>
          </ProgressRoot>
          <ProgressRoot colorPalette={"orange"} value={data?.belowAverage}>
            <HStack gap="5">
              <ProgressLabel width={100} fontWeight={"medium"}>
                Below Average
              </ProgressLabel>
              <ProgressBar flex="1" />
            </HStack>
          </ProgressRoot>
          <ProgressRoot colorPalette={"orange"} value={data?.poor}>
            <HStack gap="5">
              <ProgressLabel width={100} fontWeight={"medium"}>
                Poor
              </ProgressLabel>
              <ProgressBar flex="1" />
            </HStack>
          </ProgressRoot>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default ItemDetailRating;
