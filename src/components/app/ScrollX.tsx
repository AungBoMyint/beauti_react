import { Flex } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { ReactNode, useEffect, useRef, useState } from "react";

const MotionFlex = motion.create(Flex);
interface Props {
  children: ReactNode;
}
const ScrollX = ({ children }: Props) => {
  const divRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    if (divRef.current)
      setWidth(divRef.current.scrollWidth - divRef.current.offsetWidth);
  }, []);
  return (
    <Flex as={"div"} ref={divRef}>
      <MotionFlex
        drag="x"
        dragConstraints={{ right: 0, left: -width }}
        gap={4}
        marginY={2}
        alignItems={'center'}
      >
        {children}
      </MotionFlex>
    </Flex>
  );
};

export default ScrollX;
