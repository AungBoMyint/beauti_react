import {
  RadioCardItem,
  RadioCardLabel,
  RadioCardRoot,
} from "@/components/ui/radio-card";
import { Box, Button, Flex, HStack } from "@chakra-ui/react";
import React, { useState } from "react";
import PrepayComponent from "./PrepayComponent";
import { GrDeliver } from "react-icons/gr";
import { FaCreditCard } from "react-icons/fa6";

const CheckoutPage = () => {
  const [paymentMethod, setPaymentMethod] = useState<string | undefined>();
  return (
    <Box m={4} spaceY={4}>
      <RadioCardRoot key={"card-root-1"} size={"md"} defaultValue="cash">
        <RadioCardLabel mb={2} fontWeight={"bold"} fontSize={"lg"}>
          Select Payment Methods
        </RadioCardLabel>
        <Flex gap={2} direction={"column"}>
          {[
            {
              title: "Cash On Delivery",
              value: "cash",
              icon: <GrDeliver size={26} />,
            },
            { title: "Prepay", value: "pre", icon: <FaCreditCard size={26} /> },
          ].map((item) => (
            <RadioCardItem
              icon={item.icon}
              label={item.title}
              key={item.value}
              value={item.value}
              focusRing={"none"}
              border={"solid 1px"}
              borderColor={"gray.300"}
              color={"gray.600"}
              _selected={{ borderColor: "black", color: "black" }}
              _focus={{ borderColor: "black", color: "black" }}
              onClick={() => setPaymentMethod(item.value)}
              cursor={"pointer"}
            />
          ))}
        </Flex>
      </RadioCardRoot>
      {paymentMethod === "pre" && <PrepayComponent />}
      <Button
        color={"white"}
        fontWeight={"medium"}
        width={"full"}
        bg={{ base: "black", _dark: "gray.800" }}
      >
        Confirm
      </Button>
    </Box>
  );
};

export default CheckoutPage;
