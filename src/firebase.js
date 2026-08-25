import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBcOmGdPiPTLvgXKnjNzViLkcbxsQgojho",
  authDomain: "://firebaseapp.com",
  databaseURL: "https://firebaseio.com",
  projectId: "vapeup-d7f69",
  storageBucket: "vapeup-d7f69.firebasestorage.app",
  messagingSenderId: "1005547278329",
  appId: "1:1005547278329:web:3d9f341f90a338eb93b728"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
