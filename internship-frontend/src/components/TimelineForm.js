import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api';

export default function TimelineForm({ edit = false }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    projectId: '',
    startDate: '',
    endDate: ''
  });

  const [projects, setProjects] = useState([]);

  useEffect(() => {
    api.get('/projects').then(res => setProjects(res.data));
  }, []);

  useEffect(() => {
    if (edit && id) {
      api.get(`/timelines/${id}`).then(res => {
        setFormData({
          projectId: res.data.projectId || '',
          startDate: res.data.startDate ? res.data.startDate.split('T')[0] : '',
          endDate: res.data.endDate ? res.data.endDate.split('T')[0] : ''
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
      if (edit) {
        await api.put(`/timelines/${id}`, formData);
        alert('Timeline updated');
        navigate(`/timelines/${id}`);
      } else {
        const res = await api.post('/timelines', formData);
        alert('Timeline created');
        navigate(`/timelines/${res.data.id}`);
      }
    } catch (err) {
      alert('Error: ' + err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>{edit ? 'Edit Timeline' : 'Add Timeline'}</h3>
      <label>Project:</label><br/>
      <select name="projectId" value={formData.projectId} onChange={handleChange} required>
        <option value="">-- Select Project --</option>
        {projects.map(p => (
          <option key={p.id} value={p.id}>{p.name}</option>
        ))}
      </select><br/>

      <label>Start Date:</label><br/>
      <input type="date" name="startDate" value={formData.startDate} onChange={handleChange} /><br/>

      <label>End Date:</label><br/>
      <input type="date" name="endDate" value={formData.endDate} onChange={handleChange} /><br/>

      <button type="submit">{edit ? 'Update' : 'Create'}</button>
    </form>
  );
}