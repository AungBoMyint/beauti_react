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
}
export default CartItem;
