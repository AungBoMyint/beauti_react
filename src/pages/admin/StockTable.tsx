import { useItems } from "@/hooks/useItem";
import { Table } from "@chakra-ui/react/table";
import { Box, Text } from "@chakra-ui/react";
import React from "react";

const StockTable = () => {
  const { isLoading, data } = useItems();
  if (isLoading) {
    return <Text>loading..</Text>;
  }
  return (
    <Box overflow={"scroll"} mx={2}>
      <Table.Root key={"stock-table"} size="sm" variant={"line"}>
        <Table.Header>
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
        </Table.Header>
        <Table.Body>
          {data?.map((item) => (
            <Table.Row key={item.id}>
              <Table.Cell>{item.id}</Table.Cell>
              <Table.Cell>{item.name}</Table.Cell>
              <Table.Cell>{item.originalQuantity}</Table.Cell>
              <Table.Cell>{item.remainQuantity}</Table.Cell>
              <Table.Cell>{item.price}</Table.Cell>
              <Table.Cell>
                {parseInt(item?.price?.toString() ?? "0") * item.remainQuantity}
              </Table.Cell>
              <Table.Cell>{item.originalPrice}</Table.Cell>
              <Table.Cell>
                {parseInt(item?.originalPrice?.toString() ?? "0") *
                  item.remainQuantity}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Box>
  );
};

export default StockTable;
