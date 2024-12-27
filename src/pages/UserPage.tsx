import ActionFlex from "@/components/app/ActionFlex";
import { Box, Flex, Button } from "@chakra-ui/react";
import { RiFileHistoryFill } from "react-icons/ri";
import { MdPrivacyTip } from "react-icons/md";
import { SiGnuprivacyguard } from "react-icons/si";
import { RiErrorWarningFill } from "react-icons/ri";

const UserPage = () => {
  return (
    <Box spaceY={3}>
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
          bg={{base:'black',_dark:'gray.800'}}
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
          bg={{base:'black',_dark:'gray.800'}}
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

export default UserPage;
