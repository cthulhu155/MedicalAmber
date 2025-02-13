import { getFirestore, doc, setDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Obtén la instancia de Firestore y Auth
const db = getFirestore();
const auth = getAuth();

// no c porque no exporta la interfaz
const saveUserData = async (Users) => {
  const user = auth.currentUser; 
  if (user) {
    const userRef = doc(db, "usuarios", user.uid); 

    console.log("Datos del usuario guardados correctamente.");
  } else {
    console.log("No hay usuario autenticado.");
  }
};

// Ejemplo 
saveUserData("Juan Pérez", 30, ["Tomar medicamento A", "Tomar medicamento B"]);