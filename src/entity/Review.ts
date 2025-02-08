import AppUser from "./AppUser";

interface Review {
  dateTime: string;
  id: string;
  productId: string;
  rating: number;
  reviewMessage: string;
  user: AppUser;
  approved: boolean;
  verifiedPurchase: boolean;
}
export default Review;
