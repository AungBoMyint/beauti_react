import ApiClient from "@/utils/ApiClient";
import townshipCollection from "../assets/data/divisions.json";
import Division from "@/entity/Division";
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

const apiClient = new ApiClient<Division[]>("/townships");
export const useDeleteDivision = (success: () => void) => {
  return useMutation({
    mutationFn: async (id: string) => {
      const docRef = doc(db, "divisions", id);
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
export const useCreateDivision = (success: () => void) => {
  return useMutation({
    mutationFn: async (division: Division) => {
      const docRef = doc(db, "divisions", division.id);
      return await setDoc(docRef, division);
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
export const useUpdateDivision = (success: () => void) => {
  return useMutation({
    mutationFn: async (division: Division) => {
      const docRef = doc(db, "divisions", division.id);
      return await updateDoc(docRef, { ...division });
    },
    onSuccess: () => {
      success();
    },
  });
};
export const useDivisions = () =>
  apiClient.get({
    key: ["divisions"],
    fn: async () => {
      var collectionRef = collection(db, "divisions");
      var q = query(collectionRef, orderBy("dateTime", "desc"));
      var docSnap = await getDocs(q);
      return docSnap.docs.map(
        (doc) => ({ id: doc.id, ...doc.data() } as Division)
      );
    },
  });
