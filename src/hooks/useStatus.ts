import ApiClient from "@/utils/ApiClient";
import statusCollection from "../assets/data/statusCollection.json";
import Status from "@/entity/Status";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "@/firebaseConfig";

const apiClient = new ApiClient<Status[]>("/status");
const useStatus = () =>
  apiClient.get({
    key: ["status"],
    fn: async () => {
      var collectionRef = collection(db, "statusCollection");
      var q = query(collectionRef, orderBy("dateTime", "desc"));
      var docSnap = await getDocs(q);
      return docSnap.docs.map(
        (doc) => ({ id: doc.id, ...doc.data() } as Status)
      );
    },
  });
export default useStatus;
