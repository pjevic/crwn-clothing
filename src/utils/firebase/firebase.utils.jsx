import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc, collection, writeBatch, query, getDocs } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCsj6XqnDHkkLRf3cUlxtYO7a1dW3YZUKo",
  authDomain: "crwn-clothing-db-b3423.firebaseapp.com",
  projectId: "crwn-clothing-db-b3423",
  storageBucket: "crwn-clothing-db-b3423.appspot.com",
  messagingSenderId: "1024007241397",
  appId: "1:1024007241397:web:336e32a60e16c2bdb6c8fc",
};

const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);

export const db = getFirestore();

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
  const collectioRefference = collection(db, collectionKey);
  const batch = writeBatch(db);

  objectsToAdd.forEach((object) => {
    const documentReference = doc(collectioRefference, object.title.toLowerCase());
    batch.set(documentReference, object);
  });

  await batch.commit();
};

export const getCategoriesAndDocuments = async () => {
  const collectionReference = collection(db, "categories");
  const q = query(collectionReference);

  const querySnaphot = await getDocs(q);
  return querySnaphot.docs.map((docSnapshot) => docSnapshot.data());
};

export const createUserDocumentFromAuth = async (userAuth, additionalInformation = {}) => {
  if (!userAuth) return;
  const userDocReference = doc(db, "users", userAuth.uid);
  const userSnapshot = await getDoc(userDocReference);

  // If user data does not exist
  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocReference, {
        displayName,
        email,
        createdAt,
        ...additionalInformation,
      });
    } catch (error) {
      console.log("error creating the user", error.message);
    }
  }

  // If user data exist
  return userDocReference;
};

export const createAuthUserwithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserwithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListener = (callback) => onAuthStateChanged(auth, callback);
