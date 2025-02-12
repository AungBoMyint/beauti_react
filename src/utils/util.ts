import AppUser from "@/entity/AppUser";
import authStore from "@/hooks/authStore";
import itemsStore from "@/hooks/itemsStore";

export const initAuth = () => {
  const user: AppUser = JSON.parse(localStorage.getItem("user") || "{}");
  const currentUser = authStore.getState().currentUser;
  if (user && user.emailAddress && !currentUser) {
    //we set user
    authStore.getState().setUser!(user);
  }
};
const utilMethod = () => {
  //for auth
  const user: AppUser = JSON.parse(localStorage.getItem("user") || "{}");
  const currentUser = authStore.getState().currentUser;
  if (user && user.emailAddress && !currentUser) {
    //we set user
    authStore.getState().setUser!(user);
  }
  //for items
  itemsStore.getState().fetchData();
};

export default utilMethod;
