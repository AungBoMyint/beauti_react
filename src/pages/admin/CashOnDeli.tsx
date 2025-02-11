import usePurchases from "@/hooks/usePurchases";
import { orderStatusToColor, orderStatusToString } from "@/utils/fun";
import { Box, Card, Flex, Text } from "@chakra-ui/react";
import { format } from "date-fns";
import OrderInformationDialog from "./OrderInformationDialog";
import { FixedSizeList as List } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";
import { CSSProperties } from "react";

interface RenderProps {
  index: number;
  style: CSSProperties;
}
const CashOnDeli = () => {
  const { isLoading, data } = usePurchases("Cash");
  if (isLoading) {
    return <Text>Loading.....</Text>;
  }
  const renderItem = ({ index, style }: RenderProps) => {
    var purchase = data![index];
    return (
      <Box style={style} key={purchase?.id} px={2} pb={1}>
        <Box
          height={110}
          bg={"white"}
          shadow={"xl"}
          rounded={"lg"}
          px={4}
          py={2}
        >
          <Text padding={0} margin={0} fontSize={"md"} fontWeight={"bold"}>
            {purchase.name}
          </Text>
          <Flex alignItems={"center"} justify={"space-between"}>
            <Text>{purchase.phone}</Text>
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
              <OrderInformationDialog purchase={purchase} />
            </Flex>
          </Flex>
          <Text
            fontSize={"sm"}
            fontWeight={"bold"}
            color={"gray.600"}
            padding={0}
            margin={0}
          >
            {format(new Date(purchase.dateTime), "dd/MM/yy")}
          </Text>
        </Box>
      </Box>
    );
  };

  return (
    <Box height={"100vh"}>
      <AutoSizer>
        {({ height, width }) => (
          <List
            className="List"
            height={height}
            itemCount={data?.length ?? 0}
            itemSize={120}
            width={width}
          >
            {renderItem}
          </List>
        )}
      </AutoSizer>
    </Box>
  );
};

export default CashOnDeli;
