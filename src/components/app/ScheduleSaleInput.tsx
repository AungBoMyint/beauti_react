import {
  Box,
  Flex,
  Input,
  PopoverContent,
  PopoverContext,
  PopoverRoot,
  PopoverTrigger,
  Text,
} from "@chakra-ui/react";
import { FaCalendarAlt } from "react-icons/fa";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import ScheduleSale from "@/entity/ScheduleSale";
import { format } from "date-fns";

interface Props {
  scheduleSale: ScheduleSale;
  handleInputChange: (key: string, value: string) => void;
}

const ScheduleSaleInput = ({ handleInputChange, scheduleSale }: Props) => {
  return (
    <Box spaceY={2}>
      <Flex alignItems={"center"} gap={6}>
        <Text fontWeight={"medium"} fontSize={15}>
          Schedule Sales
        </Text>
      </Flex>

      <Flex gap={2} alignItems={"center"}>
        <Input
          border={"solid"}
          focusRing={"none"}
          px={2}
          css={{
            "--error-color": "none",
            "--focus-color": "none",
          }}
          defaultValue={scheduleSale?.title}
          placeholder="Sale Title"
          onChange={(event) => handleInputChange("title", event.target.value)}
        />
        <Input
          border={"solid"}
          focusRing={"none"}
          px={2}
          css={{
            "--error-color": "none",
            "--focus-color": "none",
          }}
          placeholder="Price"
          defaultValue={scheduleSale?.price}
          onChange={(event) => handleInputChange("price", event.target.value)}
        />
      </Flex>
      <PopoverRoot>
        <PopoverTrigger>
          <Flex alignItems={"center"} gap={2}>
            <FaCalendarAlt size={20} color={"blue"} />
            <Text fontSize={16} color={"blue.600"}>
              Pick a schedule date
            </Text>
          </Flex>
        </PopoverTrigger>
        <PopoverContent>
          <PopoverContext>
            {(context) => (
              <Calendar
                onChange={(value) => {
                  handleInputChange("endTime", value?.toString()!);
                  context.setOpen(false);
                }}
                value={
                  scheduleSale?.endTime ? new Date(scheduleSale.endTime) : null
                }
              />
            )}
          </PopoverContext>
        </PopoverContent>
      </PopoverRoot>
      {scheduleSale?.endTime && (
        <Text>
          {format(new Date(scheduleSale?.endTime), "yyyy-MM-dd hh:mm:ss a")}
        </Text>
      )}
    </Box>
  );
};

export default ScheduleSaleInput;
