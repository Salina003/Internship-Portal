import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import api from '../api';

export default function UserDetail() {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    api.get(`/users/${id}`).then(res => setUser(res.data));
  }, [id]);

  const deleteUser = async () => {
    if (window.confirm('Delete user?')) {
      await api.delete(`/users/${id}`);
      navigate('/users');
    }
  };

  if (!user) return <p>Loading...</p>;

  return (
    <div>
      <h3>{user.name} (ID: {user.id})</h3>
      <p>Email: {user.email}</p>
      <p>Role: {user.role}</p>
      <Link to="edit">Edit</Link> |{' '}
      <button onClick={deleteUser}>Delete</button> |{' '}
      <Link to="/users">Back</Link>
    </div>
  );
}