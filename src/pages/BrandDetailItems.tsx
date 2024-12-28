import ViewAllDetailsComponent from "@/components/app/ViewAllDetailsComponent";
import { useFilterBrandItem } from "@/hooks/useItem";
import { Text } from "@chakra-ui/react";
import { useParams } from "react-router-dom";

const BrandDetailItems = () => {
  const { slug } = useParams();
  const { data: items, isLoading } = useFilterBrandItem(slug ?? "");
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

export default BrandDetailItems;
