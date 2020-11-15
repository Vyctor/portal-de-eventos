// With this template, create in same folder a file named firebase.js with all the token data from firebase.
import firebase from "firebase";

const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  databaseURL: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
  measurementId: "",
};

export default firebase.initializeApp(firebaseConfig);
