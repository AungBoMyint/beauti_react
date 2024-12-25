import { produce } from "immer";
import { create } from "zustand";

interface Props {
  selected_nav: string;
  changeNavItem: (value: string) => void;
}

const useNavStore = create<Props>((set) => ({
  selected_nav: "/",
  changeNavItem: (value: string) =>
    set(
      produce<Props>((state) => {
        state.selected_nav = value;
      })
    ),
}));

export default useNavStore;
