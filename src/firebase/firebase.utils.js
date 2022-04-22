import {GoogleAuthProvider, signInWithPopup, getAuth} from "firebase/auth";
import {getFirestore, doc, getDoc} from 'firebase/firestore';
import {initializeApp} from 'firebase/app'
// import {getAnalytics} from 'firebase/analytics'

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

const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const firestore = getFirestore(app);
export const auth = getAuth(app);
const provider = new GoogleAuthProvider();

provider.setCustomParameters({prompt: 'select_account'});
export const signInWithGoogle = () => signInWithPopup(auth, provider);

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;
    const userRef = doc(firestore, 'users', `${userAuth.uid}`);
    // const userRef = doc(firestore, collection(firestore, 'users'), `${userAuth.uid}`);
    const snapShot = await getDoc(userRef);

    if (!snapShot.exists) {
        console.log(`snapshot not exists - ${snapShot.data()}`)
        const {displayName, email} = userAuth;
        const createdAt = new Date();
        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            });
        } catch (error) {
            console.log('error creating user', error.message);
        }
    }

    return userRef;
}