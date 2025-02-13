import ImageGallery from "react-image-gallery";
// import stylesheet if you're not already using CSS @import
import "react-image-gallery/styles/css/image-gallery.css";
import "../../index.css";
import { UseQueryResult } from "@tanstack/react-query";
import Advertisement from "@/entity/Advertisement";
import { Skeleton } from "@chakra-ui/react";
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
  const images = data?.map((item) => ({
    original: item.image,
    thumbnail: item.image,
  }));
  return (
    <ImageGallery
      showFullscreenButton={false}
      showThumbnails={false}
      showNav={false}
      showPlayButton={false}
      autoPlay={true}
      items={images ?? []}
    />
  );
};

export default SiteCarousel;
