import ApiClient from "@/utils/ApiClient";
import AppUser from "@/entity/AppUser";
import { useMutation } from "@tanstack/react-query";
import authStore from "./authStore";
import { useNavigate } from "react-router-dom";

const apiClient = new ApiClient<AppUser>("/user");
export const useLogin = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationKey: ["login"],
    mutationFn: async (user: AppUser) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(user);
        }, 500);
      });
    },
    onSuccess: (result) => {
      //set to local storage
      localStorage.setItem("user", JSON.stringify(result));
      authStore.getState().setUser!(result as AppUser);
      navigate("/account");
    },
  });
};
export const useRegister = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationKey: ["register"],
    mutationFn: async (user: AppUser) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(user);
        }, 500);
      });
    },
    onSuccess: (result) => {
      //set to local storage
      localStorage.setItem("user", JSON.stringify(result));
      authStore.getState().setUser!(result as AppUser);
      navigate("/account");
    },
  });
};
