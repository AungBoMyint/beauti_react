import { Button, Flex, Skeleton } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import ScrollX from "../ScrollX";
import categories from "../../../assets/data/categories.json";
import Category from "@/entity/Category";
import useCategories from "@/hooks/useCategories";
import { Link } from "react-router-dom";
import { categoryDetailsItemPath } from "@/utils/constant";

const Categories = () => {
  const divRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);
  const { data: finalCategories, isLoading, error } = useCategories();
  useEffect(() => {
    if (divRef.current)
      setWidth(divRef.current.scrollWidth - divRef.current.offsetWidth);
  }, []);
  if (isLoading)
    return (
      <ScrollX>
        {[1, 2, 3, 4, 5, 6].map((item) => (
          <Skeleton key={item}>
            <Button
              bg={{ base: "white", _dark: "gray.900" }}
              shadow={"sm"}
              rounded={"lg"}
              paddingX={2}
              size={"sm"}
              fontSize={"sm"}
              fontWeight={"medium"}
            >
              Buttons
            </Button>
          </Skeleton>
        ))}
      </ScrollX>
    );
  if (error) return <div>error.... {error.message}</div>;
  return (
    <ScrollX>
      {finalCategories?.map((category) => (
        <Link key={category.id} to={categoryDetailsItemPath + category.name}>
          <Button
            bg={{ base: "white", _dark: "gray.900" }}
            shadow={"sm"}
            rounded={"lg"}
            paddingX={2}
            size={"sm"}
            fontSize={"sm"}
            fontWeight={"medium"}
          >
            {category.name}
          </Button>
        </Link>
      ))}
    </ScrollX>
  );
};

export default Categories;
