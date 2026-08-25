import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBcOmGdPiPTLvgXKnjNzViLkcbxsQgojho",
  authDomain: "vapeup-d7f69.firebaseapp.com",
  databaseURL: "https://vapeup-d7f69-default-rtdb.firebaseio.com",
  projectId: "vapeup-d7f69",
  storageBucket: "vapeup-d7f69.firebasestorage.app",
  messagingSenderId: "1005547278329",
  appId: "1:1005547278329:web:3d9f341f90a338eb93b728"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);