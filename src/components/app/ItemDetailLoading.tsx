import { Flex, Skeleton, Text } from "@chakra-ui/react";
import ImageGallery from "react-image-gallery";
import { Button } from "../ui/button";
import { CiCircleMinus, CiCirclePlus } from "react-icons/ci";

const ItemDetailLoading = () => {
  return (
    <Flex
      gap={4}
      padding={{ base: 4, md: 6 }}
      direction={"column"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <Flex
        direction={{ base: "column", md: "row" }}
        alignItems={"center"}
        spaceX={4}
        spaceY={4}
      >
        <Skeleton>
          <ImageGallery
            showFullscreenButton={false}
            showThumbnails={true}
            showNav={false}
            showPlayButton={false}
            autoPlay={true}
            items={[
              {
                original:
                  "https://www.media.deluxbeauti.com/wp-content/uploads/2024/12/Hello-December-1.png",
                thumbnail:
                  "https://www.media.deluxbeauti.com/wp-content/uploads/2024/12/Hello-December-1.png",
              },
            ]}
          />
        </Skeleton>
        <Flex width={"full"} direction={"column"} alignItems={"start"}>
          <Skeleton>
            <Text fontSize={"sm"} fontWeight={"bold"}>
              SKINEFITS
            </Text>
          </Skeleton>
          <Skeleton>
            <Text fontSize={"lg"} fontWeight={"bold"}>
              Cica Rescue + Aqua Balance BOGO
            </Text>
          </Skeleton>

          <Flex width={"full"} paddingTop={4} alignItems={"center"} gap={4}>
            <Skeleton>
              <CiCircleMinus size={22} />
            </Skeleton>
            <Skeleton>
              <Text>1</Text>
            </Skeleton>
            <Skeleton>
              <CiCirclePlus size={22} />
            </Skeleton>
            <Skeleton>
              <Button
                variant={"solid"}
                bg={{ base: "black", _dark: "white" }}
                color={{ base: "white", _dark: "black" }}
                paddingX={2}
                paddingY={0}
                size={"sm"}
              >
                Add To Cart
              </Button>
            </Skeleton>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default ItemDetailLoading;
