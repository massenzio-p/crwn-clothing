import firebase from "firebase/compat/app";
import { GoogleAuthProvider, signInWithPopup, getAuth} from "firebase/auth";
// import {getAnalytics} from "firebase/firebase-analytics";
// import { initializeApp } from "firebase/app";
// import analytics from "firebase/compat/analytics";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBddYZUkFi55mOq9MHowO6SJVKNILSKrZI",
    authDomain: "crwn-db-ba461.firebaseapp.com",
    projectId: "crwn-db-ba461",
    storageBucket: "crwn-db-ba461.appspot.com",
    messagingSenderId: "453173639189",
    appId: "1:453173639189:web:6afa16ed2efb436fdf361c",
    measurementId: "G-W0FLSC4CMG"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
// export const analytics = getAnalytics(app);
export const firestore = firebase.firestore;
export const auth = getAuth();

const provider = new GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account'});
export const signInWithGoogle = () => signInWithPopup(auth, provider);

export default firebase;