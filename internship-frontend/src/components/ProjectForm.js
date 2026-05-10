import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api";
import "./ProjectForm.css";

export default function ProjectForm({ edit = false }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    startDate: "",
    endDate: "",
    mentorId: ""
  });

  const [users, setUsers] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(true);

  useEffect(() => {
    api.get("/users")
      .then((res) => setUsers(res.data))
      .catch((err) => console.error("Failed to load users:", err))
      .finally(() => setLoadingUsers(false));
  }, []);

  useEffect(() => {
    if (edit && id) {
      api.get(`/projects/${id}`)
        .then((res) => {
          setFormData({
            name: res.data.name || "",
            description: res.data.description || "",
            startDate: res.data.startDate ? res.data.startDate.split("T")[0] : "",
            endDate: res.data.endDate ? res.data.endDate.split("T")[0] : "",
            mentorId: res.data.mentorId ? String(res.data.mentorId) : ""
          });
        })
        .catch((err) => console.error("Failed to load project:", err));
    }
  }, [edit, id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      alert("Project name is required");
      return;
    }
    if (!formData.mentorId) {
      alert("Please select a mentor");
      return;
    }

    const submissionData = {
      ...formData,
      mentorId: Number(formData.mentorId),
      startDate: formData.startDate || null,
      endDate: formData.endDate || null
    };

    try {
      if (edit) {
        await api.put(`/projects/${id}`, submissionData);
        alert("Project updated");
        navigate(`/projects/${id}`);
      } else {
        const res = await api.post("/projects", submissionData);
        alert("Project created");
        navigate(`/projects/${res.data.id}`);
      }
    } catch (err) {
      alert("Error: " + err.message);
    }
  };

  if (loadingUsers) return <p>Loading mentors...</p>;

  return (
    <form className="project-form" onSubmit={handleSubmit}>
      <h3>{edit ? "Edit Project" : "Add Project"}</h3>

      <div className="form-group">
        <label>Name:</label>
        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label>Description:</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label>Start Date:</label>
        <input
          type="date"
          name="startDate"
          value={formData.startDate}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label>End Date:</label>
        <input
          type="date"
          name="endDate"
          value={formData.endDate}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label>Mentor:</label>
        <select
          name="mentorId"
          value={formData.mentorId}
          onChange={handleChange}
          required
        >
          <option value="">-- Select Mentor --</option>
          {users.map((u) => (
            <option key={u.id} value={u.id}>{u.name}</option>
          ))}
        </select>
      </div>

      <button type="submit">{edit ? "Update" : "Create"}</button>
    </form>
  );
}