// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBLNC_tkODiyW_T08vYFMkMdoxz2poEFZc",
  authDomain: "kibothreads.firebaseapp.com",
  projectId: "kibothreads",
  storageBucket: "kibothreads.appspot.com",
  messagingSenderId: "178883860815",
  appId: "1:178883860815:web:25d90e7887632a26e18d3a",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const fireDB = getFirestore(app);
const auth = getAuth(app);
export { fireDB, auth };
