import { Button } from "@/components/ui/button";
import usePurchases from "@/hooks/usePurchases";
import { orderStatusToColor, orderStatusToString } from "@/utils/fun";
import { Box, Card, Flex, Image, Text } from "@chakra-ui/react";
import { format } from "date-fns";
import OrderInformationDialog from "./OrderInformationDialog";
import { useNavigate } from "react-router-dom";
import AutoSizer from "react-virtualized-auto-sizer";
import { FixedSizeList as List } from "react-window";
import { CSSProperties } from "react";

interface RenderProps {
  index: number;
  style: CSSProperties;
}
const Prepay = () => {
  const navigate = useNavigate();

  const { isLoading, data } = usePurchases("Pre");

  const renderItem = ({ index, style }: RenderProps) => {
    var purchase = data![index];
    return (
      <Box style={style} key={purchase?.id} px={2} pb={1}>
        <Flex
          height={110}
          bg={"white"}
          shadow={"xl"}
          rounded={"lg"}
          px={4}
          py={2}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <Flex justifyItems={"center"} direction={"column"}>
            <Text padding={0} margin={0} fontSize={"md"} fontWeight={"bold"}>
              {purchase.name}
            </Text>
            <Text>{purchase.phone}</Text>

            <Text
              fontSize={"sm"}
              fontWeight={"bold"}
              color={"gray.600"}
              padding={0}
              margin={0}
            >
              {format(new Date(purchase.dateTime), "dd/MM/yy")}
            </Text>
          </Flex>
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
            <Image
              onClick={() =>
                navigate("/image-detail", {
                  state: { image: purchase.bankSlipImage },
                })
              }
              src={purchase.bankSlipImage!}
              h={100}
            />
          </Flex>
        </Flex>
      </Box>
    );
  };

  if (isLoading) {
    return <Text>Loading.....</Text>;
  }

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

export default Prepay;
