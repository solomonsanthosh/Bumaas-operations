// Import the functions you need from the SDKs you need
import * as firebase from "firebase";


// import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig22 = {
  apiKey: "AIzaSyBb8A_J-YrcnFBx15IOQTXBwT4lfo9fzlw",
  authDomain: "best-main.firebaseapp.com",
  databaseURL: "https://best-main-default-rtdb.firebaseio.com",
  projectId: "best-main",
  storageBucket: "best-main.appspot.com",
  messagingSenderId: "514866372090",
  appId: "1:514866372090:web:a57d728b77e26169525843",
  measurementId: "G-KKXQDTSEBD"
};

// Initialize Firebase
const app2 = firebase.initializeApp(firebaseConfig22);
export const db = app2.firestore();
export const fire = firebase
export const storageRef = firebase.storage().ref();
const auth = firebase.auth();

export { auth };