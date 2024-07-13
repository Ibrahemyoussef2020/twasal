// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  //apiKey:process.env.NEXT_BUBLIC_FIREBASE_API_KEY,
  apiKey:"AIzaSyAJO1gSsj6M8NbUKGGMe34Y-lhaQRx_1WE",
  authDomain: "twasal-eb5db.firebaseapp.com",
  projectId: "twasal-eb5db",
  storageBucket: "twasal-eb5db.appspot.com",
  messagingSenderId: "984512262500",
  appId: "1:984512262500:web:25455699b0157cd0250a71",
  measurementId: "G-8N6RBM8TFG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export {app}