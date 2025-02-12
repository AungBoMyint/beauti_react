import Category from "@/entity/Category";
import ApiClient from "@/utils/ApiClient";
import categories from "../assets/data/categories.json";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "@/firebaseConfig";

const apiClient = new ApiClient<Category[]>("/categories");

const useCategories = () => {
  return apiClient.get({
    key: ["categories"],
    //staleTime: 1000 * 60 * 5,
    fn: async () => {
      var collectionRef = collection(db, "categories");
      var q = query(collectionRef, orderBy("dateTime", "desc"));
      var docSnap = await getDocs(q);
      return docSnap.docs.map(
        (doc) => ({ id: doc.id, ...doc.data() } as Category)
      );
    },
    /* initialData: () => {
      const newCategories = Object.values(categories.data);
      newCategories.sort(
        (a, b) =>
          new Date(a.dateTime).getTime() - new Date(b.dateTime).getTime()
      );
      return newCategories.reverse();
    }, */
  });
};

export default useCategories;
