// src/components/UserList.js
import React from 'react';
import './UserList.css'; // 👈 Add this line

const UserList = ({ users, onEdit, onDelete }) => {
    return (
      <div className="user-list">
        {users.map((user) => (
          <div className="user-card" key={user.id}>
            <h3>{user.name}</h3>
            <p>Email: {user.email}</p>
            <p>Phone: {user.phone}</p>
            <div className="btn-group">
              <button className="edit-btn" onClick={() => onEdit(user)}>Edit</button>
              <button className="delete-btn" onClick={() => onDelete(user.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    );
  };
  

export default UserList;
