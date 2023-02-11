import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

const firebaseConfig = {
  apiKey: process.env.FIREBASE_CONFIG.apiKey,
  authDomain: process.env.FIREBASE_CONFIG.authDomain,
  databaseURL: process.env.FIREBASE_CONFIG.databaseURL,
  projectId: process.env.FIREBASE_CONFIG.projectId,
  storageBucket: process.env.FIREBASE_CONFIG.storageBucket,
  messagingSenderId: process.env.FIREBASE_CONFIG.messagingSenderId,
  appId: process.env.FIREBASE_CONFIG.appId,
  measurementId: process.env.FIREBASE_CONFIG.measurementId,
};

firebase.apps && !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : '';

// utils
export const GoogleProvider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();
export const db = firebase.firestore();
db.settings({ timestampsInSnapshots: true });
export const storage = firebase.storage();
export const storageReference = storage.ref();

export default firebase;
