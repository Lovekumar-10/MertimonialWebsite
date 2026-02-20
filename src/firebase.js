// // src/firebase.js
// import { initializeApp } from "firebase/app";
// import { getAuth } from "firebase/auth";
// import { getFirestore } from "firebase/firestore";
// import { getStorage } from "firebase/storage";
// import { getMessaging } from "firebase/messaging";
// import { getFunctions } from "firebase/functions"; // ✅ Add this

// // Your Firebase config object
// const firebaseConfig = {
//   apiKey: "AIzaSyCyJxL4p0K1wnsh6JZXt0OAXPGBE5e8x4s",
//   authDomain: "metrimonialwebsite.firebaseapp.com",
//   projectId: "metrimonialwebsite",
//   storageBucket: "metrimonialwebsite.firebasestorage.app",
//   messagingSenderId: "897279083973",
//   appId: "1:897279083973:web:c3db462bede13eabfa37ac",
//   measurementId: "G-7CGL1NTSDR",
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);

// // Initialize Firebase Auth
// export const auth = getAuth(app); // ✅ make sure you export `auth`
// export const db = getFirestore(app);
// export const storage = getStorage(app);
// export const messaging = getMessaging(app);

// export const functions = getFunctions(app); 





// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getMessaging } from "firebase/messaging";
import { getFunctions } from "firebase/functions";

// Firebase config using import.meta.env for Vite
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const messaging = getMessaging(app);
export const functions = getFunctions(app);

export default app;