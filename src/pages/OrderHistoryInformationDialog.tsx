import AppDialog from "@/components/app/AppDialog";
import Purchase from "@/entity/Purchase";
import { Box, Flex, Table, Text } from "@chakra-ui/react";
import { format } from "date-fns";
import { IoEyeOutline } from "react-icons/io5";

interface Props {
  purchase: Purchase;
}
const OrderHistoryInformationDialog = ({ purchase }: Props) => {
  return (
    <AppDialog title="Order Informations" trigger={<IoEyeOutline size={30} />}>
      <Box>
        <Table.Root
          border={"solid"}
          key={"stock-table"}
          size="sm"
          variant={"line"}
        >
          <Table.Body>
            <Table.Row key={"item-1"}>
              <Table.Cell border={"solid"}>Order ID</Table.Cell>
              <Table.Cell border={"solid"}>{purchase?.id}</Table.Cell>
            </Table.Row>
            <Table.Row key={"item-2"}>
              <Table.Cell border={"solid"}>Date of Purchase</Table.Cell>
              <Table.Cell border={"solid"}>
                {format(new Date(purchase.dateTime), "dd/MM/yy")}
              </Table.Cell>
            </Table.Row>
            {/*  <Table.Row key={"item-3"}>
              <Table.Cell border={"solid"}>Name</Table.Cell>
              <Table.Cell border={"solid"}>{purchase?.name}</Table.Cell>
            </Table.Row>
            <Table.Row key={"item-4"}>
              <Table.Cell border={"solid"}>Phone</Table.Cell>
              <Table.Cell border={"solid"}>{purchase?.phone}</Table.Cell>
            </Table.Row>
            <Table.Row key={"item-5"}>
              <Table.Cell border={"solid"}> Email</Table.Cell>
              <Table.Cell border={"solid"}>{purchase?.email}</Table.Cell>
            </Table.Row> */}
            <Table.Row key={"item-3"}>
              <Table.Cell border={"solid"}>Shipping</Table.Cell>
              <Table.Cell border={"solid"} fontWeight={"bold"}>
                {purchase?.deliveryTownshipInfo?.reduce(
                  (p, c) => `${p} ${c} `,
                  ""
                )}{" "}
                Ks
              </Table.Cell>
            </Table.Row>
            <Table.Row key={"item-6"}>
              <Table.Cell border={"solid"}>Address</Table.Cell>
              <Table.Cell border={"solid"}>{purchase?.address}</Table.Cell>
            </Table.Row>
            <Table.Row key={"item-7"}>
              <Table.Cell border={"solid"}>Products</Table.Cell>
              <Table.Cell border={"solid"}>
                <Flex
                  direction={"column"}
                  divideY={"1.5px"}
                  divideColor={"black"}
                  gap={2}
                >
                  {purchase?.items?.map((item, index) => {
                    return (
                      <Flex
                        gap={1}
                        direction={"column"}
                        key={item.id}
                        pt={index !== 0 ? 2 : 0}
                      >
                        <Text>{item.itemName}</Text>

                        <Flex gap={2} alignItems={"center"}>
                          <Box
                            px={2}
                            rounded={"xs"}
                            color={"white"}
                            bg={{ base: "black", _dark: "gray.800" }}
                          >
                            {item.size}
                          </Box>
                          <Text fontWeight={"bold"}>{item.price} Ks</Text>
                          <Text fontWeight={"bold"}>✕</Text>
                          <Text fontWeight={"bold"}>{item.count}</Text>
                        </Flex>
                      </Flex>
                    );
                  })}
                </Flex>
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table.Root>
      </Box>
    </AppDialog>
  );
};

export default OrderHistoryInformationDialog;
