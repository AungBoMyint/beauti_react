import { useFilterIdItem } from "@/hooks/useItem";
import { Flex, Text, Image, Box } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import ImageGallery from "react-image-gallery";
// import stylesheet if you're not already using CSS @import
import "react-image-gallery/styles/css/image-gallery.css";
import "./ItemDetail.css";
import SiteAccordion from "@/components/app/SiteAccordion";
import { Rating } from "@/components/ui/rating";
import ItemDetailRating from "@/components/app/ItemDetailRating";
import ItemDetailReview from "@/components/app/ItemDetailReview";
const ItemDetail = () => {
  const { id } = useParams();
  const { data, isLoading, error } = useFilterIdItem(id ?? "");
  if (isLoading) return <div>loading...</div>;
  if (!data) return <div>404 Not Found</div>;
  const pictures = [data.photo1 ?? "", data.photo2 ?? "", data.photo3 ?? ""];
  const images = pictures?.map((image) => ({
    original: image,
    thumbnail: image,
  }));
  console.log(images);
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
        alignItems={"start"}
        spaceX={4}
        spaceY={4}
      >
        <ImageGallery
          showFullscreenButton={false}
          showThumbnails={true}
          showNav={false}
          showPlayButton={false}
          autoPlay={true}
          items={images ?? []}
        />
        <Flex width={"full"} direction={"column"} alignItems={"center"}>
          <Text fontSize={"sm"} fontWeight={"bold"}>
            {data.brandName}
          </Text>
          <Text fontSize={"lg"} fontWeight={"bold"}>
            {data.name}
          </Text>
          <Text fontSize={"lg"} fontWeight={"medium"}>
            {data.discountPrice && data.discountPrice > 0
              ? data.discountPrice
              : data.price}{" "}
            Ks
          </Text>
        </Flex>
      </Flex>
      <SiteAccordion
        items={[
          {
            value: "a",
            title: "About Product",
            text: data.description,
          },
          {
            value: "b",
            title: "Ingredients",
            text: data.ingredients ?? "",
          },
          {
            value: "c",
            title: "How To Use",
            text: data.howToUse ?? "",
          },
        ]}
      />
      <ItemDetailRating productId={data.id} />
      <ItemDetailReview productId={data.id} />
    </Flex>
  );
};

export default ItemDetail;
