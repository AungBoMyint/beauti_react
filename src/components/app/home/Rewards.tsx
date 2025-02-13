import { Box, Button, Card, Image, Text } from "@chakra-ui/react";
import ViewAllLabel from "../ViewAllLabel";
import ScrollX from "../ScrollX";

const Rewards = () => {
  return (
    <Box>
      <ViewAllLabel label="Your Rewards" action="Show More" to="#" />
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
              <Text
                textStyle="xl"
                fontWeight="medium"
                letterSpacing="tight"
                mt="2"
              >
                300 Points
              </Text>
            </Card.Body>
            <Card.Footer paddingX={2} paddingBottom={2}>
              <Button
                size={"sm"}
                variant="outline"
                borderColor={"black"}
                border={"solid"}
                rounded={"2xl"}
                paddingX={2}
                paddingY={0}
                fontSize={"xs"}
              >
                Sign in to access
              </Button>
            </Card.Footer>
          </Card.Root>
        ))}
      </ScrollX>
    </Box>
  );
};

export default Rewards;
