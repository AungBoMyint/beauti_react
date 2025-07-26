import Purchase from "@/entity/Purchase";
import ScheduleSale from "@/entity/ScheduleSale";
import { createListCollection } from "@chakra-ui/react/collection";

export const formatPrice2 = (number: number) => {
  return new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(number);
};
export const getPriceSummary = (purchase: Purchase) => {
  var grandTotal = 0;
  var discount = 0;
  var subTotal = purchase.items.reduce((pre, cur) => {
    return (
      pre +
      (cur.requirePoint > 0
        ? 0
        : cur.discountPrice > 0
        ? cur.discountPrice
        : parseInt(`${cur.price}`)) *
        cur.count
    );
  }, 0);
  //for promotion values
  if (purchase.promotionCode) {
    if (purchase.promotionValue?.includes("%")) {
      //discount with percentage
      const promo = purchase.promotionValue.replace("%", "");
      const value = (parseInt(promo) / 100) * subTotal;
      grandTotal =
        subTotal -
        value +
        (purchase.deliveryTownshipInfo
          ? parseInt(purchase.deliveryTownshipInfo[1])
          : 0);
      discount = value;
    } else {
      //discount with number
      const promo = purchase.promotionValue?.replace("Ks", "");
      const value = parseInt(promo ?? "0");
      grandTotal =
        subTotal -
        value +
        (purchase.deliveryTownshipInfo
          ? parseInt(purchase.deliveryTownshipInfo[1])
          : 0);
      discount = value;
    }
  } else {
    grandTotal =
      subTotal +
      (purchase.deliveryTownshipInfo
        ? parseInt(purchase.deliveryTownshipInfo[1])
        : 0);
  }
  return {
    grandTotal,
    subTotal,
    discount,
    deliveryFee: purchase.deliveryTownshipInfo
      ? purchase.deliveryTownshipInfo[1]
      : 0,
  };
};

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
  const expireDate = new Date(date).getMonth();
  const currentDate = new Date().getMonth();
  return expireDate === currentDate;
};
export const checkPointExpired = (date?: string | null | undefined) => {
  if (!date) return false;
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
