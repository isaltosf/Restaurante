import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

// ⚠️ IMPORTANTE: Reemplaza estos valores con los de tu proyecto de Firebase
// Los puedes encontrar en: Configuración del proyecto -> General -> Tus apps
const firebaseConfig = {
    apiKey: "AIzaSyDhF7vkR3ZZHYMTQZzjimjKTfiA5FSBgw4",
    authDomain: "restaurante-99f86.firebaseapp.com",
    databaseURL: "https://restaurante-99f86-default-rtdb.firebaseio.com",
    projectId: "restaurante-99f86",
    storageBucket: "restaurante-99f86.firebasestorage.app",
    messagingSenderId: "521828402540",
    appId: "1:521828402540:web:6d4802380c63c00831df49",
    measurementId: "G-KC8D92BFRT"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// URL Base para usar FETCH (Requisito de la tarea)
const API_URL = "https://restaurante-99f86-default-rtdb.firebaseio.com";

// --- FUNCIONES CON SDK (Las que ya tenías) ---
export function guardarPedido(nombre, plan) {
    return set(ref(db, "pedidos/" + Date.now()), {
        nombre,
        plan
    });
}

// --- FUNCIONES CON FETCH (Para cumplir los 8 puntos) ---

// 1. HTTP POST con fetch
export async function enviarMensajeFetch(datos) {
    // Añadimos la fecha al objeto
    const datosConFecha = {
        ...datos,
        fecha: new Date().toISOString()
    };

    const response = await fetch(`${API_URL}/mensajes.json`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(datosConFecha)
    });

    if (!response.ok) throw new Error("Error en POST fetch");
    return await response.json();
}

// 2. HTTP GET con fetch
export async function obtenerMensajesFetch() {
    const response = await fetch(`${API_URL}/mensajes.json`);
    if (!response.ok) throw new Error("Error en GET fetch");
    
    const data = await response.json();
    console.log("Datos recibidos de Firebase (GET):", data); // Para ver en consola
    return data;
}