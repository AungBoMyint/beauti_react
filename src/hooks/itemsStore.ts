import Item from "@/entity/Item";
import Promotion from "@/entity/Promotion";
import Purchase from "@/entity/Purchase";
import Review from "@/entity/Review";
import { db } from "@/firebaseConfig";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { produce } from "immer";
import { create } from "zustand";

interface StoreState {
  items: Item[]; // Replace 'any[]' with the actual type of your API response
  promotions: Promotion[];
  purchases: Purchase[];
  reviews: Review[];
  isLoading: boolean;
  hasFetched: boolean;
  fetchData: () => Promise<void>;
  setPromotion: (values: Promotion[]) => void;
  setPurchase: (values: Purchase[]) => void;
  setReview: (values: Review[]) => void;
}
const initialValue = {
  items: [],
  promotions: [],
  purchases: [],
  reviews: [],
  isLoading: true,
  hasFetched: false,
};
const itemsStore = create<StoreState>((set, get) => ({
  ...initialValue, // Prevent multiple API calls
  setReview: (values: Review[]) =>
    set((state) =>
      produce(state, (draf) => {
        draf.reviews = values;
      })
    ),
  setPurchase: (values: Purchase[]) =>
    set((state) =>
      produce(state, (draf) => {
        draf.purchases = values;
      })
    ),
  setPromotion: (values: Promotion[]) =>
    set((state) =>
      produce(state, (draf) => {
        draf.promotions = values;
      })
    ),
  fetchData: async () => {
    if (get().hasFetched) return; // Skip if already fetched

    try {
      var collectionRef = collection(db, "items");
      var q = query(collectionRef, orderBy("dateTime", "desc"));
      var docSnap = await getDocs(q);
      var items = docSnap.docs.map(
        (doc) => ({ id: doc.id, ...doc.data() } as Item)
      );
      set({ items: items, isLoading: false, hasFetched: true });
    } catch (error) {
      console.error("Error fetching data:", error);
      set({ isLoading: false });
    }
  },
}));

export default itemsStore;
