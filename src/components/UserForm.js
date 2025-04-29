import React, { useState, useEffect } from 'react';
import './UserForm.css';

const UserForm = ({ addUser, editUser, updateUser }) => {
  const [form, setForm] = useState({ name: '', email: '', phone: '' });

  useEffect(() => {
    if (editUser) {
      setForm(editUser); 
    } else {
      setForm({ name: '', email: '', phone: '' }); 
    }
  }, [editUser]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editUser) {
      updateUser(form); 
    } else {
      addUser(form); 
    }
    setForm({ name: '', email: '', phone: '' }); 
  };

  return (
    <form className="user-form" onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        placeholder="Enter name"
        value={form.name}
        onChange={handleChange}
        required
      />
      <input
        type="email"
        name="email"
        placeholder="Enter email"
        value={form.email}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="phone"
        placeholder="Enter phone"
        value={form.phone}
        onChange={handleChange}
        required
      />
      <button type="submit">
        {editUser ? 'Update User' : 'Add User'}
      </button>
    </form>
  );
};

export default UserForm;
