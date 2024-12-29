import AppUser from "./AppUser";

interface Review {
  dateTime: string;
  id: string;
  productId: string;
  rating: number;
  reviewMessage: string;
  user: AppUser;
}
export default Review;
