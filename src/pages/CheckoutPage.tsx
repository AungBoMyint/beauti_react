import {
  RadioCardItem,
  RadioCardLabel,
  RadioCardRoot,
} from "@/components/ui/radio-card";
import { Box, Button, Flex, HStack, Input, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import PrepayComponent from "./PrepayComponent";
import { GrDeliver } from "react-icons/gr";
import { FaCreditCard } from "react-icons/fa6";
import useCart from "@/hooks/useCart";
import { toaster } from "@/components/ui/toaster";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import Purchase from "@/entity/Purchase";
import authStore from "@/hooks/authStore";
import { v4 as uuid } from "uuid";
import PurchaseItem from "@/entity/PurchaseItem";
import { isScheduleSale } from "@/utils/fun";
import { useForm } from "react-hook-form";
import { Field } from "@/components/ui/field";

interface FormValues {
  name: string;
  email: string;
  fullAddress: string;
  phone: string;
}
const CheckoutPage = () => {
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState<string | undefined>();
  const bankSlip = useCart((state) => state.bankSlip);
  const { cartItems, address, promotionValue, grandTotal } = useCart.getState();
  const { currentUser } = authStore.getState();
  const mutation = useMutation({
    mutationFn: async (value: Purchase) =>
      new Promise((resolve) => {
        //if bankSlip is not null, we upload to storage
        //and getback imagepath
        //then set image's url
        //then create doc
        //else
        //create do
        setTimeout(() => {
          resolve(1);
        }, 500);
      }),
    onSuccess: (result) => {
      toaster.create({
        title: "Your order is submitted!",
        type: "success",
      });
      setTimeout(() => {
        //clear cache and go home
        useCart.getState().resetState();
        navigate("/");
      }, 400);
    },
  });
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormValues>({
    defaultValues: {},
  });

  const onSubmit = handleSubmit((data) => {
    if (isValid) {
      if (paymentMethod === "pre" && !bankSlip) {
        console.log("error upload a padi");
        toaster.create({
          title: "Please upload a paid screenshot",
          type: "error",
        });
        return;
      }
      //Do submitting
      mutation.mutateAsync({
        address: data.fullAddress,
        bankSlipImage: "",
        dateTime: new Date().toISOString(),
        deliveryTownshipInfo: [address?.name ?? "", `${address?.fee}`],
        email: currentUser?.emailAddress ?? "",
        id: uuid(),
        items: cartItems?.map(
          (ci) =>
            ({
              color: ci.color,
              count: ci.count,
              discountPrice: isScheduleSale(ci.scheduleSale)
                ? ci.scheduleSale?.price
                : ci.discountPrice,
              id: ci.id,
              itemName: ci.itemName,
              price: ci.price,
              remainQuantity: ci.remainQuantity,
              requirePoint: ci.requirePoint,
              size: ci.size,
            } as PurchaseItem)
        ),
        name: data.name,
        orderStatus: null,
        phone: data.phone,
        promotionValue: promotionValue ? promotionValue.promotionValue : "0",
        total: grandTotal,
        userId: currentUser!.id,
      });
      console.log(data);
    }
  });
  return (
    <form onSubmit={onSubmit}>
      <Box m={4} spaceY={4}>
        <Text fontWeight={"bold"} fontSize={"lg"}>
          Fill Customer Informations
        </Text>
        <Field
          label="Full name"
          invalid={!!errors.name}
          errorText={errors.name?.message}
        >
          <Input
            border={"solid"}
            focusRing={"none"}
            px={2}
            css={{
              "--error-color": "none",
              "--focus-color": "none",
            }}
            {...register("name", { required: "Full name is required" })}
          />
        </Field>
        <Field
          label="Email"
          invalid={!!errors.email}
          errorText={errors.email?.message}
        >
          <Input
            border={"solid"}
            focusRing={"none"}
            px={2}
            css={{
              "--error-color": "none",
              "--focus-color": "none",
            }}
            {...register("email")}
          />
        </Field>
        <Field
          label="Phone number"
          invalid={!!errors.phone}
          errorText={errors.phone?.message}
        >
          <Input
            border={"solid"}
            focusRing={"none"}
            px={2}
            css={{
              "--error-color": "none",
              "--focus-color": "none",
            }}
            {...register("phone", { required: "Phone number is required!" })}
          />
        </Field>
        <Field
          label="Address"
          invalid={!!errors.fullAddress}
          errorText={errors.fullAddress?.message}
        >
          <Input
            border={"solid"}
            focusRing={"none"}
            px={2}
            css={{
              "--error-color": "none",
              "--focus-color": "none",
            }}
            {...register("fullAddress", { required: "Address is required" })}
          />
        </Field>

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
              {
                title: "Prepay",
                value: "pre",
                icon: <FaCreditCard size={26} />,
              },
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
          type="submit"
        >
          Confirm
        </Button>
      </Box>
    </form>
  );
};

export default CheckoutPage;
