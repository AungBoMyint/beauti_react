import ScheduleSale from "./ScheduleSale";
import Size from "./Size";

interface Item {
  advertisementID: string;
  brandID: string;
  brandName: string;
  category: string[];
  color: string;
  comment: string[] | null;
  dateTime: string;
  deliveryTime: string | null;
  description: string;
  discountPrice: number | null;
  howToUse: string | null;
  id: string;
  ingredients: string | null;
  love: null | number;
  name: string;
  originalPrice: number;
  originalQuantity: number;
  photo1: string | null;
  photo2: string | null;
  photo3: string | null;
  price: number | string;
  remainQuantity: number;
  requirePoint: null | number;
  reviewCount: null | number;
  scheduleSale: null | ScheduleSale;
  size: Size[] | null;
  status: string | null;
  tags: string[] | null;
}
export default Item;
