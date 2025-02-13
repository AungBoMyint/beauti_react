import { Button, Skeleton } from "@chakra-ui/react";
import ScrollX from "../ScrollX";
import useCategories from "@/hooks/useCategories";
import { Link } from "react-router-dom";
import { categoryDetailsItemPath } from "@/utils/constant";

const Categories = () => {
  const { data: finalCategories, isLoading, error } = useCategories();

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
