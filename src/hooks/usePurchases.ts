import Purchase from "@/entity/Purchase";
import ApiClient from "@/utils/ApiClient";
import purchaseCollection from "../assets/data/purchases.json";
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

const apiClient = new ApiClient<Purchase[]>("/purchases");
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
