import ApiClient from "@/utils/ApiClient";
import townshipCollection from "../assets/data/divisions.json";
import Division from "@/entity/Division";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "@/firebaseConfig";

const apiClient = new ApiClient<Division[]>("/townships");
export const useDivisions = () =>
  apiClient.get({
    key: ["divisions"],
    fn: async () => {
      var collectionRef = collection(db, "divisions");
      var q = query(collectionRef, orderBy("dateTime", "desc"));
      var docSnap = await getDocs(q);
      return docSnap.docs.map(
        (doc) => ({ id: doc.id, ...doc.data() } as Division)
      );
    },
  });
