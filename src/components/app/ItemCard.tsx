import Item from "@/entity/Item";
import { itemDetailPath } from "@/utils/constant";
import { Badge, Button, Card, Text, Image, Flex } from "@chakra-ui/react";
import { Link } from "react-router-dom";
interface Props {
  item: Item;
  width?: string | undefined;
}
const ItemCard = ({ item, width }: Props) => {
  return (
    <Link key={item.id} to={itemDetailPath + item.id}>
      <Card.Root
        width={width ?? 220}
        height={"h-fit"}
        maxHeight={400}
        overflow="hidden"
        size={"lg"}
        variant={"elevated"}
        rounded={"xl"}
      >
        {item.tags &&
          item.tags.map((tag) => {
            return (
              <Badge
                key={tag}
                bg={{ _dark: "black" }}
                color={{ _dark: "white" }}
                position={"absolute"}
                variant={"solid"}
                size={"md"}
              >
                {tag}
              </Badge>
            );
          })}
        <Image
          className="pointer-events-none max-h-[180px] "
          src={item?.photo1 ?? ""}
          alt={`${item.name}'s image`}
        />
        <Card.Body padding={2}>
          <Card.Title
            padding={0}
            margin={0}
            fontSize={"lg"}
            fontWeight={"medium"}
          >
            {item.brandName}
          </Card.Title>
          <Card.Description fontWeight={"medium"}>{item.name}</Card.Description>
          <Flex mt={2} alignItems={"center"} justifyContent={"space-between"}>
            <Text
              textStyle="lg"
              fontWeight="medium"
              letterSpacing="tight"
              maxLines={1}
              fontSize={14}
            >
              {item.requirePoint && item.requirePoint > 0 ? (
                <>{item.requirePoint} Points</>
              ) : (
                <>
                  {item.discountPrice && item.discountPrice > 0
                    ? item.discountPrice
                    : item.price}{" "}
                  Kyats
                </>
              )}
            </Text>
            {/*  {item.requirePoint ? (
              item.requirePoint > 0 && (
                <Card.Footer paddingX={2} paddingBottom={2}>
                  <Button
                    size={"sm"}
                    variant="outline"
                    borderColor={"black"}
                    border={"solid"}
                    rounded={"2xl"}
                    paddingX={2}
                    paddingY={0}
                    fontSize={10}
                  >
                    Sign in to access
                  </Button>
                </Card.Footer>
              )
            ) : (
              <></>
            )} */}
          </Flex>
        </Card.Body>
      </Card.Root>
    </Link>
  );
};

export default ItemCard;
