// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDQ860BlZRsu1guos4jVr4MvDku_r9YNzo",
  authDomain: "cwnr-a8ad1.firebaseapp.com",
  projectId: "cwnr-a8ad1",
  storageBucket: "cwnr-a8ad1.appspot.com",
  messagingSenderId: "981431618633",
  appId: "1:981431618633:web:e107a7b502bee8673a4398",
  measurementId: "G-71Y1GVK80J",
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)


