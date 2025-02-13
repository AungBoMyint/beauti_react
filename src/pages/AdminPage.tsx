import ActionFlex from "@/components/app/ActionFlex";
import { Float, Circle, Box, Flex, Text, Button } from "@chakra-ui/react";
import { FaCloudUploadAlt } from "react-icons/fa";
import { MdEditDocument } from "react-icons/md";
import { BiSolidCategory } from "react-icons/bi";
import { MdViewCarousel } from "react-icons/md";
import { MdBrandingWatermark } from "react-icons/md";
import { GrStatusCriticalSmall } from "react-icons/gr";
import { FaTag } from "react-icons/fa";
import { RiDiscountPercentFill } from "react-icons/ri";
import { MdReviews } from "react-icons/md";
import { RiCoupon2Fill } from "react-icons/ri";
import { FaCity } from "react-icons/fa6";
import { AiOutlineStock } from "react-icons/ai";
import { RiFileHistoryFill } from "react-icons/ri";
import { MdPrivacyTip } from "react-icons/md";
import { SiGnuprivacyguard } from "react-icons/si";
import { RiErrorWarningFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { FaUserCog } from "react-icons/fa";
import { IoIosNotifications } from "react-icons/io";
import authStore from "@/hooks/authStore";
import MyOrderCircle from "./admin/MyOrderCircle";

const AdminPage = () => {
  const navigate = useNavigate();
  return (
    <Box spaceY={3}>
      <Text paddingBottom={1} fontWeight={"bold"} fontSize={20}>
        Admin Feature
      </Text>
      {/* <ActionFlex
        label="Push Notifications"
        onClick={() => navigate("/notifications")}
      >
        <IoIosNotifications size={22} />
      </ActionFlex> */}
      <ActionFlex label="Manage Users" onClick={() => navigate("/manage-user")}>
        <FaUserCog size={22} />
      </ActionFlex>
      <ActionFlex label="Upload Item" onClick={() => navigate("/upload-item")}>
        <FaCloudUploadAlt size={22} />
      </ActionFlex>
      <ActionFlex label="Manage Item" onClick={() => navigate("/manage-item")}>
        <MdEditDocument size={22} />
      </ActionFlex>
      <ActionFlex
        label="Manage Advertisement"
        onClick={() => navigate("/manage-advertisement-one")}
      >
        <MdViewCarousel size={22} />
      </ActionFlex>
      <ActionFlex
        label="Manage Advertisement2"
        onClick={() => navigate("/manage-advertisement-two")}
      >
        <MdViewCarousel size={22} />
      </ActionFlex>
      <ActionFlex
        label="Manage Categories"
        onClick={() => navigate("/manage-category")}
      >
        <BiSolidCategory size={22} />
      </ActionFlex>
      <ActionFlex
        label="Manage Brands"
        onClick={() => navigate("/manage-brand")}
      >
        <MdBrandingWatermark size={22} />
      </ActionFlex>
      <ActionFlex
        label="Manage Status"
        onClick={() => navigate("/manage-status")}
      >
        <GrStatusCriticalSmall size={22} />
      </ActionFlex>
      <ActionFlex label="Manage Tags" onClick={() => navigate("/manage-tag")}>
        <FaTag size={20} />
      </ActionFlex>
      <ActionFlex
        label="Manage Promotions"
        onClick={() => navigate("/manage-promotion")}
      >
        <RiDiscountPercentFill size={22} />
      </ActionFlex>
      <ActionFlex
        label="Manage Reviews"
        onClick={() => navigate("/manage-review")}
      >
        <MdReviews size={22} />
      </ActionFlex>
      <ActionFlex
        label="Manage One-time Use Coupons"
        onClick={() => navigate("/manage-coupons")}
      >
        <RiCoupon2Fill size={22} />
      </ActionFlex>
      <ActionFlex
        label="Manage Divisions"
        onClick={() => navigate("/manage-address")}
      >
        <FaCity size={22} />
      </ActionFlex>
      <ActionFlex label="Stock View" onClick={() => navigate("/view-stock")}>
        <AiOutlineStock size={22} />
      </ActionFlex>
      <ActionFlex label="My Orders" onClick={() => navigate("/view-orders")}>
        <Float top={6} right={6}>
          <MyOrderCircle />
        </Float>
      </ActionFlex>
      <ActionFlex
        label="Order History"
        onClick={() => navigate("/order-history")}
      >
        <RiFileHistoryFill size={22} />
      </ActionFlex>
      <ActionFlex label="Return Policy" onClick={() => navigate("/policy")}>
        <MdPrivacyTip size={22} />
      </ActionFlex>
      <ActionFlex
        label="Privacy and Policy"
        onClick={() => navigate("/privacy-policy")}
      >
        <SiGnuprivacyguard size={22} />
      </ActionFlex>
      <ActionFlex
        label="Terms and Conditions"
        onClick={() => navigate("/terms-conditions")}
      >
        <RiErrorWarningFill size={22} />
      </ActionFlex>
      <Flex alignItems={"center"} gap={4}>
        <Button
          variant={"solid"}
          bg={{ base: "black", _dark: "gray.800" }}
          paddingX={2}
          rounded={"xl"}
          fontWeight={"bold"}
          color={"white"}
          flex={1}
          onClick={() => {
            localStorage.removeItem("user");
            navigate("/login");
            authStore.getState().setUser!();
          }}
        >
          Log Out
        </Button>
        <Button
          variant={"solid"}
          bg={{ base: "black", _dark: "gray.800" }}
          paddingX={2}
          rounded={"xl"}
          fontWeight={"bold"}
          color={"white"}
          flex={1}
          onClick={() => {
            localStorage.removeItem("user");
            navigate("/login");
            authStore.getState().setUser!();
          }}
        >
          Delete Account
        </Button>
      </Flex>
    </Box>
  );
};

export default AdminPage;
