import React, { useEffect, useState } from 'react';
import UserForm from './components/UserForm';
import UserList from './components/UserList';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const API_URL = "https://jsonplaceholder.typicode.com/users";

function App() {
  const [users, setUsers] = useState([]);
  const [editUser, setEditUser] = useState(null);

  // 🔹 Load from localStorage or fetch from API
  useEffect(() => {
    const storedUsers = localStorage.getItem("users");
    if (storedUsers) {
      setUsers(JSON.parse(storedUsers));
    } else {
      fetch(API_URL)
        .then(res => res.json())
        .then(data => setUsers(data))
        .catch(err => console.error("Error fetching users:", err));
    }
  }, []);

  // 🔹 Save to localStorage when users change
  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(users));
  }, [users]);

  const addUser = (user) => {
    fetch(API_URL, {
      method: "POST",
      body: JSON.stringify(user),
      headers: { "Content-type": "application/json" }
    })
      .then(res => res.json())
      .then(data => {
        setUsers([...users, { ...user, id: Math.random() * 1000 }]);
        toast.success("User added!");
      });
  };

  const updateUser = (updatedUser) => {
    const updatedUsers = users.map((user) =>
      user.id === updatedUser.id ? updatedUser : user
    );
    setUsers(updatedUsers); // Update the user in state
    setEditUser(null); // Reset the editUser state to stop editing
    toast.info("User updated!");
  };
  

  const deleteUser = (id) => {
    fetch(`${API_URL}/${id}`, { method: "DELETE" })
      .then(() => {
        setUsers(users.filter(user => user.id !== id));
        toast.error("User deleted!");
      });
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>User CRUD App</h1>
      <ToastContainer position="top-right" autoClose={2000} />
      <UserForm addUser={addUser} editUser={editUser} updateUser={updateUser} />
      <UserList users={users} onEdit={setEditUser} onDelete={deleteUser} />
    </div>
  );
}

export default App;
