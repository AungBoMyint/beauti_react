import { Button, Flex } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import ScrollX from "../ScrollX";
import categories from "../../../assets/data/categories.json";
import Category from "@/entity/Category";
import useCategories from "@/hooks/useCategories";

const MotionFlex = motion(Flex);
const Categories = () => {
  const divRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);
  const { data: finalCategories, isLoading, error } = useCategories();
  useEffect(() => {
    if (divRef.current)
      setWidth(divRef.current.scrollWidth - divRef.current.offsetWidth);
  }, []);
  if (isLoading) return <div>loading.....</div>;
  if (error) return <div>error.... {error.message}</div>;
  return (
    <ScrollX>
      {finalCategories?.map((category) => (
        <Button
          key={category.id}
          bg={{base:'white',_dark:'gray.900'}}
          shadow={"sm"}
          rounded={"lg"}
          paddingX={2}
          size={"sm"}
          fontSize={"sm"}
          fontWeight={"medium"}
        >
          {category.name}
        </Button>
      ))}
    </ScrollX>
  );
};

export default Categories;
