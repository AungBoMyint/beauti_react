import ApiClient from "@/utils/ApiClient";
import brandCollection from "../assets/data/brandCollection.json";
import Brand from "@/entity/Brand";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "@/firebaseConfig";

const apiClient = new ApiClient<Brand[]>("/brands");
const useBrand = () => {
  return apiClient.get({
    key: ["brands"],
    fn: async () => {
      var collectionRef = collection(db, "brandCollection");
      var q = query(collectionRef, orderBy("dateTime", "desc"));
      var docSnap = await getDocs(q);
      return docSnap.docs.map(
        (doc) => ({ id: doc.id, ...doc.data() } as Brand)
      );
    },
  });
};
export default useBrand;
