import AppUser from "@/entity/AppUser";
import authStore from "@/hooks/authStore";
import itemsStore from "@/hooks/itemsStore";

export const initAuth = () => {
  var user: AppUser | undefined = JSON.parse(
    localStorage.getItem("user") || "{}"
  );
  if (!user?.emailAddress) {
    user = undefined;
  }
  const currentUser = authStore.getState().currentUser;
  if (user && user.emailAddress && !currentUser) {
    //we set user
    authStore.getState().setUser!(user);
  }
};
const utilMethod = () => {
  //for auth
  var user: AppUser | undefined = JSON.parse(
    localStorage.getItem("user") || "{}"
  );
  if (!user?.emailAddress) {
    user = undefined;
  }
  const currentUser = authStore.getState().currentUser;
  if (user && user.emailAddress && !currentUser) {
    //we set user
    authStore.getState().setUser!(user);
  }
  //for items
  itemsStore.getState().fetchData();
};

export default utilMethod;
