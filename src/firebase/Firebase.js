import * as firebase from "firebase/app";

import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore/lite';

const firebaseConfig = {
    apiKey: "AIzaSyDKx3ZZ6CzheF8QCv6FE-q657rBcCk04T8",
    authDomain: "clone-65983.firebaseapp.com",
    projectId: "clone-65983",
    storageBucket: "clone-65983.appspot.com",
    messagingSenderId: "1032272363342",
    appId: "1:1032272363342:web:7464e50fbf2c3c6d1be81f"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
const authentication = getAuth(firebaseApp);
const provider = new GoogleAuthProvider();

export { db, authentication, provider };