import { Carousel } from "flowbite-react";
import React from "react";
import "../../index.css";
import { UseQueryResult } from "@tanstack/react-query";
import Advertisement from "@/entity/Advertisement";
import { Image } from "@chakra-ui/react";
interface Props {
  query: UseQueryResult<Advertisement[], Error>;
}
const SiteCarousel = ({ query }: Props) => {
  const { data, isLoading, error } = query;
  if (isLoading) return <div>loading...</div>;
  return (
    <div className="h-56 sm:h-64  xl:h-80 2xl:h-96">
      <Carousel leftControl=" " rightControl=" ">
        {data?.map((adv) => (
          <Image src={adv.image}></Image>
        ))}
      </Carousel>
    </div>
  );
};

export default SiteCarousel;
