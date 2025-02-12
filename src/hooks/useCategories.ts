import Category from "@/entity/Category";
import ApiClient from "@/utils/ApiClient";
import categories from "../assets/data/categories.json";
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

const apiClient = new ApiClient<Category[]>("/categories");
export const useDeleteCategory = (success: () => void) => {
  return useMutation({
    mutationFn: async (id: string) => {
      const docRef = doc(db, "categories", id);
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
export const useCreateCategory = (success: () => void) => {
  return useMutation({
    mutationFn: async (category: Category) => {
      const docRef = doc(db, "categories", category.id);
      return await setDoc(docRef, category);
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
export const useUpdateCategory = (success: () => void) => {
  return useMutation({
    mutationFn: async (category: Category) => {
      const docRef = doc(db, "categories", category.id);
      return await updateDoc(docRef, { ...category });
    },
    onSuccess: () => {
      success();
    },
  });
};
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
