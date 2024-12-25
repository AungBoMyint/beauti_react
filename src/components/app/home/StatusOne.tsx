import { Badge, Box, Card, Flex, Float, Image, Text } from "@chakra-ui/react";
import React from "react";
import ViewAllLabel from "../ViewAllLabel";
import ScrollX from "../ScrollX";

const StatusOne = () => {
  return (
    <Box>
      <ViewAllLabel label="BUY ONE GET ONE" action="Show More" to="#" />
      <ScrollX>
        {[1, 2, 3, 4, 5].map((item) => (
          <Card.Root
            key={item}
            width={220}
            height={"h-fit"}
            overflow="hidden"
            size={"lg"}
            variant={"elevated"}
            rounded={"xl"}
          >
            <Badge position={"absolute"} variant={"solid"} size={'md'}>
              Buy 1 Get 1
            </Badge>
            <Image
              className="pointer-events-none h-full"
              src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
              alt="Green double couch with wooden legs"
            />
            <Card.Body padding={2}>
              <Card.Title
                padding={0}
                margin={0}
                fontSize={"lg"}
                fontWeight={"medium"}
              >
                Living room Sofa
              </Card.Title>
              <Card.Description>
                This sofa is perfect for modern
              </Card.Description>
              <Text
                textStyle="xl"
                fontWeight="medium"
                letterSpacing="tight"
                mt="2"
              >
                $450
              </Text>
            </Card.Body>
          </Card.Root>
        ))}
      </ScrollX>
    </Box>
  );
};

export default StatusOne;
