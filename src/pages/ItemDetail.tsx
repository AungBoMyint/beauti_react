import { useFilterIdItem } from "@/hooks/useItem";
import { Flex, Text } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import ImageGallery from "react-image-gallery";
// import stylesheet if you're not already using CSS @import
import "react-image-gallery/styles/css/image-gallery.css";
import "./ItemDetail.css";
import SiteAccordion from "@/components/app/SiteAccordion";
import ItemDetailRating from "@/components/app/ItemDetailRating";
import ItemDetailReview from "@/components/app/ItemDetailReview";
import ItemDetailLoading from "@/components/app/ItemDetailLoading";
import ItemDetailPrice from "@/components/app/ItemDetailPrice";
import ItemDetailAvailableOptionsAndAddToCart from "./ItemDetailAvailableOptionsAndAddToCart";
import ScheduleSaleCountDown from "@/components/app/item/ScheduleSaleCountDown";
const ItemDetail = () => {
  const { id } = useParams();
  const { data, isLoading, error } = useFilterIdItem(id ?? "");
  if (isLoading) return <ItemDetailLoading />;
  if (!data) return <div>404 Not Found</div>;
  const pictures = [data.photo1 ?? "", data.photo2 ?? "", data.photo3 ?? ""];
  const images = pictures?.map((image) => ({
    original: image,
    thumbnail: image,
  }));

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
        <ImageGallery
          showFullscreenButton={false}
          showThumbnails={true}
          showNav={false}
          showPlayButton={false}
          autoPlay={false}
          items={images ?? []}
        />
        <Flex width={"full"} direction={"column"} alignItems={"start"}>
          <Text fontSize={"sm"} fontWeight={"bold"}>
            {data.brandName}
          </Text>
          <Text fontSize={"lg"} fontWeight={"bold"}>
            {data.name}
          </Text>
          <ItemDetailPrice item={data} />
          <ItemDetailAvailableOptionsAndAddToCart item={data} />
        </Flex>
      </Flex>
      {data?.scheduleSale && (
        <ScheduleSaleCountDown scheduleSale={data.scheduleSale!} />
      )}
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
