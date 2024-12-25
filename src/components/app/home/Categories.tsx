import { Button, Flex } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import ScrollX from "../ScrollX";

const MotionFlex = motion(Flex);
const Categories = () => {
  const divRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);
  const categories = [
    "Sets",
    "Cleansers",
    "Rewards",
    "Hot Sales",
    "Toners",
    "Essences",
    "Ampoules",
    "Serums",
    "Moisturizers",
    "Sun Care",
    "Masks",
    "Mini Sets",
    "Haircare",
    "Treatments",
  ];
  useEffect(() => {
    if (divRef.current)
      setWidth(divRef.current.scrollWidth - divRef.current.offsetWidth);
  }, []);
  return (
    <ScrollX>
      {categories.map((category) => (
        <Button
          key={category}
          bg={"white"}
          color={"black"}
          shadow={"sm"}
          rounded={"lg"}
          paddingX={2}
          size={"sm"}
          fontSize={"sm"}
          fontWeight={"medium"}
        >
          {category}
        </Button>
      ))}
    </ScrollX>
  );
};

export default Categories;
