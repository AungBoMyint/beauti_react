import AppUser from "./AppUser";

interface Review {
  dateTime: string;
  id: string;
  productId: string;
  rating: number;
  reviewMessage: string;
  user: AppUser;
  approved?: boolean | null;
  verifiedPurchase?: boolean | null;
}
export default Review;
