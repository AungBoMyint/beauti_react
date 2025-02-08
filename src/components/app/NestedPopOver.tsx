import { Text } from "@chakra-ui/react";
import { Button } from "@/components/ui/button";
import {
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverRoot,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ReactNode } from "react";
interface Props {
  children: ReactNode;
}
const NestedPopOver = ({ children }: Props) => {
  return (
    <PopoverRoot>
      <PopoverTrigger asChild>
        {children}
        {/* <Button size="sm" variant="outline">
          Click me
        </Button> */}
      </PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <PopoverBody>
          <Text mb="4">
            Naruto is a Japanese manga series written and illustrated by Masashi
            Kishimoto.
          </Text>

          <PopoverRoot>
            <PopoverTrigger asChild>
              <Button variant="outline" size="xs">
                Open Nested Popover
              </Button>
            </PopoverTrigger>
            <PopoverContent portalled={false}>
              <PopoverArrow />
              <PopoverBody>Some nested popover content</PopoverBody>
            </PopoverContent>
          </PopoverRoot>
        </PopoverBody>
      </PopoverContent>
    </PopoverRoot>
  );
};
export default NestedPopOver;
