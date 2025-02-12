import ApiClient from "@/utils/ApiClient";
import advertisementCollection from "../assets/data/advertisementCollection.json";
import Advertisement from "@/entity/Advertisement";
import { collection, doc, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "@/firebaseConfig";

const apiClient = new ApiClient<Advertisement[]>("/advertisement1");
const useAdvertisementOne = () => {
  return apiClient.get({
    key: ["advertisement1"],
    fn: async () => {
      var collectionRef = collection(db, "advertisementCollection");
      var q = query(collectionRef, orderBy("dateTime", "desc"));
      var docSnap = await getDocs(q);
      return docSnap.docs.map(
        (doc) => ({ id: doc.id, ...doc.data() } as Advertisement)
      );
    },
  });
};
export default useAdvertisementOne;
