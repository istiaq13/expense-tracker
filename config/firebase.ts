// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAjgCdG9Ef5tUtlSlNC-4VFU_-R6cYdqn0",
  authDomain: "expense-tracker-56469.firebaseapp.com",
  projectId: "expense-tracker-56469",
  storageBucket: "expense-tracker-56469.appspot.com", // Fixed typo in storageBucket
  messagingSenderId: "95132947297",
  appId: "1:95132947297:web:deb7be6e086a6448822b20"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export auth and firestore
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export const firestore = getFirestore(app); // Renamed export for clarity
