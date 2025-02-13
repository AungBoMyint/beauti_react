import AppUser from "@/entity/AppUser";
import { useMutation, useQuery } from "@tanstack/react-query";
import authStore from "./authStore";
import { useNavigate } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth, db } from "@/firebaseConfig";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";

export const useCurrentUser = (id: string) => {
  return useQuery({
    queryKey: ["current-user"],
    queryFn: async () => {
      var docRef = doc(db, "adminUserCollection", id);
      return await getDoc(docRef);
    },
  });
};
export const useUpdatePoint = async (grandTotal: number) => {
  const currentUser = authStore.getState().currentUser;
  const remainPoint = authStore.getState().remainPoint;
  const finalPoint = remainPoint + grandTotal * 0.001;
  var docRef = doc(db, "adminUserCollection", currentUser?.id ?? "");
  await updateDoc(docRef, {
    points: finalPoint,
  });
  var finalUser = {
    ...currentUser,
    points: finalPoint,
  };
  authStore.getState().setUser!(finalUser as AppUser);
  localStorage.setItem("user", JSON.stringify(finalUser));
};
export const useLogin = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationKey: ["login"],
    mutationFn: async (user: AppUser) => {
      var credential = await signInWithEmailAndPassword(
        auth,
        user.emailAddress,
        user.password
      );
      var docRef = doc(db, "adminUserCollection", credential.user.uid);
      var docSnap = await getDoc(docRef);
      console.log(docSnap.data());
      return docSnap.data();
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
      var credential = await createUserWithEmailAndPassword(
        auth,
        user.emailAddress,
        user.password
      );
      //we find doc exit or not,if not exist we create
      var docRef = doc(db, "adminUserCollection", credential.user.uid);
      var docSnap = await getDoc(docRef);
      user = {
        ...user,
        id: credential.user.uid,
        userName: credential.user.displayName!,
      };
      if (!docSnap.exists()) {
        await setDoc(docRef, user);
      }
      return user;
    },
    onSuccess: (result) => {
      //set to local storage
      localStorage.setItem("user", JSON.stringify(result));
      authStore.getState().setUser!(result as AppUser);
      navigate("/account");
    },
  });
};
