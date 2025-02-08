import { Card, Flex, Image, Skeleton } from "@chakra-ui/react";
import ScrollX from "../ScrollX";
import ViewAllLabel from "../ViewAllLabel";
import useBrand from "@/hooks/useBrand";
import { Link } from "react-router-dom";
import { brandDetailsItemPath, mockItems } from "@/utils/constant";

const Brands = () => {
  const { data, isLoading, error } = useBrand();

  return (
    <Flex direction={"column"} mb={4}>
      <ViewAllLabel label="Brands" action="View All" to="/brands" />
      <ScrollX>
        {isLoading
          ? mockItems.map((item) => (
              <Skeleton key={item} width={140} height={140}></Skeleton>
            ))
          : data?.map((brand) => {
              return (
                <Link
                  to={brandDetailsItemPath + brand.name}
                  key={`${brand.id}-${brand.name}`}
                >
                  <Card.Root
                    width={140}
                    height={140}
                    overflow="hidden"
                    size={"lg"}
                    bg={{ base: "white", _dark: "white" }}
                    variant={"elevated"}
                    rounded={"xl"}
                  >
                    <Image
                      className="pointer-events-none h-full"
                      src={brand.image}
                      alt={`${brand.name}'s image`}
                    />
                    {/* <Card.Body padding={0}>
                <Card.Title textAlign={"center"} padding={1} margin={0}>
                  {brand.name}
                </Card.Title>
              </Card.Body> */}
                    {/* <Card.Footer gap="2">
                  <Button variant="solid">Buy now</Button>
                  <Button variant="ghost">Add to cart</Button>
                </Card.Footer> */}
                  </Card.Root>
                </Link>
              );
            })}
      </ScrollX>
    </Flex>
  );
};

export default Brands;
