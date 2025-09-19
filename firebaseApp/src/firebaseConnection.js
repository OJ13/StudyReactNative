import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB_8IOUKE8TTbZTYrHe46LrIwz450JE-dE",
  authDomain: "devdemo-5ba49.firebaseapp.com",
  projectId: "devdemo-5ba49",
  storageBucket: "devdemo-5ba49.firebasestorage.app",
  messagingSenderId: "388859768697",
  appId: "1:388859768697:web:f4adfde6215638eb7f49a8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db }