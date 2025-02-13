import ApiClient from "@/utils/ApiClient";
import Advertisement from "@/entity/Advertisement";
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

const apiClient = new ApiClient<Advertisement[]>("/advertisement1");
export const useDeleteAdvertisementTwo = (success: () => void) => {
  return useMutation({
    mutationFn: async (id: string) => {
      const docRef = doc(db, "advertisementColection2", id);
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
export const useCreateAdvertisementTwo = (success: () => void) => {
  return useMutation({
    mutationFn: async (adv: Advertisement) => {
      const docRef = doc(db, "advertisementColection2", adv.id);
      return await setDoc(docRef, adv);
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
export const useUpdateAdvertisementTwo = (success: () => void) => {
  return useMutation({
    mutationFn: async (adv: Advertisement) => {
      const docRef = doc(db, "advertisementColection2", adv.id);
      return await updateDoc(docRef, { ...adv });
    },
    onSuccess: () => {
      success();
    },
  });
};
const useAdvertisementTwo = () => {
  return apiClient.get({
    key: ["advertisement2"],
    fn: async () => {
      var collectionRef = collection(db, "advertisementColection2");
      var q = query(collectionRef, orderBy("dateTime", "desc"));
      var docSnap = await getDocs(q);
      return docSnap.docs.map(
        (doc) => ({ id: doc.id, ...doc.data() } as Advertisement)
      );
    },
  });
};
export default useAdvertisementTwo;
