import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyC_LNe_IqEumsJ1aoyvCU_muY5WMG2zo80",
  authDomain: "chunkydunks.firebaseapp.com",
  projectId: "chunkydunks",
  storageBucket: "chunkydunks.appspot.com",
  messagingSenderId: "1048303855200",
  appId: "1:1048303855200:web:6456b9d8e9adfbd373c505",
  measurementId: "G-PJFE8QS1BJ"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const storage = getStorage(app);