import useCart from "@/hooks/useCart";
import { filterPromotion } from "@/hooks/usePromotion";
import { Input, Text } from "@chakra-ui/react";
import { useEffect } from "react";

export const PromotionInput = () => {
  const promotionValue = useCart((state) => state.promotionValue);
  useEffect(() => {
    const inputElement = document.getElementById("input");

    inputElement?.addEventListener("input", (event) => {
      const result = filterPromotion((event.target as HTMLInputElement).value);

      useCart.getState().setPromotionValue(result);
    });
  }, []);
  return (
    <>
      <Input
        id="input"
        placeholder="Add a promotion code"
        border={"solid"}
        paddingLeft={2}
        defaultValue={promotionValue?.code}
      />
      <PromotionError />
    </>
  );
};

export const PromotionError = () => {
  const needToBuyMore = useCart((state) => state.needToBuyMore);
  return needToBuyMore ? <Text color={"red"}>Need to buy more.</Text> : null;
};
