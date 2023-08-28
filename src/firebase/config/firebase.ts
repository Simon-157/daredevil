import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage'; 

// const firebaseConfig = {
//   apiKey: process.env.VITE_PUBLIC_FIREBASE_API_KEY,
//   authDomain: process.env.VITE_PUBLIC_FIREBASE_AUTH_DOMAIN,
//   projectId: process.env.VITE_PUBLIC_FIREBASE_PROJECT_ID,
//   storageBucket: process.env.VITE_PUBLIC_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: process.env.VITE_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
//   appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
//   };


  const firebaseConfig = {
    apiKey: "AIzaSyA_69EtD3kgv2FmmwhUi_hZKjBAPKBB0zA",
    authDomain: "daredevill.firebaseapp.com",
    projectId: "daredevill",
    storageBucket: "daredevill.appspot.com",
    messagingSenderId: "987930163173",
    appId: "1:987930163173:web:ea5a43f6c0e14802c2e10c"
  };
  

const app = initializeApp(firebaseConfig);

export const firebaseApp = app;
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app)




// Create an instance of the Firebase authentication module