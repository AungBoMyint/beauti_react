import { Card, Flex, Image } from "@chakra-ui/react";
import ScrollX from "../ScrollX";
import ViewAllLabel from "../ViewAllLabel";
const brands = [
  { name: "abib", image: "" },
  { name: "a;lsdf" },
  { name: "a;lsdf2" },
  { name: "dksk" },
  { name: "2esd" },
  { name: "343" },
];
const Brands = () => {
  return (
    <Flex direction={'column'}>
      <ViewAllLabel label="Brands" action="View All" to="#" />
      <ScrollX>
        {brands.map((brand) => {
          return (
            <Card.Root
              key={brand.name}
              width={140}
              height={140}
              overflow="hidden"
              size={"lg"}
              variant={"elevated"}
              rounded={"xl"}
            >
              <Image
                className="pointer-events-none h-full"
                src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
                alt="Green double couch with wooden legs"
              />
              <Card.Body padding={0}>
                <Card.Title textAlign={"center"} padding={0} margin={0}>
                  Living room Sofa
                </Card.Title>
              </Card.Body>
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
