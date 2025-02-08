import Brands from "@/components/app/home/Brands";
import Categories from "@/components/app/home/Categories";
import SiteCarousel from "@/components/app/SiteCarousel";
import useAdvertisementOne from "@/hooks/useAdvertisementOne";
import { Flex } from "@chakra-ui/react";
import StatusList from "./StatusList";

const Home = () => {
  return (
    <Flex gap={0} direction={"column"} overflow={"hidden"}>
      <Categories key={"categories"}></Categories>
      <SiteCarousel key={"first"} query={useAdvertisementOne()} />
      <Brands key={"brands"} />
      <StatusList />
      {/*  <StatusOne key={"first-status"} />
      <SiteCarousel key={"second"} query={useAdvertisementTwo()} />
      <StatusOne key={"second-status"} />
      <StatusOne key={"third-status"} />
      <Rewards /> */}
    </Flex>
  );
};

export default Home;
