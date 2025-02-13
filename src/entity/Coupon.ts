interface Coupon {
  brands: string[];
  categories: string[];
  code: string;
  dateTime: string;
  id: string;
  promotionValue: string;
  restrictValue: number;
  users: string[] | null | undefined;
}
export default Coupon;
