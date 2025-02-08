import Coupon from "@/entity/Coupon";
import ApiClient from "@/utils/ApiClient";
import couponCollection from "../assets/data/coupons.json";

const apiClient = new ApiClient<Coupon[]>("/coupons");
export const useCoupons = () =>
  apiClient.get({
    key: ["coupons"],
    fn: async () =>
      new Promise((resolve) => {
        setTimeout(() => {
          const response = Object.values(couponCollection.data) as Coupon[];
          resolve(response);
        }, 500);
      }),
  });
