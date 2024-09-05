// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBV2sXgUr2qYW_X8D53CMKc72luDjuBB2s",
    authDomain: "feliz-tails.firebaseapp.com",
    projectId: "feliz-tails",
    storageBucket: "feliz-tails.appspot.com",
    messagingSenderId: "541135051472",
    appId: "1:541135051472:web:39ee80163541b58ec45cd5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;