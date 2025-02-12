import ApiClient from "@/utils/ApiClient";
import Review from "@/entity/Review";
import OverAllRating from "@/entity/OverAllRating";
import { getReviews, reviewHistories } from "./useReview";

const apiClient = new ApiClient<OverAllRating>("/ratings/:id");
const useRating = (productId: string) =>
  apiClient.get({
    key: ["ratings", productId],
    fn: async () => {
      const responseOne = await getReviews();
      var response: Review[] = [];
      if (reviewHistories.length < 1) {
        response = responseOne;
      } else {
        response = reviewHistories;
      }
      const reviews = response.filter(
        (review) => review.productId === productId
      );
      var overallRating: OverAllRating = {
        rating: 0,
        ratingCount: 0,
        excellent: 0,
        good: 0,
        average: 0,
        belowAverage: 0,
        poor: 0,
      };
      var totalRating = 0;
      var totalRatingCount = 0;
      for (var review of reviews) {
        totalRating += review.rating;
        totalRatingCount += 1;
        overallRating.ratingCount += 1;
        const ratingValue = review.rating;
        if (ratingValue >= 5) {
          overallRating.excellent += 1;
        } else if (ratingValue >= 4) {
          overallRating.good += 1;
        } else if (ratingValue >= 3) {
          overallRating.average += 1;
        } else if (ratingValue >= 2) {
          overallRating.belowAverage += 1;
        } else {
          overallRating.poor += 1;
        }
      }
      overallRating.rating = totalRating / totalRatingCount || 0;
      return overallRating;
    },
  });
export default useRating;
