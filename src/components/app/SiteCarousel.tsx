import ImageGallery from "react-image-gallery";
// import stylesheet if you're not already using CSS @import
import "react-image-gallery/styles/css/image-gallery.css";
import "../../index.css";
import { UseQueryResult } from "@tanstack/react-query";
import Advertisement from "@/entity/Advertisement";
import { Flex, Skeleton } from "@chakra-ui/react";
import "./SiteCarousel.css";
import SimpleImageSlider from "react-simple-image-slider";

interface Props {
  query: UseQueryResult<Advertisement[], Error>;
}
const SiteCarousel = ({ query }: Props) => {
  const { data, isLoading } = query;
  if (isLoading)
    return (
      <Skeleton mt={2}>
        <ImageGallery
          showFullscreenButton={false}
          showThumbnails={false}
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
    );
  const images = data?.map(
    (item) => item.image /* ({
    original: item.image,
    thumbnail: item.image,
  }) */
  ) as string[];
  return (
    <Flex
      height={"220px"}
      width={"100vw"}
      //p={2}
      w={"full"}
      //bg={"red"}
      alignItems={"center"}
      justifyContent={"center"}
    >
      <SimpleImageSlider
        width={"92vw"}
        height={"200px"}
        images={images}
        showBullets={false}
        showNavs={false}
        autoPlay={true}
      />
    </Flex>
  );
};

export default SiteCarousel;
{
  /* <ImageGallery
      showFullscreenButton={false}
      showThumbnails={false}
      showNav={false}
      showPlayButton={false}
      autoPlay={false}
      items={images ?? []}
    /> */
}
