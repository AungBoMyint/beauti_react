import { createListCollection } from "@chakra-ui/react";
import {
  SelectContent,
  SelectItem,
  SelectItemGroup,
  SelectRoot,
  SelectTrigger,
} from "@/components/ui/select";
import { useTownship } from "@/hooks/useTownship";
import { Text } from "@chakra-ui/react";
import useCart from "@/hooks/useCart";

export const SelectAddress = () => {
  const { data, isLoading } = useTownship();
  const address = useCart((state) => state.address);
  const setAddress = useCart((state) => state.setAddress);

  if (isLoading) return <div>loading.....</div>;
  const listItems = [];
  for (var division of data!) {
    for (var township of division.townships) {
      listItems.push({
        label: township.name,
        value: `${township.name}-${township.fee}`,
        group: division.name,
      });
    }
  }
  const frameworks = createListCollection({
    items: listItems,
  });
  const categories = frameworks.items.reduce((acc, item) => {
    const group = acc.find((group) => group.group === item.group);
    if (group) {
      group.items.push(item);
    } else {
      acc.push({ group: item.group, items: [item] });
    }
    return acc;
  }, [] as { group: string; items: (typeof frameworks)["items"] }[]);
  return (
    <SelectRoot
      collection={frameworks}
      size="sm"
      width="180px"
      onValueChange={(data) => {
        const list = (data.value[0] as string).split("-");
        setAddress({
          fee: parseInt(list[1]),
          name: list[0],
        });
      }}
    >
      <SelectTrigger>
        <Text>{address?.name ? address.name : "မြို့နယ်"}</Text>
      </SelectTrigger>
      <SelectContent>
        {categories.map((category) => (
          <SelectItemGroup key={category.group} label={category.group}>
            {category.items.map((item) => (
              <SelectItem item={item} key={item.value}>
                {item.label}
              </SelectItem>
            ))}
          </SelectItemGroup>
        ))}
      </SelectContent>
    </SelectRoot>
  );
};
export const SelectedAddressFee = () => {
  const address = useCart((state) => state.address);
  return <Text>{address?.fee ? address.fee : 0}Ks</Text>;
};
