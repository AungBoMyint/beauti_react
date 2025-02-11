import { Box, Flex, Text } from "@chakra-ui/react";
import { IoMdHome } from "react-icons/io";
import { MdHorizontalSplit } from "react-icons/md";
import { MdLocalOffer } from "react-icons/md";
import { FaCartPlus } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { MdAccountCircle } from "react-icons/md";

import BottomNavItem from "./BottomNavItem";
import useNavStore from "@/store/userNavStore";
import { useLocation, useNavigate } from "react-router-dom";

type Props = {};

const BottomNavBar = (props?: Props) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const handleChange = (value: string) => {
    navigate(value);
  };
  return (
    <Flex
      lg={{ display: "none" }}
      width={"100vw"}
      position={"fixed"}
      boxShadow="0 -2px 4px rgba(0, 0, 0, 0.1)"
      rounded={"xl"}
      shadowColor={"gray"}
      bg={{ base: "gray.50", _dark: "gray.900" }}
      paddingY={2}
      bottom={0}
      zIndex={2000}
      alignItems={"end"}
      justifyContent={"space-around"}
    >
      <BottomNavItem
        label="Home"
        isSelected={pathname === "/"}
        onChange={() => handleChange("/")}
      >
        <IoMdHome size={23} />
      </BottomNavItem>
      <BottomNavItem
        label="Shop"
        isSelected={pathname === "/shop"}
        onChange={() => handleChange("/shop")}
      >
        <MdHorizontalSplit size={23} />
      </BottomNavItem>
      <BottomNavItem
        label="Offers"
        isSelected={pathname === "/offers"}
        onChange={() => handleChange("/offers")}
      >
        <MdLocalOffer size={23} />
      </BottomNavItem>
      <BottomNavItem
        label="Cart"
        isSelected={pathname === "/cart"}
        onChange={() => handleChange("/cart")}
      >
        <FaCartPlus size={23} />
      </BottomNavItem>
      {/* <BottomNavItem
        label="Favourite"
        isSelected={pathname === "/favourite"}
        onChange={() => handleChange("/favourite")}
      >
        <FaHeart size={23} />
      </BottomNavItem> */}
      <BottomNavItem
        label="Account"
        isSelected={pathname === "/account"}
        onChange={() => handleChange("/account")}
      >
        <MdAccountCircle size={23} />
      </BottomNavItem>
    </Flex>
  );
};
export default BottomNavBar;
