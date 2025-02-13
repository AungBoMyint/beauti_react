import useCart from "@/hooks/useCart";
import { Input } from "@chakra-ui/react";
import { useEffect } from "react";

export const FullAddressInput = () => {
  const fullAddress = useCart((state) => state.fullAddress);
  useEffect(() => {
    const inputElement = document.getElementById("address-input");

    inputElement?.addEventListener("input", (event) => {
      useCart
        .getState()
        .changeFullAddress((event.target as HTMLInputElement).value);
    });
  }, []);
  return (
    <>
      <Input
        id="address-input"
        placeholder=""
        border={"solid #D9D9D9"}
        paddingLeft={2}
        focusRing={"none"}
        defaultValue={fullAddress ?? ""}
      />
    </>
  );
};
