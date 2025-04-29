import React, { useState, useEffect } from 'react';
import './UserForm.css';

const UserForm = ({ addUser, editUser, updateUser }) => {
  const [form, setForm] = useState({ name: '', email: '', phone: '' });

  // Ensure that the form is pre-filled when editUser is passed
  useEffect(() => {
    if (editUser) {
      setForm(editUser); // Fill the form with the current user's data
    } else {
      setForm({ name: '', email: '', phone: '' }); // Reset if no editUser
    }
  }, [editUser]); // Effect runs when editUser changes

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editUser) {
      updateUser(form); // Call updateUser with the form data
    } else {
      addUser(form); // Call addUser if it's a new user
    }
    setForm({ name: '', email: '', phone: '' }); // Reset form after submit
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
