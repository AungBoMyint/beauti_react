import CartItem from "@/entity/Cartitem";
import Item from "@/entity/Item";
import Promotion from "@/entity/Promotion";
import Township from "@/entity/Township";
import { produce } from "immer";
import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";
import authStore from "./authStore";

interface Props {
  cartItems: CartItem[];
  promotionValue: Promotion | undefined;
  address: Township;
  subTotal: number;
  grandTotal: number;
  needToBuyMore: boolean;
  pointError: boolean;
  bankSlip?: File | undefined;
  setPointError: (value: boolean) => void;
  setAddress: (township: Township) => void;
  getCount: (productId: string) => number;
  isAdded: (productId: string) => boolean;
  addItem: (item: CartItem | Item, size?: string | null) => void;
  removeItem: (item: CartItem | Item) => void;
  updateAllTotal: () => void;
  setPromotionValue: (value: Promotion | undefined) => void;
  setBankSlip: (value: File) => void;
  resetState: () => void;
}
const initialValue = {
  cartItems: [],
  promotionValue: undefined,
  needToBuyMore: false,
  address: { fee: 0 } as Township,
  subTotal: 0,
  grandTotal: 0,
  pointError: false,
};
const useCart = create<Props>()(
  subscribeWithSelector((set, get) => ({
    ...initialValue,
    resetState: () => set(() => ({ ...initialValue })),
    setBankSlip: (value: File) =>
      set((state) =>
        produce(state, (draf) => {
          draf.bankSlip = value;
        })
      ),

    setPointError: (value: boolean) =>
      set((state) =>
        produce(state, (draf) => {
          draf.pointError = value;
        })
      ),
    setAddress: (township: Township) =>
      set((state) =>
        produce(state, (draf) => {
          draf.address = township;
        })
      ),
    setPromotionValue: (value: Promotion | undefined) =>
      set((state) =>
        produce(state, (draf) => {
          draf.promotionValue = value;
        })
      ),
    getCount: (productId: string) => {
      var cartItems = get().cartItems;
      var item = cartItems.find((i) => i.id === productId);
      return item ? item.count : 0;
    },
    isAdded: (productId: string) => {
      var cartItems = get().cartItems;
      var item = cartItems.find((i) => i.id === productId);
      return item ? true : false;
    },
    updateAllTotal: () =>
      set((state) =>
        produce(state, (draf) => {
          const total = draf.cartItems.reduce((pre, cur) => {
            const isScheduleSale = cur.scheduleSale
              ? new Date(cur.scheduleSale.endTime).getTime() >
                new Date().getTime()
              : false;
            const scheduleSale = cur.scheduleSale?.price ?? 0;
            return (
              pre +
              (cur.requirePoint > 0
                ? 0
                : isScheduleSale
                ? scheduleSale
                : cur.discountPrice > 0
                ? cur.discountPrice
                : parseInt(`${cur.price}`)) *
                cur.count
            );
          }, 0);
          draf.subTotal = total;
          //we calculate promotion if have
          draf.needToBuyMore = false;
          draf.grandTotal = total + draf.address.fee;
          if (draf.promotionValue) {
            if (total > draf.promotionValue.restrictValue) {
              //we can apply discount
              if (draf.promotionValue.promotionValue.includes("%")) {
                //discount with percentage
                const promo = draf.promotionValue.promotionValue.replace(
                  "%",
                  ""
                );
                const value = (parseInt(promo) / 100) * total;
                draf.grandTotal = total - value + draf.address.fee;
              } else {
                //discount with number
                const promo = draf.promotionValue.promotionValue.replace(
                  "Ks",
                  ""
                );
                const value = parseInt(promo);
                draf.grandTotal = total - value + draf.address.fee;
              }
            } else {
              //need to buy more
              draf.needToBuyMore = true;
            }
          }
        })
      ),
    addItem: (item: CartItem | Item, size?: string | null) => {
      set((state) =>
        produce(state, (draf) => {
          const index = draf.cartItems.findIndex((i) => i.id === item.id);
          const remainPoint = authStore.getState().remainPoint;
          if (item.requirePoint && item.requirePoint > 0) {
            if (remainPoint !== 0 && remainPoint >= item.requirePoint) {
              //we can add,we reduce remain point and set error to undenfied
              authStore.getState().decreasePoint!(item.requirePoint);
              draf.pointError = false;
            } else {
              draf.pointError = true;
              return;
            }
          }
          if (index >= 0) {
            //increase
            draf.cartItems[index].count += 1;
          } else {
            const productItem = item as Item;
            //just add new
            draf.cartItems.push({
              scheduleSale: productItem?.scheduleSale,
              image: productItem.photo1 ?? "",
              color: productItem.color,
              count: 1,
              discountPrice: productItem.discountPrice ?? 0,
              id: productItem.id,
              itemName: productItem.name,
              price: productItem.price,
              remainQuantity: productItem.remainQuantity,
              requirePoint: productItem.requirePoint ?? 0,
              size: size ?? "",
            });
          }
        })
      );
    },
    removeItem: (item: CartItem | Item) =>
      set((state) =>
        produce(state, (draf) => {
          const index = draf.cartItems.findIndex((i) => i.id === item.id);
          const remainPoint = authStore.getState().remainPoint;
          if (
            item.requirePoint &&
            item.requirePoint > 0 &&
            index >= 0 &&
            remainPoint > 0
          ) {
            authStore.getState().increasePoint!(item.requirePoint);
            draf.pointError = false;
          }
          if (index >= 0) {
            //decrease
            if (draf.cartItems[index].count > 1) {
              draf.cartItems[index].count -= 1;
            } else {
              //remove
              draf.cartItems = draf.cartItems.filter((i) => i.id !== item.id);
            }
          }
        })
      ),
  }))
);

useCart.subscribe(
  (state) => ({
    cartItems: state.cartItems,
    promotionValue: state.promotionValue,
    address: state.address,
  }),
  (cState, pState) => {
    if (
      cState.cartItems !== pState.cartItems ||
      cState.promotionValue !== pState.promotionValue ||
      cState.address !== pState.address
    ) {
      const updateAllTotal = useCart.getState().updateAllTotal;
      updateAllTotal();
    }
  }
);
export default useCart;
