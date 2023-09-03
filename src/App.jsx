import { useState, useEffect } from "react";
import { db } from "./utils/firebase/firebase-util";
import "./App.css";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";

function App() {
  const [users, setUsers] = useState([]);
  const usersCollectionRef = collection(db, "users");

  const [newName, setNewName] = useState("");
  const [newAge, setNewAge] = useState(0);

  const createUser = async () => {
    await addDoc(usersCollectionRef, { name: newName, age: Number(newAge) });
  };

  const updateUser = async (id, age) => {
    const userDoc = doc(db, "users", id);
    const newFields = { age: age + 1 };
    await updateDoc(userDoc, newFields);
  };

  const decreaseAge = async (id, age) => {
    const userDoc = doc(db, "users", id);
    const newFields = { age: age - 1 };
    await updateDoc(userDoc, newFields);
  };

  const deleteUser = async (id) => {
    const userDoc = doc(db, "users", id);
    await deleteDoc(userDoc);
  };

  useEffect(() => {
    const getUSers = async () => {
      const data = await getDocs(usersCollectionRef);
      setUsers(
        data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }))
      );
    };

    getUSers();
  }, []);

  return (
    <div className="App">
      <input
        placeholder="name"
        onChange={(event) => {
          setNewName(event.target.value);
        }}
      />
      <input
        type="number"
        placeholder="age"
        onChange={(event) => {
          setNewAge(event.target.value);
        }}
      />
      <button onClick={createUser}>Create User</button>
      {users.map((user) => {
        return (
          <div key={user.id}>
            <h1>Name: {user.name}</h1>
            <h1>Age: {user.age}</h1>
            <button
              onClick={() => {
                updateUser(user.id, user.age);
              }}
            >
              Increase Age
            </button>
            <button
              onClick={() => {
                decreaseAge(user.id, user.age);
              }}
            >
              Decrease Age
            </button>
            <button onClick={() => {deleteUser(user.id)}}>Delete</button>
          </div>
        );
      })}
    </div>
  );
}

export default App;
