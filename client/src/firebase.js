import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE,
  authDomain: "mern-blog-e673f.firebaseapp.com",
  projectId: "mern-blog-e673f",
  storageBucket: "mern-blog-e673f.appspot.com",
  messagingSenderId: "210100519673",
  appId: "1:210100519673:web:2b2bb1ccda7b2b642a9828",
  measurementId: "G-40LJYWJ6JW"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);