import ApiClient from "@/utils/ApiClient";
import Status from "@/entity/Status";
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

const apiClient = new ApiClient<Status[]>("/status");
export const useDeleteStatus = (success: () => void) => {
  return useMutation({
    mutationFn: async (id: string) => {
      const docRef = doc(db, "statusCollection", id);
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
export const useCreateStatus = (success: () => void) => {
  return useMutation({
    mutationFn: async (pro: Status) => {
      const docRef = doc(db, "statusCollection", pro.id);
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
export const useUpdateStatus = (success: () => void) => {
  return useMutation({
    mutationFn: async (pro: Status) => {
      const docRef = doc(db, "statusCollection", pro.id);
      return await updateDoc(docRef, { ...pro });
    },
    onSuccess: () => {
      success();
    },
  });
};
const useStatus = () =>
  apiClient.get({
    key: ["status"],
    fn: async () => {
      var collectionRef = collection(db, "statusCollection");
      var q = query(collectionRef, orderBy("dateTime", "desc"));
      var docSnap = await getDocs(q);
      return docSnap.docs.map(
        (doc) => ({ id: doc.id, ...doc.data() } as Status)
      );
    },
  });
export default useStatus;
