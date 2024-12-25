import Brands from "@/components/app/home/Brands";
import Categories from "@/components/app/home/Categories";
import Rewards from "@/components/app/home/Rewards";
import StatusOne from "@/components/app/home/StatusOne";
import SiteCarousel from "@/components/app/SiteCarousel";
import { Flex } from "@chakra-ui/react";

const Home = () => {
  return (
    <Flex gap={4} direction={"column"} overflow={"hidden"}>
      <Categories></Categories>
      <SiteCarousel key={"first"} />
      <Brands />
      <StatusOne key={"first-status"} />
      <SiteCarousel key={"second"} />
      <StatusOne key={"second-status"} />
      <StatusOne key={"third-status"} />
      <Rewards />
    </Flex>
  );
};

export default Home;