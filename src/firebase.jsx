// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth"; 
import { getFirestore } from "firebase/firestore"; // 🔥 ADDED THIS: Needed for database sync

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCfg2i5NppoeBsraurG4vWCrstOLTLYy5w",
  authDomain: "state-finderr-acme.firebaseapp.com",
  projectId: "state-finderr-acme",
  storageBucket: "state-finderr-acme.firebasestorage.app",
  messagingSenderId: "697061999000",
  appId: "1:697061999000:web:b36349c94e0b93f5e3abed",
  measurementId: "G-W8XSEP3CHY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firebase Authentication and export it for your pages
export const auth = getAuth(app); 

// Initialize Firestore Database and export it for your pages
export const db = getFirestore(app); // 🔥 ADDED THIS: This powers your real-time listings!