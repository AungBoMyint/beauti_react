import Confetti from "react-confetti";
import {
  DialogBody,
  DialogContent,
  DialogRoot,
  DialogTrigger,
} from "../ui/dialog";
import birthdayGift from "../../assets/birthday.svg";
import { Box, Button, Center, Image, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import useCart from "@/hooks/useCart";
import authStore from "@/hooks/authStore";
import GiftItem from "@/entity/GiftItem";
import { useWindowSize } from "react-use";
import { IoCheckmarkCircleSharp } from "react-icons/io5";
import { useState } from "react";
import { toaster } from "../ui/toaster";
interface Props {
  item: GiftItem;
}
const GiftAdded = ({ item }: Props) => {
  const addItem = useCart.getState().addItem;
  const setUser = authStore.getState().setUser;
  const currentUser = authStore.getState().currentUser;
  const grandTotal = useCart((state) => state.grandTotal);
  const [open, setOpen] = useState(false);
  return (
    <DialogRoot
      role="alertdialog"
      open={open}
      //onOpenChange={(e) => setOpen(e.open)}
      size="cover"
      placement="center"
      motionPreset="slide-in-bottom"
    >
      <DialogTrigger asChild>
        <Button
          onClick={() => {
            if (grandTotal < 50000) {
              setOpen(false);
              toaster.create({
                title:
                  "You need to spend at least 50,000 Ks to claim this gift.",
                type: "error",
              });
              return;
            }
            setOpen(true);
            addItem({
              advertisementID: "",
              brandID: "",
              brandName: "",
              category: [],
              color: "",
              comment: null,
              dateTime: "",
              deliveryTime: null,
              description: item.desc,
              discountPrice: null,
              howToUse: null,
              id: item.id,
              ingredients: null,
              love: null,
              name: item.name,
              originalPrice: 0,
              originalQuantity: 0,
              photo1: item.image,
              photo2: null,
              photo3: null,
              price: 0,
              remainQuantity: 0,
              requirePoint: null,
              reviewCount: null,
              scheduleSale: null,
              size: null,
              status: null,
              tags: null,
              isGift: true,
            });
            setUser!({
              ...currentUser!,
              claimed: [
                new Date().getFullYear().toString(),
                ...(currentUser?.claimed ?? []),
              ],
            });
          }}
          width={"full"}
          variant={"outline"}
          border={"solid"}
          borderColor={"gold"}
          color={"gold"}
          rounded={"lg"}
          fontWeight={"medium"}
          mt={2}
        >
          Claim
        </Button>
      </DialogTrigger>
      <DialogContent height={"fit"}>
        <DialogBody>
          <AddedCartConfetti />
        </DialogBody>
      </DialogContent>
    </DialogRoot>
  );
};

export default GiftAdded;
const AddedCartConfetti = () => {
  const navigate = useNavigate();
  const { width, height } = useWindowSize();
  return (
    <>
      {" "}
      <Confetti tweenDuration={100} width={width} height={height} />
      <Box justifySelf={"center"}>
        <Center>
          <IoCheckmarkCircleSharp color="green" size={40} />
        </Center>
        <Center>
          <Image src={birthdayGift} />
        </Center>
        <Text textAlign={"center"} fontWeight={"bold"} fontSize={"lg"} mb={1}>
          Gift Added
        </Text>
        <Text fontSize={"md"}>Your gift has been added to your cart!</Text>
        <Button
          onClick={() => {
            navigate("/cart");
          }}
          mt={2}
          variant={"solid"}
          color={"white"}
          width={"full"}
          bg={{ base: "black", _dark: "gray.800" }}
        >
          Go to cart
        </Button>
      </Box>
    </>
  );
};
