import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api';

export default function UserForm({ edit = false }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: '',
    profile: '{}',
  });

  useEffect(() => {
    if (edit && id) {
      api.get(`/users/${id}`).then(res => {
        setFormData({
          name: res.data.name,
          email: res.data.email,
          password: '',
          role: res.data.role,
          profile: JSON.stringify(res.data.profile || {}, null, 2),
        });
      });
    }
  }, [edit, id]);

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = { ...formData, profile: JSON.parse(formData.profile) };
      if (edit) {
        await api.put(`/users/${id}`, data);
        alert('User updated');
        navigate(`/users/${id}`);
      } else {
        const res = await api.post('/users', data);
        alert('User created');
        navigate(`/users/${res.data.id}`);
      }
    } catch (err) {
      alert('Error: ' + err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>{edit ? 'Edit User' : 'Add User'}</h3>
      <label>Name:</label><br />
      <input name="name" value={formData.name} onChange={handleChange} required /><br />
      <label>Email:</label><br />
      <input type="email" name="email" value={formData.email} onChange={handleChange} required /><br />
      <label>Password:</label><br />
      <input type="password" name="password" value={formData.password} onChange={handleChange} required={!edit} /><br />
      <label>Role:</label><br />
      <input name="role" value={formData.role} onChange={handleChange} required /><br />
      
      <textarea name="profile" rows={5} value={formData.profile} onChange={handleChange} /><br />
      <button type="submit">{edit ? 'Update' : 'Create'}</button>
    </form>
  );
}
