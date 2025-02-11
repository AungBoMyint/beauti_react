import PurchaseItem from "./PurchaseItem";

interface Purchase {
  address: string;
  bankSlipImage: string | null;
  dateTime: string;
  deliveryTownshipInfo: string[];
  email: string;
  id: string;
  items: PurchaseItem[];
  name: string;
  orderStatus: number | null | undefined;
  phone: string;
  promotionValue: string;
  total: number;
  userId: string;
}
export default Purchase;
