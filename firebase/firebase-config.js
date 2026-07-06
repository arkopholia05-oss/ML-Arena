// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAmcqPuhoJG5I6blpK7H7z7joETDfdFnj8",
  authDomain: "ml-arena-15732.firebaseapp.com",
  projectId: "ml-arena-15732",
  storageBucket: "ml-arena-15732.firebasestorage.app",
  messagingSenderId: "1002972634615",
  appId: "1:1002972634615:web:f121783676dd9b560be2f2",
  measurementId: "G-BQMX9RBSK5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);