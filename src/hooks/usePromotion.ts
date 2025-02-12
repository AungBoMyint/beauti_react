import ApiClient from "@/utils/ApiClient";
import promotionCollections from "../assets/data/promotions.json";
import Promotion from "@/entity/Promotion";
import { set } from "react-hook-form";
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
import itemsStore from "./itemsStore";
import { useMutation } from "@tanstack/react-query";
import { toaster } from "@/components/ui/toaster";

const apiClient = new ApiClient<Promotion[]>("/promotions");
export const useDeletePromotion = (success: () => void) => {
  return useMutation({
    mutationFn: async (id: string) => {
      const docRef = doc(db, "promotions", id);
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
export const useCreatePromotion = (success: () => void) => {
  return useMutation({
    mutationFn: async (pro: Promotion) => {
      const docRef = doc(db, "promotions", pro.id);
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
export const useUpdatePromotion = (success: () => void) => {
  return useMutation({
    mutationFn: async (pro: Promotion) => {
      const docRef = doc(db, "promotions", pro.id);
      return await updateDoc(docRef, { ...pro });
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
const getPromotions = async () => {
  var collectionRef = collection(db, "promotions");
  var q = query(collectionRef, orderBy("dateTime", "desc"));
  var docSnap = await getDocs(q);
  var items = docSnap.docs.map(
    (doc) => ({ id: doc.id, ...doc.data() } as Promotion)
  );
  itemsStore.getState().setPromotion(items);
  return items;
};
export const usePromotion = () =>
  apiClient.get({
    key: ["promotions"],
    fn: async () => getPromotions(),
  });
export const useSearchPromotion = (value: string) => {
  const apiClient = new ApiClient<Promotion>("/promotions");

  return apiClient.get({
    key: ["promotions", value],
    fn: async () => {
      const promotions = itemsStore.getState().promotions;

      const response =
        promotions.length > 0 ? promotions : await getPromotions();
      const result = response.find((item) => item.code === value);
      return (
        result ?? {
          code: "",
          dateTime: "",
          id: "",
          promotionValue: "",
          restrictValue: 0,
        }
      );
    },
  });
};
export const filterPromotion = (value: string) => {
  const response = Object.values(promotionCollections.data) as Promotion[];
  const result = response.find((item) => item.code === value);
  return result;
};
