import {
  SelectContent,
  SelectItem,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
} from "../ui/select";
import { createListCollection } from "@chakra-ui/react";
interface Props {
  onSortChange: (value: string) => void;
}
const SortPrice = ({ onSortChange }: Props) => {
  const items = createListCollection({
    items: [
      { label: "Low To High", value: "lth" },
      { label: "High To Low", value: "htl" },
    ],
  });
  return (
    <>
      <SelectRoot
        collection={items}
        defaultValue={["spirited_away"]}
        size="sm"
        width="160px"
        variant={"outline"}
        border={"solid"}
        rounded={"lg"}
        onValueChange={(item) =>
          onSortChange(item.value.length > 0 ? item.value[0] : "")
        }
      >
        <SelectTrigger clearable={true}>
          <SelectValueText
            fontWeight={"medium"}
            fontSize={"sm"}
            paddingLeft={2}
            placeholder="Sort Price"
          />
        </SelectTrigger>
        <SelectContent width={160}>
          {items.items.map((movie) => (
            <SelectItem fontWeight={"medium"} item={movie} key={movie.value}>
              {movie.label}
            </SelectItem>
          ))}
        </SelectContent>
      </SelectRoot>
    </>
  );
};

export default SortPrice;
