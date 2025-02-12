import ApiClient from "@/utils/ApiClient";
import advertisementColection2 from "../assets/data/advertisementColection2.json";
import Advertisement from "@/entity/Advertisement";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "@/firebaseConfig";

const apiClient = new ApiClient<Advertisement[]>("/advertisement1");
const useAdvertisementTwo = () => {
  return apiClient.get({
    key: ["advertisement2"],
    fn: async () => {
      var collectionRef = collection(db, "advertisementColection2");
      var q = query(collectionRef, orderBy("dateTime", "desc"));
      var docSnap = await getDocs(q);
      return docSnap.docs.map(
        (doc) => ({ id: doc.id, ...doc.data() } as Advertisement)
      );
    },
  });
};
export default useAdvertisementTwo;
