import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getDatabase} from "firebase/database"
import {getAuth} from "firebase/auth"
const firebaseConfig = {
  apiKey: "AIzaSyDboKrqvz3iRMCMqCvlj74fe0lz3vceztU",
  authDomain: "noteslinkcui.firebaseapp.com",
  projectId: "noteslinkcui",
  databaseURL:"https://noteslinkcui-default-rtdb.asia-southeast1.firebasedatabase.app/",
  storageBucket: "noteslinkcui.appspot.com",
  messagingSenderId: "696429582467",
  appId: "1:696429582467:web:ed6d7e1a5d1dc3248763b6",
  measurementId: "G-E2JYPN9T5N",
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const fdb = getFirestore(app);
const rdb = getDatabase(app)

export {auth, fdb, rdb};
