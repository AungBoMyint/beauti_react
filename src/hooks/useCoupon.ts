import Coupon from "@/entity/Coupon";
import ApiClient from "@/utils/ApiClient";
import couponCollection from "../assets/data/coupons.json";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "@/firebaseConfig";

const apiClient = new ApiClient<Coupon[]>("/coupons");
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
