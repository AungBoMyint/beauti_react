import { Box } from "@chakra-ui/react";
import ViewAllLabel from "../ViewAllLabel";
import ScrollX from "../ScrollX";
import { useFilterStatusItem } from "@/hooks/useItem";
import ItemCard from "../ItemCard";
import { statusDetailsItemPath } from "@/utils/constant";

interface Props {
  status: string;
}
const StatusOne = ({ status }: Props) => {
  const { data: items, isLoading, error } = useFilterStatusItem(status);
  if (isLoading) return <div>loading.....</div>;
  return (
    <Box>
      <ViewAllLabel
        label={status}
        action="Show More"
        to={statusDetailsItemPath + status}
      />
      <ScrollX>
        {items?.map((item) => (
          <ItemCard key={item.id} item={item} />
        ))}
      </ScrollX>
    </Box>
  );
};

export default StatusOne;
