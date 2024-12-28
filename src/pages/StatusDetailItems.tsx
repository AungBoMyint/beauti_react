import ViewAllDetailsComponent from "@/components/app/ViewAllDetailsComponent";
import { useFilterStatusItem } from "@/hooks/useItem";
import { Text } from "@chakra-ui/react";
import { useParams } from "react-router-dom";

const StatusDetailItems = () => {
  const { slug } = useParams();
  const { data: items, isLoading } = useFilterStatusItem(slug ?? "");
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

export default StatusDetailItems;
