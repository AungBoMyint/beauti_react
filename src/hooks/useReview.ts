import ApiClient from "@/utils/ApiClient";
import Review from "@/entity/Review";
import itemsStore from "./itemsStore";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "@/firebaseConfig";
import { useMutation } from "@tanstack/react-query";
import { toaster } from "@/components/ui/toaster";

const apiClient = new ApiClient<Review[]>("/reviews/:id");
interface successProps {
  onSuccess: (data: Review) => void;
}

export const useApproveReview = (success: () => void) => {
  return useMutation({
    mutationFn: async (id: string) => {
      const docRef = doc(db, "reviewCollection", id);
      return await updateDoc(docRef, { approved: true });
    },
    onSuccess: () => {
      success();
    },
  });
};
export const useVerifyReview = (success: () => void) => {
  return useMutation({
    mutationFn: async (id: string) => {
      const docRef = doc(db, "reviewCollection", id);
      return await updateDoc(docRef, { verifiedPurchase: true });
    },
    onSuccess: () => {
      success();
    },
  });
};
export const useDeleteReview = (success: () => void) => {
  return useMutation({
    mutationFn: async (id: string) => {
      const docRef = doc(db, "reviewCollection", id);
      return await deleteDoc(docRef);
    },
    onSuccess: () => {
      success();
    },
    onError: (error) => {
      toaster.create({
        title: `Error: ${error.message}`,
        type: "error",
      });
    },
  });
};
export const useCreateReview = (success: () => void) => {
  return useMutation({
    mutationFn: async (pro: Review) => {
      const docRef = doc(db, "reviewCollection", pro.id);
      return await setDoc(docRef, pro);
    },
    onSuccess: () => {
      success();
    },
    onError: (error) => {
      toaster.create({
        title: `Error: ${error.message}`,
        type: "error",
      });
    },
  });
};
export const useUpdateReview = (success: () => void) => {
  return useMutation({
    mutationFn: async (pro: Review) => {
      const docRef = doc(db, "reviewCollection", pro.id);
      return await updateDoc(docRef, { ...pro });
    },
    onSuccess: () => {
      success();
    },
  });
};
export const getReviews = async () => {
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
      /* var response: Review[] = [];
      if (reviewHistories.length < 1) {
        reviewHistories = responseOne;
        response = responseOne;
      } else {
        response = reviewHistories;
      }
      const reviews = response; */
      /* reviews.sort(
        (a, b) =>
          new Date(a.dateTime).getTime() - new Date(b.dateTime).getTime()
      ); */
      return responseOne;
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
