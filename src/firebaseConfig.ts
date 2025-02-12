import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

// TODO: Replace the following with your app's Firebase project configuration
// See: https://support.google.com/firebase/answer/7015592
const firebaseConfig = {
  apiKey: "AIzaSyA97gE4YaSI2fJ8wS5U-tKh28MTnzbq56U",
  authDomain: "beauti-74413.firebaseapp.com",
  projectId: "beauti-74413",
  storageBucket: "beauti-74413.appspot.com",
  messagingSenderId: "837171897048",
  appId: "1:837171897048:web:a33763f510721cedbfadad",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
