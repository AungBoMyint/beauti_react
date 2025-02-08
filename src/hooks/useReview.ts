import ApiClient from "@/utils/ApiClient";
import Review from "@/entity/Review";
import reviewCollection from "../assets/data/reviewCollection.json";

const apiClient = new ApiClient<Review[]>("/reviews/:id");
export var reviewHistories: Review[] = [];
interface successProps {
  onSuccess: (data: Review) => void;
}
export const useAddReview = ({ onSuccess }: successProps) => {
  const postClient = new ApiClient<Review>("/reviews");
  return postClient.post({
    key: ["review-post"],
    onSuccess: onSuccess,
    fn: async (data: Review) =>
      new Promise<Review>((resolve) => {
        setTimeout(() => {
          reviewHistories.push(data);
          resolve(data);
        }, 500);
      }),
  });
};
export const useReviews = () =>
  apiClient.get({
    key: ["reviews"],
    fn: async () =>
      new Promise((resolve) => {
        setTimeout(() => {
          const responseOne = Object.values(reviewCollection.data) as Review[];
          var response: Review[] = [];
          if (reviewHistories.length < 1) {
            reviewHistories = responseOne;
            response = responseOne;
          } else {
            response = reviewHistories;
          }
          const reviews = response;
          reviews.sort(
            (a, b) =>
              new Date(a.dateTime).getTime() - new Date(b.dateTime).getTime()
          );
          resolve(reviews.reverse());
        }, 500);
      }),
  });
const useReview = (productId: string) =>
  apiClient.get({
    key: ["reviews", productId],
    fn: async () =>
      new Promise((resolve) => {
        setTimeout(() => {
          const responseOne = Object.values(reviewCollection.data) as Review[];
          var response: Review[] = [];
          if (reviewHistories.length < 1) {
            reviewHistories = responseOne;
            response = responseOne;
          } else {
            response = reviewHistories;
          }
          const reviews = response.filter(
            (review) => review.productId === productId
          );
          reviews.sort(
            (a, b) =>
              new Date(a.dateTime).getTime() - new Date(b.dateTime).getTime()
          );
          resolve(reviews.reverse());
        }, 500);
      }),
  });
export default useReview;
