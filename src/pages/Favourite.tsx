import { Grid, Card, Text, Image } from "@chakra-ui/react";

const Favourite = () => {
  return true ? (
    <></>
  ) : (
    <Grid
      templateColumns={{
        sm: "repeat(1, 1fr)",
        md: "repeat(2, 1fr)",
        lg: "repeat(3, 1fr)",
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
            padding={2}
          >
            <Card.Body padding={2}>
              <Card.Title
                padding={0}
                margin={0}
                fontSize={"lg"}
                fontWeight={"medium"}
              >
                Living room Sofa
              </Card.Title>
              <Text textStyle="lg" fontWeight="medium" letterSpacing="tight">
                $450
              </Text>
            </Card.Body>
            <Image
              className="pointer-events-none h-full w-[30%] absolute right-0 bottom-0"
              src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
              alt="Green double couch with wooden legs"
            />
          </Card.Root>
        );
      })}
    </Grid>
  );
};

export default Favourite;
