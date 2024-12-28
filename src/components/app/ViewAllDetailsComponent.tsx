import Item from "@/entity/Item";
import { Flex, Button, Box, Grid } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import ScrollX from "./ScrollX";
import SortPrice from "./SortPrice";
import { RiResetRightFill } from "react-icons/ri";
import ItemCard from "./ItemCard";
import { useFilterItem } from "@/hooks/useItem";

interface Props {
  items: Item[];
}

const ViewAllDetailsComponent = ({ items }: Props) => {
  const [categories, setCategories] = useState<string[]>();
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedSort, setSelectedSort] = useState<string>("");
  const { data: filterItems, isLoading } = useFilterItem({
    categoryName: selectedCategory,
    sortName: selectedSort,
    oldItems: items,
  });
  useEffect(() => {
    const categoriesNew: string[] = [];
    for (var item of items ?? []) {
      for (var category of item.category) {
        if (!categoriesNew.includes(category)) {
          categoriesNew.push(category);
        }
      }
    }
    setCategories(categoriesNew);
  }, []);
  const handleSortChange = (value: string) => {
    setSelectedSort(value);
  };
  const handleClear = () => {
    setSelectedCategory((pre) => "");
    setSelectedSort((pre) => "");
  };
  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value);
  };
  return (
    <Box overflow={"hidden"} spaceY={4}>
      <ScrollX>
        <>
          <RiResetRightFill
            size={26}
            cursor={"pointer"}
            onClick={handleClear}
          />
          <SortPrice onSortChange={handleSortChange} />
          {categories?.map((category) => (
            <Button
              key={category}
              bg={{
                base: selectedCategory === category ? "black" : "white",
                _dark: selectedCategory === category ? "white" : "gray.900",
              }}
              color={{
                base: selectedCategory === category ? "white" : "black",
                _dark: selectedCategory === category ? "black" : "white",
              }}
              shadow={"sm"}
              rounded={"lg"}
              paddingX={2}
              size={"sm"}
              fontSize={"sm"}
              fontWeight={"medium"}
              onClick={() => handleCategoryChange(category)}
            >
              {category}
            </Button>
          ))}
        </>
      </ScrollX>
      {isLoading ? (
        <div>loading....</div>
      ) : (
        <Grid
          templateColumns={{
            sm: "repeat(2, 1fr)",
            md: "repeat(3, 1fr)",
            lg: "repeat(4, 1fr)",
          }}
          gapX={4}
          gapY={4}
        >
          {(filterItems ?? items).map((item, index) => (
            <ItemCard key={`${item.id}-${index}`} item={item} width="w-fit" />
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default ViewAllDetailsComponent;
