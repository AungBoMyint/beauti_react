import { Flex, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
interface Props {
  label: string;
  action: string;
  to: string;
}
const ViewAllLabel = ({ label, action, to }: Props) => {
  return (
    <Flex alignItems={"center"} justifyContent={"space-between"}>
      <Text fontSize={"lg"} fontWeight={"bold"}>
        {label}
      </Text>
      <Link to={to} className="text-blue-600 underline text-sm font-bold">
        {action}
      </Link>
    </Flex>
  );
};

export default ViewAllLabel;
