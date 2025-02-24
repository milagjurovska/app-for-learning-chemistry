import {initializeApp} from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCWS8OZDtl9PfXAdROuFOJi92vBO6udQtg",
    authDomain: "app-for-learning-chemistry.firebaseapp.com",
    projectId: "app-for-learning-chemistry",
    storageBucket: "app-for-learning-chemistry.firebasestorage.app",
    messagingSenderId: "1036240374253",
    appId: "1:1036240374253:web:34ce293e0b11995b7fbfe4",
    measurementId: "G-XGTR0FG0H3"
};

const app = initializeApp(firebaseConfig);
const auth=getAuth(app)
const db=getFirestore(app);

export {db,auth};