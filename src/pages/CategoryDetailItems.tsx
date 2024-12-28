import ViewAllDetailsComponent from "@/components/app/ViewAllDetailsComponent";
import { useFilterCategoryItem } from "@/hooks/useItem";
import { Text } from "@chakra-ui/react";
import { useParams } from "react-router-dom";

const CategoryDetailItems = () => {
  const { slug } = useParams();
  const { data: items, isLoading } = useFilterCategoryItem(slug ?? "");
  return (
    <>
      <Text fontSize={"md"} fontWeight={"bold"}>
        {slug}
      </Text>
      {isLoading ? (
        <div>loading....</div>
      ) : (
        <ViewAllDetailsComponent items={items ?? []} />
      )}
    </>
  );
};

export default CategoryDetailItems;
