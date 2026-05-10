import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api";
import "./ApplicationForm.css";

export default function ApplicationForm({ edit = false }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    projectId: "",
    applicantId: "",
    teamId: "",
    status: "",
  });

  const [projects, setProjects] = useState([]);
  const [users, setUsers] = useState([]);
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    api.get("/projects").then((res) => setProjects(res.data));
    api.get("/users").then((res) => setUsers(res.data));
    api.get("/teams").then((res) => setTeams(res.data));
  }, []);

  useEffect(() => {
    if (edit && id) {
      api.get(`/applications/${id}`).then((res) => {
        setFormData({
          projectId: res.data.projectId || "",
          applicantId: res.data.applicantId || "",
          teamId: res.data.teamId || "",
          status: res.data.status || "",
        });
      });
    }
  }, [edit, id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (edit) {
        await api.put(`/applications/${id}`, formData);
        alert("Application updated");
        navigate(`/applications/${id}`);
      } else {
        const res = await api.post("/applications", formData);
        alert("Application created");
        navigate(`/applications/${res.data.id}`);
      }
    } catch (err) {
      alert("Error: " + err.message);
    }
  };

  return (
    <form className="application-form" onSubmit={handleSubmit}>
      <h3>{edit ? "Edit Application" : "Add Application"}</h3>

      <div className="form-group">
        <label>Project</label>
        <select
          name="projectId"
          value={formData.projectId}
          onChange={handleChange}
          required
        >
          <option value="">-- Select Project --</option>
          {projects.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label>Applicant</label>
        <select
          name="applicantId"
          value={formData.applicantId}
          onChange={handleChange}
          required
        >
          <option value="">-- Select User --</option>
          {users.map((u) => (
            <option key={u.id} value={u.id}>
              {u.name}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label>Team</label>
        <select
          name="teamId"
          value={formData.teamId}
          onChange={handleChange}
          required
        >
          <option value="">-- Select Team --</option>
          {teams.map((t) => (
            <option key={t.id} value={t.id}>
              {t.name}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label>Status</label>
        <input
          name="status"
          value={formData.status}
          onChange={handleChange}
          placeholder="e.g. Pending, Approved"
        />
      </div>

      <button className="submit-btn" type="submit">
        {edit ? "Update Application" : "Create Application"}
      </button>
    </form>
  );
}