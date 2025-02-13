import AppDialog from "@/components/app/AppDialog";
import {
  SelectContent,
  SelectItem,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
} from "@/components/ui/select";
import { toaster } from "@/components/ui/toaster";
import Purchase from "@/entity/Purchase";
import { useUpdatePurchaseStatus } from "@/hooks/usePurchases";
import { Box, createListCollection, Flex, Table, Text } from "@chakra-ui/react";
import { useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import { IoEyeOutline } from "react-icons/io5";

interface Props {
  purchase: Purchase;
}
const OrderInformationDialog = ({ purchase }: Props) => {
  const queryClient = useQueryClient();
  const onSuccess = () => {
    //DO Someting
    toaster.create({
      title: `Purchase status is updated`,
      type: "success",
    });
    queryClient.invalidateQueries({ queryKey: ["purchases", "Cash"] });
    queryClient.invalidateQueries({ queryKey: ["purchases", "Pre"] });
  };
  const mutation = useUpdatePurchaseStatus(onSuccess);
  const handleChangeStatus = (statusValue: string[] | null[] | null) => {
    if (!statusValue) return;
    const orderStatus = parseInt(statusValue[0] ?? "-1");
    mutation.mutate({ id: purchase.id, status: orderStatus });
  };
  return (
    <AppDialog title="Order Informations" trigger={<IoEyeOutline size={30} />}>
      <Box>
        <Table.Root
          border={"solid"}
          key={"stock-table"}
          size="sm"
          variant={"line"}
        >
          {/* <Table.Header>
            <Table.Row bg={"gray.300"}>
              <Table.ColumnHeader>Code</Table.ColumnHeader>
              <Table.ColumnHeader>Name</Table.ColumnHeader>
              <Table.ColumnHeader>Total Quantity</Table.ColumnHeader>
              <Table.ColumnHeader>Remain Quantity</Table.ColumnHeader>
              <Table.ColumnHeader>Selling Price</Table.ColumnHeader>
              <Table.ColumnHeader>Selling Price Total</Table.ColumnHeader>
              <Table.ColumnHeader>Buying Price</Table.ColumnHeader>
              <Table.ColumnHeader>Buying Price Total</Table.ColumnHeader>
            </Table.Row>
          </Table.Header> */}
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
            <Table.Row key={"item-3"}>
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

                        <Flex
                          gap={2}
                          alignItems={"center"}
                          fontSize={{ base: 12 }}
                        >
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
            <Table.Row key={"item-8"}>
              <Table.Cell border={"solid"}>Change Status</Table.Cell>
              <Table.Cell border={"solid"}>
                <SelectRoot
                  rounded={"sm"}
                  px={2}
                  border={"solid"}
                  maxW={140}
                  collection={actions}
                  size="sm"
                  width="320px"
                  onValueChange={({ value }) => handleChangeStatus(value)}
                  defaultValue={["Shipped"]}
                >
                  <SelectTrigger>
                    <SelectValueText placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent zIndex={2000}>
                    {actions.items.map((movie) => (
                      <SelectItem item={movie} key={movie.value}>
                        {movie.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </SelectRoot>
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table.Root>
      </Box>
    </AppDialog>
  );
};
const actions = createListCollection({
  items: [
    { label: "New", value: -1 },
    { label: "Confirmed", value: 0 },
    { label: "Shipped", value: 1 },
    { label: "Cancelled", value: 2 },
  ],
});
export default OrderInformationDialog;
