import { Card, Grid, Text, Image, Skeleton } from "@chakra-ui/react";

const BrandPageLoading = () => {
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
      {[1, 2, 3, 4, 5, 6, 7]?.map((item, index) => {
        return (
          <Card.Root
            key={`${item}-${index}`}
            overflow="hidden"
            size={"lg"}
            variant={"elevated"}
            rounded={"lg"}
            paddingBottom={4}
            paddingTop={2}
            minHeight={120}
          >
            <Skeleton>
              <Text
                textAlign={"center"}
                fontSize={"lg"}
                fontWeight={"bold"}
                marginBottom={4}
              >
                {"expamle name"}
              </Text>
            </Skeleton>
            <Skeleton>
              <Image
                className="pointer-events-none h-18 w-20 absolute right-0 bottom-0"
                src={
                  "https://firebasestorage.googleapis.com/v0/b/beauti-74413.appspot.com/o/brands%2F099885f0-03c7-11ee-9dd5-eddf36c829fb?alt=media&token=3aa102e7-f0fa-402e-8a35-0c8914691a25"
                }
                alt={``}
              />
            </Skeleton>
          </Card.Root>
        );
      })}
    </Grid>
  );
};

export default BrandPageLoading;
