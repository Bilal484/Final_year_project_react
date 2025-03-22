// src/authMethods.js
import { auth, GoogleAuthProvider, FacebookAuthProvider, OAuthProvider } from './firebaseConfig';
import { signInWithPopup } from "firebase/auth";

const socialMediaAuth = (provider) => {
  return signInWithPopup(auth, provider)
    .then((result) => {
      return result.user;
    })
    .catch((error) => {
      console.error("Authentication error:", error);
      switch (error.code) {
        case 'auth/operation-not-allowed':
          alert("Error: Operation not allowed. Please make sure it is enabled in Firebase.");
          break;
        default:
          alert("Login failed. Please try again.");
          break;
      }
      throw error;
    });
};


export const signInWithGoogle = () => {
  const provider = new GoogleAuthProvider();
  return socialMediaAuth(provider);
};

export const signInWithFacebook = () => {
  const provider = new FacebookAuthProvider();
  return socialMediaAuth(provider);
};

export const signInWithApple = () => {
  const provider = new OAuthProvider('apple.com');
  return socialMediaAuth(provider);
};
