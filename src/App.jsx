// src/App.jsx
import React, { useState, useEffect } from 'react';
import { db } from './firebaseConfig'; // Importa la configuración de Firestore
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc } from 'firebase/firestore';

function App() {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState('');

  // Función para obtener todos los elementos de la colección
  const getItems = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "items"));
      const itemsList = [];
      querySnapshot.forEach((doc) => {
        itemsList.push({ id: doc.id, ...doc.data() });
      });
      setItems(itemsList);
    } catch (error) {
      console.error("Error getting documents: ", error);
    }
  };

  // Función para agregar un nuevo elemento a la colección
  const addItem = async () => {
    if (!newItem) return;

    try {
      const docRef = await addDoc(collection(db, "items"), {
        name: newItem,
      });
      console.log("Document written with ID: ", docRef.id);
      setNewItem('');
      getItems(); // Actualiza la lista después de agregar un nuevo item
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  // Función para actualizar un item existente
  const updateItem = async (id, newName) => {
    try {
      const itemRef = doc(db, "items", id);
      await updateDoc(itemRef, {
        name: newName,
      });
      console.log("Document updated with ID: ", id);
      getItems(); // Actualiza la lista después de la actualización
    } catch (e) {
      console.error("Error updating document: ", e);
    }
  };

  // Función para eliminar un item
  const deleteItem = async (id) => {
    try {
      await deleteDoc(doc(db, "items", id));
      console.log("Document deleted with ID: ", id);
      getItems(); // Actualiza la lista después de eliminar el item
    } catch (e) {
      console.error("Error deleting document: ", e);
    }
  };

  // Cargar los elementos al inicio
  useEffect(() => {
    getItems();
  }, []);

  return (
    <div>
      <h1>Items CRUD con Firestore</h1>

      <div>
        <input
          type="text"
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          placeholder="Nuevo item"
        />
        <button onClick={addItem}>Agregar</button>
      </div>

      <ul>
        {items.map((item) => (
          <li key={item.id}>
            {item.name} 
            <button onClick={() => updateItem(item.id, prompt("Nuevo nombre", item.name))}>Editar</button>
            <button onClick={() => deleteItem(item.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
