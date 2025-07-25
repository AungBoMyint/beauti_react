import Coupon from "@/entity/Coupon";
import Promotion from "@/entity/Promotion";
import { produce } from "immer";
import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";

interface Props {
  coupons: Coupon[] | undefined;
  setCoupons: (value: Coupon[]) => void;
  promotions: Promotion[] | undefined;
  setPromotions: (value: Promotion[]) => void;
}
const initialValue = {
  coupons: undefined,
  promotions: undefined,
};
const couponStore = create<Props>()(
  subscribeWithSelector((set) => ({
    ...initialValue,
    setPromotions: (value: Promotion[]) =>
      set((state) =>
        produce(state, (draf) => {
          draf.promotions = value;
        })
      ),
    setCoupons: (value: Coupon[]) =>
      set((state) =>
        produce(state, (draf) => {
          draf.coupons = value;
        })
      ),
  }))
);
export default couponStore;
