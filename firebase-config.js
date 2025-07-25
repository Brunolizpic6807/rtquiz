import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore-lite.js";

const firebaseConfig = {
  apiKey: "AIzaSyDrDs7R8XI_j1l9dJaGEi_pt3bnDL7THOI",
  authDomain: "rtquiz6807.firebaseapp.com",
  projectId: "rtquiz6807",
  storageBucket: "rtquiz6807.firebasestorage.app",
  messagingSenderId: "724929097949",
  appId: "1:724929097949:web:7e825e58c4759e71c0ab34",
  measurementId: "G-9QK7FYVH5F"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
