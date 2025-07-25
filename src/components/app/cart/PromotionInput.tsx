import useCart from "@/hooks/useCart";
import { filterCoupon } from "@/hooks/useCoupon";
import { filterPromotion } from "@/hooks/usePromotion";
import { Input, Text } from "@chakra-ui/react";
import { useEffect } from "react";

export const PromotionInput = () => {
  const oneTimeUsedCoupon = useCart((state) => state.oneTimeUsedCoupon);
  const usedPromotion = useCart((state) => state.usedPromotion);
  useEffect(() => {
    const inputElement = document.getElementById("input");

    inputElement?.addEventListener("input", (event) => {
      const coupon_result = filterCoupon(
        (event.target as HTMLInputElement).value
      );
      useCart.getState().setOneTimeUsedCoupon(coupon_result);
      const promotion_result = filterPromotion(
        (event.target as HTMLInputElement).value
      );
      useCart.getState().setUsedPromotion(promotion_result);
    });
  }, []);
  return (
    <>
      <Input
        id="input"
        placeholder="Apply a coupon"
        border={"solid"}
        paddingLeft={2}
        value={usedPromotion?.code ?? oneTimeUsedCoupon?.code}
        onChange={() => {}}
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
