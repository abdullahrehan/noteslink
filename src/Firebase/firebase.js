import { initializeApp } from "firebase/app";
import { collection, getFirestore , addDoc } from "firebase/firestore";
import firebaseConfig from "./firebaseConfig";

const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);

const addData = async () => {
  const colRef = collection(firestore, "news", 213213123);

  try {
    // Add a new document to the collection
    const docRef = await addDoc(colRef, {data:"hi"});
    console.log("Document added with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
  
};

export { addData };
 