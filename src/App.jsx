import { useState, useEffect } from "react";
import { db } from "./utils/firebase/firebase-util";
import "./App.css";
import { collection, getDocs } from "firebase/firestore";

function App() {
  const [users, setUsers] = useState([]);
  const userCollectionRef = collection(db, "users");

  useEffect(() => {
    const getUSers = async () => {
      const data = await getDocs(userCollectionRef);
      setUsers(
        data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }))
      );
    };

    getUSers();
  }, []);
  return <div className="App">
    {users.map((user) => {
      return <div key={user.id}>
        <h1>Name: {user.name}</h1>
        <h1>Age: {user.age}</h1>
      </div>
    })}
  </div>;
}

export default App;
