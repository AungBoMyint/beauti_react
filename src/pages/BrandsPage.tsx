import useBrand from "@/hooks/useBrand";
import { brandDetailsItemPath } from "@/utils/constant";
import { Card, Grid, Text, Image } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const BrandsPage = () => {
  const { data, isLoading } = useBrand();
  if (isLoading) return <div>loading....</div>;
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
          <Link
            to={brandDetailsItemPath + item.name}
            key={`${item.id}-${item.name}`}
          >
            <Card.Root
              key={`${item.id}-${item.name}`}
              overflow="hidden"
              size={"lg"}
              variant={"elevated"}
              rounded={"lg"}
              paddingBottom={4}
              paddingTop={2}
              minHeight={120}
            >
              <Text
                textAlign={"center"}
                fontSize={"lg"}
                fontWeight={"bold"}
                marginBottom={4}
              >
                {item.name}
              </Text>
              <Image
                className="pointer-events-none h-18 w-20 absolute right-0 bottom-0"
                src={item.image}
                alt={`${item.name?.toLowerCase()}'s image`}
              />
            </Card.Root>
          </Link>
        );
      })}
    </Grid>
  );
};

export default BrandsPage;
