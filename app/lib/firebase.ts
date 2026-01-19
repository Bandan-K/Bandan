import { initializeApp, getApps, getApp } from "firebase/app";
import { getAnalytics, isSupported, logEvent } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCGFNQvDO0pcMMWKNQxLCcueJ6YVxf3pik",
  authDomain: "my-portfolio-a478f.firebaseapp.com",
  projectId: "my-portfolio-a478f",
  storageBucket: "my-portfolio-a478f.firebasestorage.app",
  messagingSenderId: "980673510154",
  appId: "1:980673510154:web:3ee4d99c37d28d190b18f3",
  measurementId: "G-9SPWGCN89D",
  databaseURL: "https://my-portfolio-a478f-default-rtdb.asia-southeast1.firebasedatabase.app/"
};

// Initialize Firebase (singleton pattern for Next.js)
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

// Initialize Realtime Database
const rtdb = getDatabase(app);

// Initialize Analytics lazily (only in browser)
export const initAnalytics = async () => {
  if (typeof window !== "undefined") {
    const supported = await isSupported();
    if (supported) {
      return getAnalytics(app);
    }
  }
  return null;
};

export { app, db, rtdb, logEvent };
