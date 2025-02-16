import { Flex } from "@chakra-ui/react";
import { IoChevronDown } from "react-icons/io5";
import { useDivisions } from "@/hooks/useDivision";
import { Text } from "@chakra-ui/react";
import useCart from "@/hooks/useCart";
import {
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverRoot,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ReactNode, useState } from "react";
import Division from "@/entity/Division";
import { createCollection } from "@/utils/fun";
import Township from "@/entity/Township";

export const SelectAddress = () => {
  const { data, isLoading } = useDivisions();
  const address = useCart((state) => state.address);
  const setAddress = useCart((state) => state.setAddress);
  const [open, setOpen] = useState(false);
  if (isLoading) return <div>loading.....</div>;
  const listItems = [];

  return (
    <PopoverRoot
      open={open}
      onOpenChange={(e) => setOpen(e.open)}
      positioning={{
        placement: "bottom-end",
      }} /* positioning={{ offset: { crossAxis: 0, mainAxis: 0 } }} */
    >
      <PopoverTrigger asChild>
        <Flex alignItems={'end'} gap={2}>
          <Text>{address?.name ? address.name : "မြို့နယ်(optional)"}</Text>
          <IoChevronDown />
        </Flex>
      </PopoverTrigger>
      <PopoverContent maxHeight={"50vh"} overflow={"auto"}>
        <PopoverArrow />
        <PopoverBody p={0}>
          <Flex direction={"column"}>
            {data?.map((division) => {
              return (
                <SelectTownship
                  key={division.id}
                  division={division}
                  onSelect={(township) => {
                    setAddress(township);
                    setOpen(false);
                  }}
                  trigger={
                    <Text px={4} py={2} _hover={{ bg: "gray.100" }}>
                      {division.name}
                    </Text>
                  }
                />
              );
            })}
          </Flex>
        </PopoverBody>
      </PopoverContent>
    </PopoverRoot>
  );
};
interface TownshipProps {
  division: Division;
  trigger: ReactNode;
  onSelect: (value: Township) => void;
}
export const SelectTownship = ({
  division,
  trigger,
  onSelect,
}: TownshipProps) => {
  return (
    <PopoverRoot>
      <PopoverTrigger asChild>{trigger}</PopoverTrigger>
      <PopoverContent maxH={"40vh"} overflow={"hidden"} /* portalled={false} */>
        <PopoverArrow />
        <PopoverBody p={2} overflow={"scroll"}>
          {division.townships?.map((township) => {
            return (
              <Text
                px={2}
                py={1}
                _hover={{ bg: "gray.100" }}
                onClick={() => onSelect(township)}
                key={township.name}
              >
                {township.name}
              </Text>
            );
          })}
        </PopoverBody>
      </PopoverContent>
    </PopoverRoot>
  );
};
export const SelectedAddressFee = () => {
  const address = useCart((state) => state.address);
  return <Text>{address?.fee ? address.fee : 0}Ks</Text>;
};
