import ActionFlex from "@/components/app/ActionFlex";
import { Box, Flex, Button, Text, Card } from "@chakra-ui/react";
import { RiFileHistoryFill } from "react-icons/ri";
import { MdPrivacyTip } from "react-icons/md";
import { SiGnuprivacyguard } from "react-icons/si";
import { RiErrorWarningFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import authStore from "@/hooks/authStore";
import { format } from "date-fns";
import BirthdayComponent from "@/components/app/BirthdayComponent";

const UserPage = () => {
  const navigate = useNavigate();
  return (
    <Box spaceY={3}>
      <BirthdayComponent />
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

export default UserPage;
