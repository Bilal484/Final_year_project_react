// src/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider, FacebookAuthProvider, OAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAmhAxLh0zRqQF33sTfi_X6c8xlrrsnUao",
  authDomain: "znet-d704f.firebaseapp.com",
  projectId: "znet-d704f",
  storageBucket: "znet-d704f.firebasestorage.app",
  messagingSenderId: "705538546954",
  appId: "1:705538546954:web:f37115fff9a7178e892ef3",
  measurementId: "G-YGKSZSYNE4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

export { auth, GoogleAuthProvider, FacebookAuthProvider, OAuthProvider, analytics };
