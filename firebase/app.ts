// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getDatabase } from "firebase/database";

// Initialize Firebase

const app = initializeApp({
  apiKey: "AIzaSyAylOpU63I4uAB_Rp2VdREW307jD2SqijE",
  authDomain: "navigo-taxi.firebaseapp.com",
  projectId: "navigo-taxi",
  storageBucket: "navigo-taxi.appspot.com",
  messagingSenderId: "864608395746",
  appId: "1:864608395746:web:ca3d91971008c15eb859bb",
  measurementId: "G-M8C1HDE6EY",
});
const storage = getStorage(app);
const firestore = getFirestore(app);
const auth = getAuth(app);
const database = getDatabase(app);

export { app, firestore, auth, storage, database };
