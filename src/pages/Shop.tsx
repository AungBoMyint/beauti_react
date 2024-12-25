import { Box, Card, Grid, Text, Image } from "@chakra-ui/react";

import React from "react";

const Shop = () => {
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
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14].map((item) => {
        return (
          <Card.Root
            key={item}
            overflow="hidden"
            size={"lg"}
            variant={"elevated"}
            rounded={"lg"}
            paddingBottom={4}
            paddingTop={2}
            height={100}
          >
            <Text textAlign={'center'} fontSize={"lg"} fontWeight={"bold"}>
              Shop {item}
            </Text>
            <Image
              className="pointer-events-none h-18 w-20 absolute right-0 bottom-0"
              src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
              alt="Green double couch with wooden legs"
            />
          </Card.Root>
        );
      })}
    </Grid>
  );
};

export default Shop;
