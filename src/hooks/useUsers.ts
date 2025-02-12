import ApiClient from "@/utils/ApiClient";
import AppUser from "@/entity/AppUser";
import { collection, getDocs, query } from "firebase/firestore";
import { db } from "@/firebaseConfig";

const apiClient = new ApiClient<AppUser[]>("/users");
const useUsers = () =>
  apiClient.get({
    key: ["users"],
    fn: async () => {
      var collectionRef = collection(db, "adminUserCollection");
      var q = query(collectionRef);
      var docSnap = await getDocs(q);
      return docSnap.docs.map(
        (doc) => ({ id: doc.id, ...doc.data() } as AppUser)
      );
    },
  });
export default useUsers;
