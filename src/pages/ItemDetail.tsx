import { useFilterIdItem } from "@/hooks/useItem";
import { Flex, Text, Image, Box } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import ImageGallery from "react-image-gallery";
// import stylesheet if you're not already using CSS @import
import "react-image-gallery/styles/css/image-gallery.css";
import "./ItemDetail.css";
import SiteAccordion from "@/components/app/SiteAccordion";
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
      gap={2}
      padding={2}
      direction={"column"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <Text fontSize={"sm"} fontWeight={"bold"}>
        {data.brandName}
      </Text>
      <Text fontSize={"lg"} fontWeight={"bold"}>
        {data.name}
      </Text>

      <ImageGallery
        showFullscreenButton={false}
        showThumbnails={true}
        showNav={false}
        showPlayButton={false}
        autoPlay={true}
        items={images ?? []}
      />
      <Text fontSize={"lg"} fontWeight={"medium"}>
        {data.discountPrice && data.discountPrice > 0
          ? data.discountPrice
          : data.price}{" "}
        Ks
      </Text>
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
    </Flex>
  );
};

export default ItemDetail;
