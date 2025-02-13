import Coupon from "@/entity/Coupon";
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
} from "firebase/firestore";
import { db } from "@/firebaseConfig";
import { useMutation } from "@tanstack/react-query";
import { toaster } from "@/components/ui/toaster";
import couponStore from "./couponStore";

const apiClient = new ApiClient<Coupon[]>("/coupons");
export const useDeleteCoupon = (success: () => void) => {
  return useMutation({
    mutationFn: async (id: string) => {
      const docRef = doc(db, "coupons", id);
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
export const useCreateCoupon = (success: () => void) => {
  return useMutation({
    mutationFn: async (coupon: Coupon) => {
      const docRef = doc(db, "coupons", coupon.id);
      return await setDoc(docRef, coupon);
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
export const useUpdateCoupon = (success: () => void) => {
  return useMutation({
    mutationFn: async (coupon: Coupon) => {
      const docRef = doc(db, "coupons", coupon.id);
      return await updateDoc(docRef, { ...coupon });
    },
    onSuccess: () => {
      success();
    },
  });
};
export const useCoupons = () =>
  apiClient.get({
    key: ["coupons"],
    fn: async () => {
      var collectionRef = collection(db, "coupons");
      var q = query(collectionRef, orderBy("dateTime", "desc"));
      var docSnap = await getDocs(q);
      return docSnap.docs.map(
        (doc) => ({ id: doc.id, ...doc.data() } as Coupon)
      );
    },
  });

export const getCoupons = async () => {
  var collectionRef = collection(db, "coupons");
  var q = query(collectionRef, orderBy("dateTime", "desc"));
  var docSnap = await getDocs(q);
  const items = docSnap.docs.map(
    (doc) => ({ id: doc.id, ...doc.data() } as Coupon)
  );
  couponStore.getState().setCoupons(items);
};
export const filterCoupon = (value: string) => {
  const response = couponStore.getState().coupons ?? [];
  const result = response.find((item) => item.code === value);
  return result;
};
