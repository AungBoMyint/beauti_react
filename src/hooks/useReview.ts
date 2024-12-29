import ApiClient from "@/utils/ApiClient";
import Review from "@/entity/Review";
import reviewCollection from "../assets/data/reviewCollection.json";
import OverAllRating from "@/entity/OverAllRating";

const apiClient = new ApiClient<Review[]>("/reviews/:id");

const useReview = (productId: string) =>
  apiClient.get({
    key: ["reviews", productId],
    fn: async () =>
      new Promise((resolve) => {
        setTimeout(() => {
          const response = Object.values(reviewCollection.data) as Review[];
          const reviews = response.filter(
            (review) => review.productId === productId
          );
          reviews.sort(
            (a, b) =>
              new Date(a.dateTime).getTime() - new Date(b.dateTime).getTime()
          );
          resolve(reviews);
        }, 500);
      }),
  });
export default useReview;
