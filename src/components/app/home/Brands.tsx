import { Card, Flex, Image } from "@chakra-ui/react";
import ScrollX from "../ScrollX";
import ViewAllLabel from "../ViewAllLabel";
import useBrand from "@/hooks/useBrand";

const Brands = () => {
  const { data, isLoading, error } = useBrand();
  if (isLoading) return <div>loading....</div>;
  return (
    <Flex direction={"column"}>
      <ViewAllLabel label="Brands" action="View All" to="#" />
      <ScrollX>
        {data?.map((brand) => {
          return (
            <Card.Root
              key={brand.name}
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
                alt="Green double couch with wooden legs"
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
          );
        })}
      </ScrollX>
    </Flex>
  );
};

export default Brands;
