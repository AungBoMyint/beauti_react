import { usePurchaseHistory } from "@/hooks/usePurchases";
import { orderStatusToColor, orderStatusToString } from "@/utils/fun";
import { Box, Card, Flex, Text } from "@chakra-ui/react";
import { format } from "date-fns/format";
import React from "react";
import OrderHistoryInformationDialog from "./OrderHistoryInformationDialog";

const OrderHistory = () => {
  const { isLoading, data } = usePurchaseHistory(
    "AzVieIXgu8bElHC3hO6CrnBrrbl1"
  );
  if (isLoading) {
    return <Text>Loading....</Text>;
  }
  return (
    <>
      <Flex
        zIndex={"2000"}
        bg={"white"}
        width={"full"}
        position={"fixed"}
        justifyContent={"space-between"}
        alignItems={"center"}
        shadow={"lg"}
        px={4}
        py={4}
        fontWeight={"bold"}
        bgColor={{ base: "white", _dark: "gray.800" }}
      >
        <Text>Order History</Text>
      </Flex>
      <Box spaceY={4} justifySelf={"center"} width={"full"}>
        <Box height={"55px"}></Box>
        {data?.map((purchase) => {
          return (
            <Card.Root
              height={"h-fit"}
              maxHeight={200}
              overflow="hidden"
              size={"lg"}
              variant={"elevated"}
              rounded={"xl"}
              mx={4}
            >
              <Card.Body padding={2} px={4}>
                <Card.Title
                  padding={0}
                  margin={0}
                  fontSize={"md"}
                  fontWeight={"bold"}
                >
                  ORDER ID: {purchase.id}
                </Card.Title>
                <Card.Description fontWeight={"bold"} padding={0} margin={0}>
                  <Flex alignItems={"center"} justify={"space-between"}>
                    <Text>Total: {purchase.total} Ks</Text>
                    <Flex alignItems={"center"} gap={4}>
                      <Box
                        bg={orderStatusToColor(purchase?.orderStatus)}
                        color={"white"}
                        px={2}
                        py={1}
                        rounded={"sm"}
                      >
                        {orderStatusToString(purchase?.orderStatus)}
                      </Box>
                      <OrderHistoryInformationDialog purchase={purchase} />
                    </Flex>
                  </Flex>
                </Card.Description>
                <Card.Footer
                  fontSize={"sm"}
                  fontWeight={"bold"}
                  color={"gray.600"}
                  padding={0}
                  margin={0}
                >
                  {format(new Date(purchase.dateTime), "dd/MM/yy")}
                </Card.Footer>
              </Card.Body>
            </Card.Root>
          );
        })}
      </Box>
    </>
  );
};

export default OrderHistory;
