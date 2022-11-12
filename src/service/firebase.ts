import { initializeApp } from "firebase/app"
import { getAuth, signOut } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCVDm1MRmYVPoaR6OLD0qJy42FhTUcs7WY",
  authDomain: "deizu-site.firebaseapp.com",
  projectId: "deizu-site",
  storageBucket: "deizu-site.appspot.com",
  messagingSenderId: "1030535356837",
  appId: "1:1030535356837:web:fd7d99953f3d40a99e084c",
  measurementId: "G-2QPJQ0C7PY"
};

let analytics:any;
let db:any;
let auth:any;

if (firebaseConfig?.projectId) {
  const app = initializeApp(firebaseConfig);
  if (app.name && typeof window !== 'undefined') {
    analytics = getAnalytics(app);
  }
  auth = getAuth(app);
  db = getFirestore();
}

let root;
if (typeof document !== 'undefined') {
  root = document.documentElement;
}

const copyAlert = (prop:string) => {
  navigator.clipboard.writeText(`${prop} `);
}

export {analytics, db,auth,root,copyAlert};