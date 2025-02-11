interface PurchaseItem {
  color: string | null | undefined;
  count: number;
  discountPrice: number;
  id: string;
  itemName: string;
  price: number;
  remainQuantity: number;
  requirePoint: number;
  size: string;
}
export default PurchaseItem;
