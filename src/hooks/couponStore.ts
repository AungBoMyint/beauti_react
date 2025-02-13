import Coupon from "@/entity/Coupon";
import { produce } from "immer";
import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";

interface Props {
  coupons: Coupon[] | undefined;
  setCoupons: (value: Coupon[]) => void;
}
const initialValue = {
  coupons: undefined,
};
const couponStore = create<Props>()(
  subscribeWithSelector((set, get) => ({
    ...initialValue,
    setCoupons: (value: Coupon[]) =>
      set((state) =>
        produce(state, (draf) => {
          draf.coupons = value;
        })
      ),
  }))
);
export default couponStore;
