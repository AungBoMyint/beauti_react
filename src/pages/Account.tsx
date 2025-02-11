import { Box, Card, Flex, Image, Text } from "@chakra-ui/react";
import logo from "../assets/logo.png";
import AdminPage from "./AdminPage";
import UserPage from "./UserPage";
import authStore from "@/hooks/authStore";

const Account = () => {
  const user = authStore((state) => state.currentUser);
  const isAdmin = user?.status ?? 0 > 0;
  return (
    <Box spaceY={4}>
      <Card.Root
        overflow="hidden"
        size={"lg"}
        variant={"elevated"}
        rounded={"lg"}
        padding={2}
      >
        <Card.Body padding={2} spaceY={2} alignSelf={"center"}>
          <Card.Title>
            <Flex
              justifyContent={"center"}
              alignItems={"center"}
              width={"full"}
            >
              <Image src={logo} width={100} height={100} />
            </Flex>
          </Card.Title>
          <Text
            textAlign={"center"}
            textStyle="lg"
            fontWeight="bold"
            letterSpacing="tight"
            paddingTop={1}
          >
            testfromdeveloper@gmail.com
          </Text>
          <Text
            textAlign={"center"}
            textStyle="md"
            fontWeight="bold"
            letterSpacing="tight"
          >
            Your points: 0
          </Text>
        </Card.Body>
      </Card.Root>
      {isAdmin ? <AdminPage /> : <UserPage />}
    </Box>
  );
};

export default Account;
