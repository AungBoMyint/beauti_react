import Tag from "@/entity/Tag";
import ApiClient from "@/utils/ApiClient";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  setDoc,
  updateDoc,
} from "@firebase/firestore";
import { db } from "@/firebaseConfig";
import { useMutation } from "@tanstack/react-query";
import { toaster } from "@/components/ui/toaster";

const apiClient = new ApiClient<Tag[]>("/tags");
export const useDeleteTag = (success: () => void) => {
  return useMutation({
    mutationFn: async (id: string) => {
      const docRef = doc(db, "tagsCollection", id);
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
export const useCreateTag = (success: () => void) => {
  return useMutation({
    mutationFn: async (pro: Tag) => {
      const docRef = doc(db, "tagsCollection", pro.id);
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
export const useUpdateTag = (success: () => void) => {
  return useMutation({
    mutationFn: async (pro: Tag) => {
      const docRef = doc(db, "tagsCollection", pro.id);
      return await updateDoc(docRef, { ...pro });
    },
    onSuccess: () => {
      success();
    },
  });
};
const useTags = () =>
  apiClient.get({
    key: ["tags"],
    fn: async () => {
      var collectionRef = collection(db, "tagsCollection");
      var q = query(collectionRef, orderBy("dateTime", "desc"));
      var docSnap = await getDocs(q);
      return docSnap.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Tag));
    },
  });
export default useTags;
