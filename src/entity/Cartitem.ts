import ScheduleSale from "./ScheduleSale";

interface CartItem {
  color: string | null;
  image: string;
  count: number;
  discountPrice: number;
  id: string;
  itemName: string;
  price: number | string;
  remainQuantity: number;
  requirePoint: number;
  size: string;
  scheduleSale: ScheduleSale | null | undefined;
}
export default CartItem;
