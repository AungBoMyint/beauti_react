import ApiClient from "@/utils/ApiClient";
import Review from "@/entity/Review";
import itemsStore from "./itemsStore";
import {
  collection,
  doc,
  getDocs,
  orderBy,
  query,
  setDoc,
} from "firebase/firestore";
import { db } from "@/firebaseConfig";

const apiClient = new ApiClient<Review[]>("/reviews/:id");
export var reviewHistories: Review[] = [];
interface successProps {
  onSuccess: (data: Review) => void;
}

export const getReviews = async () => {
  const reviews = itemsStore.getState().reviews;
  if (reviews.length > 0) {
    return reviews;
  }
  var collectionRef = collection(db, "reviewCollection");
  var q = query(collectionRef, orderBy("dateTime", "desc"));
  var docSnap = await getDocs(q);
  var items = docSnap.docs.map(
    (doc) => ({ id: doc.id, ...doc.data() } as Review)
  );
  itemsStore.getState().setReview(items);
  return items;
};

export const useAddReview = ({ onSuccess }: successProps) => {
  const postClient = new ApiClient<Review>("/reviews");
  return postClient.post({
    key: ["review-post"],
    onSuccess: onSuccess,
    fn: async (data: Review) => {
      await setDoc(doc(db, "reviewCollection", data.id), data);
      const reviews = itemsStore.getState().reviews;
      itemsStore.getState().setReview([...reviews, data]);
      return data;
    },
  });
};

export const useReviews = () =>
  apiClient.get({
    key: ["reviews"],
    fn: async () => {
      const responseOne = await getReviews();
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
      return reviews.reverse();
    },
  });
const useReview = (productId: string) =>
  apiClient.get({
    key: ["reviews", productId],
    fn: async () => {
      const response = await getReviews();
      /* var response: Review[] = [];
      if (reviewHistories.length < 1) {
        reviewHistories = responseOne;
        response = responseOne;
      } else {
        response = reviewHistories;
      } */
      const reviews = response.filter(
        (review) => review.productId === productId
      );
      reviews.sort(
        (a, b) =>
          new Date(a.dateTime).getTime() - new Date(b.dateTime).getTime()
      );
      return reviews.reverse();
    },
  });
export default useReview;
