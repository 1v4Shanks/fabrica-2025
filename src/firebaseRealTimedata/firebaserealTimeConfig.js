// Import the functions you need from the SDKs you need
import { getApps, initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";
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
  databaseURL: "https://fabrica-2025-default-rtdb.firebaseio.com/",
};

// Initialize Firebase
const app =
  getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
export const database = getDatabase(app);
export default app;
const analytics = getAnalytics(app);
