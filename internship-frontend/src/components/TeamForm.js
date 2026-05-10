import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api";
import "./TeamForm.css";

export default function TeamForm({ edit = false }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    projectId: "",
    userIds: [] // array of selected user IDs
  });

  const [projects, setProjects] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    api.get("/projects").then(res => setProjects(res.data));
    api.get("/users").then(res => setUsers(res.data));
  }, []);

  useEffect(() => {
    if (edit && id) {
      api.get(`/teams/${id}`).then(res => {
        setFormData({
          name: res.data.name || "",
          description: res.data.description || "",
          projectId: res.data.projectId || "",
          userIds: res.data.users ? res.data.users.map(u => u.id) : []
        });
      });
    }
  }, [edit, id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e) => {
    const userId = Number(e.target.value);
    if (e.target.checked) {
      setFormData(prev => ({ ...prev, userIds: [...prev.userIds, userId] }));
    } else {
      setFormData(prev => ({ ...prev, userIds: prev.userIds.filter(id => id !== userId) }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const submissionData = {
        name: formData.name,
        description: formData.description,
        projectId: formData.projectId ? Number(formData.projectId) : null,
        userIds: formData.userIds
      };

      if (edit) {
        await api.put(`/teams/${id}`, submissionData);
        alert("Team updated");
        navigate(`/teams/${id}`);
      } else {
        const res = await api.post("/teams", submissionData);
        alert("Team created");
        navigate(`/teams/${res.data.id}`);
      }
    } catch (err) {
      alert("Error: " + err.message);
    }
  };

  return (
    <form className="team-form" onSubmit={handleSubmit}>
      <h3>{edit ? "Edit Team" : "Add Team"}</h3>

      <div className="form-group">
        <label>Name:</label>
        <input name="name" value={formData.name} onChange={handleChange} required />
      </div>

      <div className="form-group">
        <label>Description:</label>
        <textarea name="description" value={formData.description} onChange={handleChange} />
      </div>

      <div className="form-group">
        <label>Project:</label>
        <select name="projectId" value={formData.projectId} onChange={handleChange} required>
          <option value="">-- Select Project --</option>
          {projects.map(p => (
            <option key={p.id} value={p.id}>{p.name}</option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label>Users:</label>
        <div className="checkbox-container">
          {users.map(user => (
            <div key={user.id}>
              <input
                type="checkbox"
                id={`user_${user.id}`}
                value={user.id}
                checked={formData.userIds.includes(user.id)}
                onChange={handleCheckboxChange}
              />
              <label htmlFor={`user_${user.id}`}>{user.name} (ID: {user.id})</label>
            </div>
          ))}
        </div>
      </div>

      <button type="submit">{edit ? "Update" : "Create"}</button>
    </form>
  );
}