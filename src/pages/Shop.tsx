import useCategories from "@/hooks/useCategories";
import { categoryDetailsItemPath, mockItems } from "@/utils/constant";
import { Card, Grid, Text, Image, Skeleton } from "@chakra-ui/react";

import { Link } from "react-router-dom";

const Shop = () => {
  const { data, isLoading } = useCategories();
  if (isLoading)
    return (
      <Grid
        templateColumns={{
          sm: "repeat(2, 1fr)",
          md: "repeat(4, 1fr)",
          lg: "repeat(5, 1fr)",
        }}
        gapX={4}
        gapY={2}
      >
        {mockItems?.map((item) => {
          return <Skeleton key={item} height={100}></Skeleton>;
        })}
      </Grid>
    );
  return (
    <Grid
      templateColumns={{
        sm: "repeat(2, 1fr)",
        md: "repeat(4, 1fr)",
        lg: "repeat(5, 1fr)",
      }}
      gapX={4}
      gapY={2}
    >
      {data?.map((item) => {
        return (
          <Link key={item.id} to={categoryDetailsItemPath + item.name}>
            <Card.Root
              overflow="hidden"
              size={"lg"}
              variant={"elevated"}
              rounded={"lg"}
              paddingBottom={4}
              paddingTop={2}
              height={100}
            >
              <Text textAlign={"center"} fontSize={"lg"} fontWeight={"bold"}>
                {item.name}
              </Text>
              <Image
                className="pointer-events-none h-18 w-20 absolute right-0 bottom-0"
                src={item.image}
                alt={`${item.name.toLowerCase()}'s image`}
              />
            </Card.Root>
          </Link>
        );
      })}
    </Grid>
  );
};

export default Shop;
