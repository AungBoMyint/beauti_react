import AppUser from "@/entity/AppUser";
import { produce } from "immer";
import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";

interface Props {
  currentUser?: AppUser | undefined;
  remainPoint: number;
  increasePoint?: (value: number) => void;
  decreasePoint?: (value: number) => void;
  setUser?: (user?: AppUser | undefined) => void;
}
const initialValue: Props = {
  remainPoint: 0,
};
const authStore = create<Props>()(
  subscribeWithSelector((set) => ({
    ...initialValue,
    setUser: (user?: AppUser | undefined) =>
      set((state) =>
        produce(state, (draf) => {
          draf.currentUser = user;
          draf.remainPoint = user?.points ?? 0;
        })
      ),
    increasePoint: (value: number) =>
      set((state) =>
        produce(state, (draf) => {
          draf.remainPoint += value;
        })
      ),
    decreasePoint: (value: number) =>
      set((state) =>
        produce(state, (draf) => {
          draf.remainPoint -= value;
        })
      ),
  }))
);

export default authStore;
