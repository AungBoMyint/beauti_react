import Purchase from "@/entity/Purchase";
import { Box, Flex, Stack, Text } from "@chakra-ui/react";
import {
  MdOutlineEmail,
  MdOutlineHome,
  MdOutlineLocalPhone,
} from "react-icons/md";

interface Props {
  purchase: Purchase;
}
const CustomerInformation = ({ purchase }: Props) => {
  return (
    <Stack spaceY={2} p={4} bg={"white"} shadow={"sm"} rounded={"md"}>
      <Text pb={2} fontWeight={"semibold"}>
        Customer Information
      </Text>
      <Flex align={"center"} gap={4}>
        <Box>
          <MdOutlineHome color="gray" size={26} />
        </Box>
        <Stack spaceY={0} gap={1}>
          <Text>{purchase.name}</Text>
          <Text color={"gray.500"}>{purchase.address}</Text>
        </Stack>
      </Flex>
      <Flex align={"center"} gap={4}>
        <MdOutlineLocalPhone color="gray" size={26} />
        <Text color={"gray.500"}>{purchase.phone}</Text>
      </Flex>
      <Flex align={"center"} gap={4}>
        <MdOutlineEmail color="gray" size={26} />
        <Text color={"gray.500"}>{purchase.email}</Text>
      </Flex>
    </Stack>
  );
};

export default CustomerInformation;
