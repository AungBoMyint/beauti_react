import ApiClient from "@/utils/ApiClient";
import GiftItem from "@/entity/GiftItem";
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

const apiClient = new ApiClient<GiftItem[]>("/birthdayGifts");
export const useDeleteGiftItem = (success: () => void) => {
  return useMutation({
    mutationFn: async (id: string) => {
      const docRef = doc(db, "gift-items", id);
      return await deleteDoc(docRef);
    },
    onSuccess: () => {
      success();
    },
  });
};
export const useCreateGiftItem = (success: () => void) => {
  return useMutation({
    mutationFn: async (product: GiftItem) => {
      const docRef = doc(db, "gift-items", product.id);
      return await setDoc(docRef, product);
    },
    onSuccess: () => {
      success();
    },
  });
};
export const useUpdateGiftItem = (success: () => void) => {
  return useMutation({
    mutationFn: async (product: GiftItem) => {
      const docRef = doc(db, "gift-items", product.id);
      return await updateDoc(docRef, { ...product });
    },
    onSuccess: () => {
      success();
    },
  });
};
export const useGetBirthdayGifts = () => {
  return apiClient.get({
    key: ["birthday-gifts"],
    fn: async () => {
      var collectionRef = collection(db, "gift-items");
      var q = query(collectionRef, orderBy("dateTime", "desc"));
      var docSnap = await getDocs(q);
      var items = docSnap.docs.map(
        (doc) => ({ id: doc.id, ...doc.data() } as GiftItem)
      );
      return items;
    },
  });
};
