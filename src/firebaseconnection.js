import { initializeApp } from 'firebase/app'
import { getFirestore } from "firebase/firestore"
import { getAuth } from 'firebase/auth'


const firebaseConfig = {
    apiKey: "AIzaSyD5rtPh7t8Sb6-jeDPHKmuHGhkiD53IGBA",
    authDomain: "listatarefa-9a62b.firebaseapp.com",
    projectId: "listatarefa-9a62b",
    storageBucket: "listatarefa-9a62b.appspot.com",
    messagingSenderId: "936981067371",
    appId: "1:936981067371:web:59ca6c3746ed6a39c7a32e",
    measurementId: "G-E8PE2X7G7H"
  };

  const firebaseApp = initializeApp(firebaseConfig);

  const db = getFirestore(firebaseApp);
  const auth = getAuth(firebaseApp);

  export { db, auth};