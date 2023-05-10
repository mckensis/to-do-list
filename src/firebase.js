// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCXH5hvMo3mmNdxLskD6lrhiEe_JwS3mac",
  authDomain: "to-do-list-5cce5.firebaseapp.com",
  projectId: "to-do-list-5cce5",
  storageBucket: "to-do-list-5cce5.appspot.com",
  messagingSenderId: "491867481385",
  appId: "1:491867481385:web:289498864aa4ebccf30338",
  measurementId: "G-4F78PK05EP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);