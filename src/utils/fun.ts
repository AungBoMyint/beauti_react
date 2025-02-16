import ScheduleSale from "@/entity/ScheduleSale";
import { createListCollection } from "@chakra-ui/react/collection";
import { isSameMonth, isSameYear } from "date-fns";

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

export const checkBirthDay = (date?: string | null | undefined) => {
  if (!date) return false;
  const expireDate = new Date(date);
  const currentDate = new Date();
  return isSameMonth(expireDate, currentDate);
};
export const checkPointExpired = (date?: string | null | undefined) => {
  if (!date) return true;
  const expireDate = new Date(date).getTime();
  const currentDate = new Date().getTime();
  return currentDate > expireDate;
};
export const orderStatusToString = (status: number | null | undefined) => {
  switch (status) {
    case 0:
      return "Confirmed";
    case 1:
      return "Shipped";
    case 2:
      return "Cancelled";
    default:
      return "New";
  }
};
export const orderStatusToColor = (status: number | null | undefined) => {
  switch (status) {
    case 0:
      return "#FFD65A";
    case 1:
      return "#FF9D23";
    case 2:
      return "#F93827";
    default:
      return "#16C47F";
  }
};

export const isScheduleSale = (
  scheduleSale: ScheduleSale | undefined | null
) => {
  if (!scheduleSale) {
    return false;
  }
  return new Date(scheduleSale.endTime).getTime() > new Date().getTime();
};
