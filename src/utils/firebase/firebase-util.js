import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBtAUI5Du5JcKePFJUoSxCmcNcgybPY3gM",
  authDomain: "crud-d9571.firebaseapp.com",
  projectId: "crud-d9571",
  storageBucket: "crud-d9571.appspot.com",
  messagingSenderId: "84741840707",
  appId: "1:84741840707:web:a445ce9026efc1708e99f6",
  measurementId: "G-6EY0TSZTMW",
};

const firebaseApp = initializeApp(firebaseConfig);

export const db = getFirestore(firebaseApp);