import { createListCollection } from "@chakra-ui/react/collection";

interface Props<T extends Record<string, any>> {
  items: T[];
  labelKey: keyof T;
  valueKey: keyof T;
}
export interface CollectionType {
  label: string;
  value: string;
}
export const createCollection = <T extends Record<string, any>>({
  items,
  labelKey,
  valueKey,
}: Props<T>) => {
  const collection = createListCollection<CollectionType>({
    items: items.map((item) => ({
      label: item[labelKey],
      value: item[valueKey],
    })),
  });
  return collection;
};
