import { toaster } from "@/components/ui/toaster";
import Purchase from "@/entity/Purchase";
import { useUpdatePurchaseStatus } from "@/hooks/usePurchases";
import {
  createListCollection,
  Flex,
  Text,
  Select,
  Portal,
} from "@chakra-ui/react";
import { useQueryClient } from "@tanstack/react-query";

interface Props {
  purchase: Purchase;
}
const ChangeStatus = ({ purchase }: Props) => {
  const queryClient = useQueryClient();
  const onSuccess = () => {
    //DO Someting
    toaster.create({
      title: `Purchase status is updated`,
      type: "success",
    });
    queryClient.invalidateQueries({ queryKey: ["purchases", "Cash"] });
    queryClient.invalidateQueries({ queryKey: ["purchases", "Pre"] });
  };
  const mutation = useUpdatePurchaseStatus(() => onSuccess());
  const handleChangeStatus = (statusValue: string[] | null[] | null) => {
    if (!statusValue) return;
    const orderStatus = parseInt(statusValue[0] ?? "-1");
    mutation.mutate({ id: purchase.id, status: orderStatus });
  };
  return (
    <Flex
      align={"center"}
      justify={"space-between"}
      p={4}
      bg={"white"}
      shadow={"sm"}
      rounded={"md"}
    >
      <Text pb={2} fontWeight={"semibold"}>
        Change Status
      </Text>
      <Select.Root
        collection={actions}
        size="lg"
        maxWidth={"140px"}
        defaultValue={[purchase.orderStatus !== null ? `${purchase.orderStatus}` : `-1`]}
        onValueChange={({ value }) => handleChangeStatus(value)}
      >
        <Select.HiddenSelect />
        <Select.Control>
          <Select.Trigger
            cursor={"pointer"}
            focusRing={"none"}
            border={"solid 1px"}
            px={4}
            color={"gray"}
          >
            <Select.ValueText placeholder="Select status" />
          </Select.Trigger>
          <Select.IndicatorGroup>
            <Select.Indicator />
          </Select.IndicatorGroup>
        </Select.Control>
        <Portal>
          <Select.Positioner>
            <Select.Content>
              {actions.items.map((framework) => (
                <Select.Item item={framework} key={framework.value}>
                  {framework.label}
                  <Select.ItemIndicator />
                </Select.Item>
              ))}
            </Select.Content>
          </Select.Positioner>
        </Portal>
      </Select.Root>
    </Flex>
  );
};

export default ChangeStatus;
const actions = createListCollection({
  items: [
    { label: "New", value: "-1" },
    { label: "Confirmed", value: "0" },
    { label: "Shipped", value: "1" },
    { label: "Cancelled", value: "2" },
  ],
});
