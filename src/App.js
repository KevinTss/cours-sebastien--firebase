import { useEffect, useState } from "react";

import firebase from "./Firebase";
import "./App.css";

function App() {
  const [db, setDb] = useState(null);
  const [name, setName] = useState("");
  const [users, setUsers] = useState([]);

  useEffect(() => {
    firebase.init();

    if (!db) {
      setDb(firebase.getDb());
    } else {
      const ref = db.ref();
      ref.on("value", (snapshot) => {
        console.log("snapshot", snapshot.val());
        const newUsers = snapshot.val().users;
        const values = Object.values(newUsers);
        const keys = Object.keys(newUsers);

        const finalUsers = keys.map((k, idx) => ({
          id: k,
          ...values[idx],
        }));

        setUsers(finalUsers);
      });
    }
  }, [db]);

  const onSubmit = (e) => {
    e.preventDefault();

    db.ref("users/").push({
      username: name,
    });
  };

  return (
    <div className="App">
      <form onSubmit={onSubmit}>
        <input type="text" onChange={(e) => setName(e.target.value)} />
        <button type="submit">Submit</button>
      </form>
      <div>
        <ol>
          {users.map((u) => (
            <li key={u.id} id={u.id}>
              {u.username}
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

export default App;
