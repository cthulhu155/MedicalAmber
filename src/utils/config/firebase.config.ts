import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDjR27sDlGGHYBJu6nnTr1TxW712n0VsRg",
  authDomain: "medicalamber-33ef0.firebaseapp.com",
  projectId: "medicalamber-33ef0",
  storageBucket: "medicalamber-33ef0.appspot.com",
  messagingSenderId: "260347032300",
  appId: "1:260347032300:web:b93251ee64bb8325036bc9",
  measurementId: "G-LG9NG753LE"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export { auth };
