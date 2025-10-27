import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
//import { getAuth } from "firebase/auth";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
//const { API_KEY, AUTH_DOMAIN, PROJECTID, STORAGEBUCKET, MESSAGINGSENDERID, APPID } = process.env
import Config from 'react-native-config';

const firebaseConfig = {
  apiKey: Config.API_KEY,
  authDomain: Config.AUTH_DOMAIN,
  projectId: Config.PROJECTID,
  storageBucket: Config.STORAGEBUCKET,
  messagingSenderId: Config.MESSAGINGSENDERID,
  appId: Config.APPID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
//const auth = getAuth(app);

const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});

export { 
  db, auth 
}