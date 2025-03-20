// src/firebaseConfig.jsx

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Tu configuración de Firebase (la puedes obtener desde la consola de Firebase)
const firebaseConfig = {
    apiKey: "AIzaSyAfKjhn9bslSHfHsV-nUOjEyDyq2IxGmq0",
    authDomain: "proyecto-8d7ea.firebaseapp.com",
    projectId: "proyecto-8d7ea",
    storageBucket: "proyecto-8d7ea.firebasestorage.app",
    messagingSenderId: "1068239069208",
    appId: "1:1068239069208:web:ab425d1004920519f9e36d"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);

// Obtén la instancia de Firestore
const db = getFirestore(app);

export { db };
