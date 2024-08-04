// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAgv0gFLriqdzWqK_5J-hb8A45JMkGFsn4",
  authDomain: "inventorymanagement-b20ff.firebaseapp.com",
  projectId: "inventorymanagement-b20ff",
  storageBucket: "inventorymanagement-b20ff.appspot.com",
  messagingSenderId: "940846585627",
  appId: "1:940846585627:web:b8065fe07aca5805bae5be",
  measurementId: "G-2BR3GHEMEE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);
export {firestore} 
