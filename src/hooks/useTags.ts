import Tag from "@/entity/Tag";
import ApiClient from "@/utils/ApiClient";
import tagCollection from "../assets/data/tagsCollection.json";
import { collection, getDocs, orderBy, query } from "@firebase/firestore";
import { db } from "@/firebaseConfig";

const apiClient = new ApiClient<Tag[]>("/tags");
const useTags = () =>
  apiClient.get({
    key: ["tags"],
    fn: async () => {
      var collectionRef = collection(db, "tagsCollection");
      var q = query(collectionRef, orderBy("dateTime", "desc"));
      var docSnap = await getDocs(q);
      return docSnap.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Tag));
    },
  });
export default useTags;
