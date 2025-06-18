
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBDpbYgy6wwL7y76zGyPry2WVv9wtzb1lA",
  authDomain: "ilacasistani.firebaseapp.com",
  projectId: "ilacasistani",
  storageBucket: "ilacasistani.firebasestorage.app",
  messagingSenderId: "1078855093465",
  appId: "1:1078855093465:web:1c0b525312092e9f2b02c8",
  measurementId: "G-CDV4JXY8E9"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };