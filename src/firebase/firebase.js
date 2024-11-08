// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCO5yhKwdi3FX_g4Eq_vHccsyialgGNWWY",
  authDomain: "expenses-project-a470e.firebaseapp.com",
  projectId: "expenses-project-a470e",
  storageBucket: "expenses-project-a470e.firebasestorage.app",
  messagingSenderId: "607134233896",
  appId: "1:607134233896:web:623a1de4a96b92863d0c1d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export { app, auth };