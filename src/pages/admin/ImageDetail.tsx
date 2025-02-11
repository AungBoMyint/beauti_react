import { Image } from "@chakra-ui/react";
import { useLocation } from "react-router-dom";

const ImageDetail = () => {
  const location = useLocation();
  const image = location.state?.image;
  return <Image src={image} />;
};

export default ImageDetail;
