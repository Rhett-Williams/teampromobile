// Import the functions you need from the SDKs you need
import * as firebase from "firebase";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBpmTzHzO_-S1NmLtYZGT_wnI05-9go_UA",
  authDomain: "teampro-ccb5d.firebaseapp.com",
  projectId: "teampro-ccb5d",
  storageBucket: "teampro-ccb5d.appspot.com",
  messagingSenderId: "135141015556",
  appId: "1:135141015556:web:d78bdd1b4dab7d1bb4b551"
};

// Initialize Firebase
let app;
if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app()
}

const auth = firebase.auth()

export { auth };