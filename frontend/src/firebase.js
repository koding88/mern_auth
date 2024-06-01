// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: "mern-auth-faa6f.firebaseapp.com",
    projectId: "mern-auth-faa6f",
    storageBucket: "mern-auth-faa6f.appspot.com",
    messagingSenderId: "260530591431",
    appId: "1:260530591431:web:808d8bfec217e435c350e2",
    measurementId: "G-B32XBY4B0D",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
