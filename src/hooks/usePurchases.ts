import Purchase from "@/entity/Purchase";
import ApiClient from "@/utils/ApiClient";
import purchaseCollection from "../assets/data/purchases.json";
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

const apiClient = new ApiClient<Purchase[]>("/purchases");
export const useDeletePurchase = (success: () => void) => {
  return useMutation({
    mutationFn: async (id: string) => {
      const docRef = doc(db, "purchases", id);
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
export const useCreatePurchase = (success: () => void) => {
  return useMutation({
    mutationFn: async (pro: Purchase) => {
      const docRef = doc(db, "purchases", pro.id);
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
export const useUpdatePurchase = (success: () => void) => {
  return useMutation({
    mutationFn: async (pro: Purchase) => {
      const docRef = doc(db, "purchases", pro.id);
      return await updateDoc(docRef, { ...pro });
    },
    onSuccess: () => {
      success();
    },
  });
};
const getPurchases = async () => {
  const purchases = itemsStore.getState().purchases;
  if (purchases.length > 0) {
    return purchases;
  }
  var collectionRef = collection(db, "purchases");
  var q = query(collectionRef, orderBy("dateTime", "desc"));
  var docSnap = await getDocs(q);
  var items = docSnap.docs.map(
    (doc) => ({ id: doc.id, ...doc.data() } as Purchase)
  );
  itemsStore.getState().setPurchase(items);
  return items;
};
export const addPurchase = async (value: Purchase) => {
  var docRef = doc(db, "purchases", value.id);
  return await setDoc(docRef, value);
};
const usePurchases = (status: string) =>
  apiClient.get({
    key: ["purchases", status],
    fn: async () => {
      const responseOne = await getPurchases();
      var result: Purchase[] = [];
      if (status === "Cash") {
        result = responseOne.filter((item) => item.bankSlipImage === null);
      } else if (status === "Pre") {
        result = responseOne.filter((item) => item.bankSlipImage !== null);
      }
      result = result.sort(
        (a, b) =>
          new Date(a.dateTime).getTime() - new Date(b.dateTime).getTime()
      );
      return result.reverse();
    },
  });

export const usePurchaseHistory = (userId: string) =>
  apiClient.get({
    key: ["purchases", userId],
    fn: async () => {
      const responseOne = await getPurchases();
      var result: Purchase[] = responseOne.filter(
        (item) => item?.userId === userId
      );
      result = result.sort(
        (a, b) =>
          new Date(a.dateTime).getTime() - new Date(b.dateTime).getTime()
      );
      return result.reverse();
    },
  });
export default usePurchases;
