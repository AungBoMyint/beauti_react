import { Card, Flex, Image, Skeleton, Text } from "@chakra-ui/react";
import logo from "../assets/logo.png";

const AccountLoading = () => {
  return (
    <Card.Root
      overflow="hidden"
      size={"lg"}
      variant={"elevated"}
      rounded={"lg"}
      padding={2}
    >
      <Card.Body padding={2} spaceY={2} alignSelf={"center"}>
        <Card.Title>
          <Flex justifyContent={"center"} alignItems={"center"} width={"full"}>
            <Image src={logo} width={100} height={100} />
          </Flex>
        </Card.Title>
        <Skeleton>
          <Text
            textAlign={"center"}
            textStyle="lg"
            fontWeight="bold"
            letterSpacing="tight"
            paddingTop={1}
          >
            example@gmail.com
          </Text>
        </Skeleton>
        <Skeleton>
          <Text
            textAlign={"center"}
            textStyle="md"
            fontWeight="bold"
            letterSpacing="tight"
          >
            Your points: 0
          </Text>
        </Skeleton>
      </Card.Body>
    </Card.Root>
  );
};

export default AccountLoading;
