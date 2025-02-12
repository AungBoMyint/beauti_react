import ApiClient from "@/utils/ApiClient";
import promotionCollections from "../assets/data/promotions.json";
import Promotion from "@/entity/Promotion";
import { set } from "react-hook-form";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "@/firebaseConfig";
import itemsStore from "./itemsStore";

const apiClient = new ApiClient<Promotion[]>("/promotions");
const getPromotions = async () => {
  const promotions = itemsStore.getState().promotions;
  if (promotions.length > 0) {
    return promotions;
  }
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
      const response = await getPromotions();
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
