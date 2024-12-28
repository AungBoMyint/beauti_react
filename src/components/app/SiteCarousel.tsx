import ImageGallery from "react-image-gallery";
// import stylesheet if you're not already using CSS @import
import "react-image-gallery/styles/css/image-gallery.css";
import "../../index.css";
import { UseQueryResult } from "@tanstack/react-query";
import Advertisement from "@/entity/Advertisement";
interface Props {
  query: UseQueryResult<Advertisement[], Error>;
}
const SiteCarousel = ({ query }: Props) => {
  const { data, isLoading, error } = query;
  if (isLoading) return <div>loading...</div>;
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
