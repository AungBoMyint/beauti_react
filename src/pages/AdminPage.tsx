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

const AdminPage = () => {
  const navigate = useNavigate();
  return (
    <Box spaceY={3}>
      <Text paddingBottom={1} fontWeight={"bold"} fontSize={20}>
        Admin Feature
      </Text>
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
      <ActionFlex label="Manage One-time Use Coupons">
        <RiCoupon2Fill size={22} />
      </ActionFlex>
      <ActionFlex label="Manage Divisions">
        <FaCity size={22} />
      </ActionFlex>
      <ActionFlex label="Stock Management">
        <AiOutlineStock size={22} />
      </ActionFlex>
      <ActionFlex label="My Orders">
        <Float top={6} right={6}>
          <Circle
            fontSize={"sm"}
            fontWeight={"bold"}
            size="8"
            bg="black"
            color="white"
          >
            12
          </Circle>
        </Float>
      </ActionFlex>
      <ActionFlex label="Order History">
        <RiFileHistoryFill size={22} />
      </ActionFlex>
      <ActionFlex label="Return Policy">
        <MdPrivacyTip size={22} />
      </ActionFlex>
      <ActionFlex label="Privacy and Policy">
        <SiGnuprivacyguard size={22} />
      </ActionFlex>
      <ActionFlex label="Terms and Conditions">
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
        >
          Delete Account
        </Button>
      </Flex>
    </Box>
  );
};

export default AdminPage;
