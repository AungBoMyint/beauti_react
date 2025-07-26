import { PromotionInput } from "@/components/app/cart/PromotionInput";
import {
  SelectAddress,
  SelectedAddressFee,
} from "@/components/app/cart/SelectAddress";
import IncreaseDecreaseButtons from "@/components/app/item/IncreaseDecreaseButtons";
import ItemDetailPrice from "@/components/app/ItemDetailPrice";
import useCart from "@/hooks/useCart";
import {
  Box,
  Card,
  Image,
  Flex,
  Button,
  Badge,
  Center,
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { toaster } from "@/components/ui/toaster";
import { useNavigate } from "react-router-dom";
import { CiCircleMinus } from "react-icons/ci";
import authStore from "@/hooks/authStore";
import AppUser from "@/entity/AppUser";

const Cart = () => {
  const navigate = useNavigate();

  const { oneTimeUsedCoupon, usedPromotion, needToBuyMore, alreadyUsedCoupon } =
    useCart((state) => state);
  /* const fullAddress = useCart((state) => state.fullAddress); */
  const cartItems = useCart((state) => state.cartItems);
  const address = useCart((state) => state.address);
  const grandTotal = useCart((state) => state.grandTotal);
  const subTotal = useCart((state) => state.subTotal);
  const bottomActionRef = useRef<HTMLDivElement>();
  const [bottomActionHeight, setBottomActionHeight] = useState(0);
  useEffect(() => {
    if (bottomActionRef.current) {
      setBottomActionHeight(bottomActionRef.current.offsetHeight + 100);
    }
  }, []);
  const clickOrder = () => {
    console.log("click order");
    if (cartItems.length === 0) {
      console.log("cart is empty");
      //cart is empty
      toaster.create({
        title: "Your cart is empty!",
        description: "Please add at least one item before proceeding.",
        type: "error", // or status: "error" depending on the library
        duration: 3000,
      });

      return;
    }
    if (address.fee === 0) {
      toaster.create({
        title: "Please select a township",
        description: "You need to choose a township before continuing.",
        type: "warning",
      });

      return;
    }
    /* if (!fullAddress) {
      toaster.create({
        title: `လိပ်စာအပြည့်အစုံထည့်ပါ`,
        type: "error",
      });
      return;
    } */
    //Go To Checkout
    navigate("/checkout");
  };
  return (
    <Box position={"relative"} lg={{ display: "flex", gap: 4 }}>
      <Box spaceY={2} paddingBottom={bottomActionHeight}>
        {cartItems?.map((item) => {
          return (
            <Card.Root
              key={item.id}
              overflow="hidden"
              size={"lg"}
              variant={"elevated"}
              rounded={"lg"}
              padding={2}
            >
              <Flex>
                <Image
                  className="pointer-events-none h-full w-[30%] self-center"
                  src={item.image}
                  alt={item.itemName}
                />
                <Card.Body padding={2} spaceY={1}>
                  <Card.Title
                    padding={0}
                    margin={0}
                    fontSize={"lg"}
                    fontWeight={"medium"}
                  >
                    {item.itemName}
                  </Card.Title>
                  {item?.isGift && (
                    <Badge variant={"solid"} width={"fit"}>
                      Birthday Gift
                    </Badge>
                  )}
                  {item?.size && (
                    <Badge variant={"solid"} width={"fit"}>
                      {item.size}
                    </Badge>
                  )}

                  {!item.isGift && (
                    <Box
                      textStyle="sm"
                      fontWeight="medium"
                      letterSpacing="tight"
                    >
                      <ItemDetailPrice item={item} />
                    </Box>
                  )}
                </Card.Body>
                {!item.isGift ? (
                  <IncreaseDecreaseButtons item={item} />
                ) : (
                  <Center>
                    <CiCircleMinus
                      onClick={() => {
                        useCart.getState().removeItem(item);
                        const currentUser = authStore.getState().currentUser;
                        const currentClaimed = currentUser?.claimed ?? [];
                        const curretnyear = new Date().getFullYear().toString();
                        const finalClaimed = currentClaimed.filter(
                          (item) => item !== curretnyear
                        );
                        const updateUser = {
                          ...currentUser,
                          claimed: finalClaimed,
                        } as AppUser;
                        console.log(
                          `Final User: ${JSON.stringify(updateUser)}`
                        );
                        authStore.getState().setUser!(updateUser);
                      }}
                      size={22}
                    />
                  </Center>
                )}
              </Flex>
            </Card.Root>
          );
        })}
      </Box>
      <Box
        ref={bottomActionRef}
        rounded={"lg"}
        padding={4}
        marginBottom={{ base: "63px", lg: "0px" }}
        width={"96%"}
        position={{ base: "fixed", lg: "sticky" }}
        bottom={0}
        left={0}
        right={0}
        marginX={"auto"}
        bgColor={{ base: "white", _dark: "gray.900" }}
        shadow={"2xl"}
      >
        <PromotionInput />
        <table className="w-full border-separate border-spacing-y-4">
          <tbody>
            <tr>
              <td className="text-left px-2">ကုန်ပစည်းကျသင့်ငွေ</td>
              <td className="text-right px-2">{subTotal}Ks</td>
            </tr>
            {oneTimeUsedCoupon && !needToBuyMore && !alreadyUsedCoupon ? (
              <tr>
                <td className="text-left px-2">ပရိုမိုးရှင်း လျော့ငွေ</td>
                <td className="text-right px-2">
                  {oneTimeUsedCoupon.promotionValue}
                </td>
              </tr>
            ) : usedPromotion && !needToBuyMore ? (
              <tr>
                <td className="text-left px-2">ပရိုမိုးရှင်း လျော့ငွေ</td>
                <td className="text-right px-2">
                  {usedPromotion.promotionValue}
                </td>
              </tr>
            ) : (
              <></>
            )}
            <tr>
              <td className="text-left px-2">
                <SelectAddress />
              </td>
              <td className="text-right px-2">
                <SelectedAddressFee />
              </td>
            </tr>
            {/* <tr>
              <td className="text-left px-2">လိပ်စာအပြည့်အစုံ</td>
              <td className="text-right px-2">
                <FullAddressInput />
              </td>
            </tr> */}
            <tr className=" text-white">
              <td className="text-left p-2 bg-gray-700 rounded-tl-lg rounded-bl-lg">
                စုစုပေါင်းကျသင့်ငွေ =
              </td>
              <td className="text-right p-2 bg-gray-700 rounded-tr-lg rounded-br-lg">
                {grandTotal}Ks
              </td>
            </tr>
          </tbody>
        </table>
        <Button
          variant={"solid"}
          backgroundColor={{
            base: "black",
            _dark: "gray.800",
          }}
          width={"full"}
          color={"white"}
          rounded={"lg"}
          onClick={() => clickOrder()}
        >
          Checkout
        </Button>
      </Box>
    </Box>
  );
};

export default Cart;
