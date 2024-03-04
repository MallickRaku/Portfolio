// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBpoKuyT2-1uIIZjQ1K9NgDVq-DW67MRxQ",
  authDomain: "portfolio-e88a2.firebaseapp.com",
  projectId: "portfolio-e88a2",
  storageBucket: "portfolio-e88a2.appspot.com",
  messagingSenderId: "1057604023189",
  appId: "1:1057604023189:web:54165f2442d801f55c7c9c",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore(app);
