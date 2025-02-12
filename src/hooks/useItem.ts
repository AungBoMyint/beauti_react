import ApiClient from "@/utils/ApiClient";
import Item from "@/entity/Item";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { db } from "@/firebaseConfig";
import itemStore from "./itemsStore";

interface FilterItemProps {
  categoryName: string;
  sortName: string;
  oldItems: Item[];
}
const apiClient = new ApiClient<Item[]>("/items");

const getItems = async () => {
  const storeItems = itemStore.getState().items;
  if (storeItems.length > 0) {
    return storeItems;
  }
  var collectionRef = collection(db, "items");
  var q = query(collectionRef, orderBy("dateTime", "desc"));
  var docSnap = await getDocs(q);
  var items = docSnap.docs.map(
    (doc) => ({ id: doc.id, ...doc.data() } as Item)
  );
  return items;
};
export const useItems = () =>
  apiClient.get({
    key: ["items"],
    fn: async () => {
      var collectionRef = collection(db, "items");
      var q = query(collectionRef, orderBy("dateTime", "desc"));
      var docSnap = await getDocs(q);
      var items = docSnap.docs.map(
        (doc) => ({ id: doc.id, ...doc.data() } as Item)
      );
      /* itemStore.getState().setItems(items); */
      return items;
    },
  });

export const useFilterStatusItem = (status: string) =>
  apiClient.get({
    key: ["items", status],
    fn: async () => {
      const response = await getItems();
      response.sort(
        (a, b) =>
          new Date(a.dateTime).getTime() - new Date(b.dateTime).getTime()
      );
      //find items equal to status
      const result = response.filter(
        (item) => item.status?.trim() === status?.trim()
      );
      return result.reverse();
    },
  });
export const useFilterCategoryItem = (category: string) =>
  apiClient.get({
    key: ["items", category],
    fn: async () => {
      const response = await getItems();
      response.sort(
        (a, b) =>
          new Date(a.dateTime).getTime() - new Date(b.dateTime).getTime()
      );
      //find items equal to status
      const result = response.filter(
        (item) => item.category && item.category?.includes(category.trim())
      );
      return result.reverse();
    },
  });
export const useFilterBrandItem = (brandName: string) =>
  apiClient.get({
    key: ["items", brandName],
    fn: async () => {
      const response = await getItems();
      response.sort(
        (a, b) =>
          new Date(a.dateTime).getTime() - new Date(b.dateTime).getTime()
      );
      //find items equal to status
      const result = response.filter(
        (item) =>
          item.brandName &&
          item.brandName?.toLowerCase().trim() ===
            brandName.toLowerCase().trim()
      );
      return result.reverse();
    },
  });
export const useFilterItem = ({
  categoryName,
  sortName,
  oldItems,
}: FilterItemProps) =>
  apiClient.get({
    key: ["items", categoryName, sortName],
    fn: async () =>
      new Promise((resolve) => {
        setTimeout(() => {
          const resultOne = oldItems;
          const resultTwo = resultOne.filter((item) =>
            (item.category ?? []).includes(categoryName)
          );

          const finalResult = resultTwo?.length > 0 ? resultTwo : resultOne;
          //we sort lth htl

          switch (sortName) {
            case "lth":
              finalResult
                .sort((a, b) => parseInt(`${a.price}`) - parseInt(`${b.price}`))
                .reverse();
            case "htl":
              finalResult.sort(
                (a, b) =>
                  parseInt(`${a.requirePoint ?? a.price}`) -
                  parseInt(`${b.price}`)
              );

            default:
              break;
          }

          resolve(finalResult);
        }, 500);
      }),
  });
export const useSearchItems = (value: string | undefined) =>
  apiClient.get({
    key: ["items", value ?? ""],
    fn: value
      ? async () => {
          const response = await getItems();
          const result = response.filter((item) => item.name?.includes(value));

          return result;
        }
      : async () => [],
  });
export const useFilterIdItem = (id: string) => {
  const newApiClient = new ApiClient<Item | undefined>(`/items/${id}`);
  return newApiClient.get({
    key: ["items", id],
    fn: async () => {
      const response = await getItems();
      const result = response.find((item) => item.id === id);

      return result;
    },
  });
};
