import ScheduleSale from "@/entity/ScheduleSale";
import { isScheduleSale } from "@/utils/fun";
import { Box, Flex, Text } from "@chakra-ui/react";
import Countdown from "react-countdown";

interface RenderProps {
  total: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  milliseconds: number;
  completed: boolean;
}
interface Props {
  scheduleSale: ScheduleSale;
}
const ScheduleSaleCountDown = ({ scheduleSale }: Props) => {
  const show = isScheduleSale(scheduleSale);
  const renderer = ({
    days,
    hours,
    minutes,
    seconds,
    completed,
  }: RenderProps) => {
    if (completed) {
      // Render a completed state
      return <></>;
    } else {
      // Render a countdown
      return (
        <Flex alignItems={"start"} gap={2}>
          <Flex
            direction={"column"}
            width={10}
            textAlign={"center"}
            alignItems={"center"}
          >
            <Text fontSize={"md"} fontWeight={"bold"}>
              {days < 10 ? `0${days}` : days}
            </Text>
            <Text fontSize={"xs"}>{days > 1 ? "Days" : "Day"}</Text>
          </Flex>
          <Text>:</Text>
          <Flex
            direction={"column"}
            width={10}
            textAlign={"center"}
            alignItems={"center"}
          >
            <Text fontSize={"md"} fontWeight={"bold"}>
              {hours < 10 ? `0${hours}` : hours}
            </Text>
            <Text fontSize={"xs"}>{hours > 1 ? "Hours" : "Hour"}</Text>
          </Flex>
          <Text>:</Text>
          <Flex
            direction={"column"}
            width={10}
            textAlign={"center"}
            alignItems={"center"}
          >
            <Text fontSize={"md"} fontWeight={"bold"}>
              {minutes < 10 ? `0${minutes}` : minutes}
            </Text>
            <Text fontSize={"xs"}>{minutes > 1 ? "Minutes" : "Minute"}</Text>
          </Flex>
          <Text>:</Text>
          <Flex
            direction={"column"}
            width={10}
            textAlign={"center"}
            alignItems={"center"}
          >
            <Text fontSize={"md"} fontWeight={"bold"}>
              {seconds < 10 ? `0${seconds}` : seconds}
            </Text>
            <Text fontSize={"xs"}>{seconds > 1 ? "Seconds" : "Second"}</Text>
          </Flex>
        </Flex>
      );
    }
  };
  return (
    show && (
      <Box
        spaceY={2}
        textAlign={"center"}
        shadow={"xl"}
        paddingX={4}
        paddingY={2}
        rounded={"lg"}
        bg={{
          base: "gray.200",
          _dark: "gray.900",
        }}
      >
        <Text fontWeight={"medium"} fontSize={"md"}>
          {scheduleSale.title}
        </Text>
        <Countdown renderer={renderer} date={new Date(scheduleSale.endTime)} />
      </Box>
    )
  );
};

export default ScheduleSaleCountDown;
