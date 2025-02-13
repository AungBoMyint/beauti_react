import useCart from "@/hooks/useCart";
import { filterCoupon } from "@/hooks/useCoupon";
import { Input, Text } from "@chakra-ui/react";
import { useEffect } from "react";

export const PromotionInput = () => {
  const oneTimeUsedCoupon = useCart((state) => state.oneTimeUsedCoupon);
  useEffect(() => {
    const inputElement = document.getElementById("input");

    inputElement?.addEventListener("input", (event) => {
      const result = filterCoupon((event.target as HTMLInputElement).value);
      useCart.getState().setOneTimeUsedCoupon(result);
    });
  }, []);
  return (
    <>
      <Input
        id="input"
        placeholder="Apply a coupon"
        border={"solid"}
        paddingLeft={2}
        defaultValue={oneTimeUsedCoupon?.code}
      />
      <PromotionError />
    </>
  );
};

export const PromotionError = () => {
  const { needToBuyMore, alreadyUsedCoupon } = useCart((state) => state);
  return alreadyUsedCoupon ? (
    <Text color={"red"}>The used coupon is not valid.</Text>
  ) : needToBuyMore ? (
    <Text color={"red"}>Need to buy more.</Text>
  ) : null;
};
