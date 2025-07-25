import Purchase from "@/entity/Purchase";
import { Box, Image, Stack, Text } from "@chakra-ui/react";
import { useLocation } from "react-router-dom";
import OrderID from "./order_details/OrderID";
import CustomerInformation from "./order_details/CustomerInformation";
import DeliveryInformation from "./order_details/DeliveryInformation";
import ProductDetail from "./order_details/ProductDetail";
import PriceSummary from "./order_details/PriceSummary";
import ChangeStatus from "./order_details/ChangeStatus";

const OrderDetails = () => {
  const location = useLocation();
  const purchase: Purchase = location.state.detail;
  const isAdmin = location.state.isAdmin;
  return (
    <Stack bg={"#F9FAFB"} gap={2} px={4}>
      <Text py={2} fontSize={"lg"} fontWeight={"semibold"} textAlign={"center"}>
        Order Details
      </Text>
      <OrderID purchase={purchase} />
      <CustomerInformation purchase={purchase} />
      <DeliveryInformation purchase={purchase} />
      <ProductDetail purchase={purchase} />
      <PriceSummary purchase={purchase} />

      {isAdmin && <ChangeStatus purchase={purchase} />}

      <BankSlipView purchase={purchase} />
      <Box height={"100px"}></Box>
    </Stack>
  );
};

export default OrderDetails;

interface BankSlipViewProps {
  purchase: Purchase;
}
const BankSlipView = ({ purchase }: BankSlipViewProps) => {
  return purchase.bankSlipImage ? (
    <Image src={purchase.bankSlipImage} />
  ) : (
    <></>
  );
};
