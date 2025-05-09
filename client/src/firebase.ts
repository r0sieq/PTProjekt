import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyCJ_0zozxVZ1k57CDBieMRM8_8gNnbPIJA",
  authDomain: "ca5ino.firebaseapp.com",
  projectId: "ca5ino",
  storageBucket: "ca5ino.firebasestorage.app",
  messagingSenderId: "959777271651",
  appId: "1:959777271651:web:8dd8ae6942f796ff542d56",
  measurementId: "G-2NP98KMD1B"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);