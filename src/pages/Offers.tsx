import { useFilterCategoryItem } from "@/hooks/useItem";
import { Card, Grid, Text, Image } from "@chakra-ui/react";
import React from "react";

const Offers = () => {
  const { data, isLoading, error } = useFilterCategoryItem("Hot Sales");
  if (isLoading) return <div>loading....</div>;
  return (
    <Grid
      templateColumns={{
        sm: "repeat(1, 1fr)",
        md: "repeat(2, 1fr)",
        lg: "repeat(3, 1fr)",
      }}
      gapX={4}
      gapY={2}
    >
      {data?.map((item) => {
        return (
          <Card.Root
            key={item.id}
            overflow="hidden"
            size={"lg"}
            variant={"elevated"}
            rounded={"lg"}
            padding={2}
          >
            <Card.Body padding={2}>
              <Card.Title
                padding={0}
                margin={0}
                fontSize={"lg"}
                fontWeight={"medium"}
              >
                {item.name}
              </Card.Title>
              <Text
                textStyle="xl"
                color={"red"}
                fontWeight="medium"
                letterSpacing="tight"
              >
                {item.discountPrice} Ks
              </Text>
              <Text
                textStyle="sm"
                textDecoration={"line-through"}
                color={"gray"}
                fontWeight="medium"
                letterSpacing="tight"
              >
                {item.price} Ks
              </Text>
            </Card.Body>
            <Image
              className="pointer-events-none h-full w-[30%] absolute right-0 bottom-0"
              src={item.photo1 ?? ""}
              alt={`${item.name.toLowerCase()}'s image`}
            />
          </Card.Root>
        );
      })}
    </Grid>
  );
};

export default Offers;
