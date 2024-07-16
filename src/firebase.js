// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBwZDmcjZ7cWEVLADcD7-XAgpk6LCLTKvo",
  authDomain: "twasal-media.firebaseapp.com",
  projectId: "twasal-media",
  storageBucket: "twasal-media.appspot.com",
  messagingSenderId: "889056469398",
  appId: "1:889056469398:web:de635d26278bec1c1ebdb7",
  measurementId: "G-K15380GXLV"
};


// Initialize Firebase

const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);

export {app}