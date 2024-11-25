// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDQRR08HIZL2IrTBSSRFXYjQez0shcJ3L8",
  authDomain: "ecommerce-f9fad.firebaseapp.com",
  projectId: "ecommerce-f9fad",
  storageBucket: "ecommerce-f9fad.firebasestorage.app",
  messagingSenderId: "913997750634",
  appId: "1:913997750634:web:c13a65384da94226154513",
  measurementId: "G-TRH78673KH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app)
// const analytics = getAnalytics(app);    