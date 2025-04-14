// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDkANURI36_N6uRkZctJd7ZvUwOxkvmyOk",
  authDomain: "fabrica-2025.firebaseapp.com",
  projectId: "fabrica-2025",
  storageBucket: "fabrica-2025.firebasestorage.app",
  messagingSenderId: "193313192019",
  appId: "1:193313192019:web:5000506a469a40520a6ea6",
  measurementId: "G-QXMLZNRBYC",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;
const analytics = getAnalytics(app);
