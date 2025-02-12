import ApiClient from "@/utils/ApiClient";
import brandCollection from "../assets/data/brandCollection.json";
import Brand from "@/entity/Brand";
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

const apiClient = new ApiClient<Brand[]>("/brands");
export const useDeleteBrand = (success: () => void) => {
  return useMutation({
    mutationFn: async (id: string) => {
      const docRef = doc(db, "brandCollection", id);
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
export const useCreateBrand = (success: () => void) => {
  return useMutation({
    mutationFn: async (brand: Brand) => {
      const docRef = doc(db, "brandCollection", brand.id);
      return await setDoc(docRef, brand);
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
export const useUpdateBrand = (success: () => void) => {
  return useMutation({
    mutationFn: async (brand: Brand) => {
      const docRef = doc(db, "brandCollection", brand.id);
      return await updateDoc(docRef, { ...brand });
    },
    onSuccess: () => {
      success();
    },
  });
};
const useBrand = () => {
  return apiClient.get({
    key: ["brands"],
    fn: async () => {
      var collectionRef = collection(db, "brandCollection");
      var q = query(collectionRef, orderBy("dateTime", "desc"));
      var docSnap = await getDocs(q);
      return docSnap.docs.map(
        (doc) => ({ id: doc.id, ...doc.data() } as Brand)
      );
    },
  });
};
export default useBrand;
