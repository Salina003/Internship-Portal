import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import api from "../api";
import "./ProjectDetail.css";

export default function ProjectDetail() {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    api.get(`/projects/${id}`).then((res) => setProject(res.data));
  }, [id]);

  const deleteProject = async () => {
    if (window.confirm("Delete this project?")) {
      await api.delete(`/projects/${id}`);
      navigate("/projects");
    }
  };

  if (!project) return <div className="pd-loading">Loading...</div>;

  return (
    <div className="pd-container">
      
      <div className="pd-header">
        <h2 className="pd-title">{project.name}</h2>
        <p className="pd-subtitle">
          Project details and timeline insights
        </p>
      </div>

      <p className="pd-description">
        {project.description || "No description provided"}
      </p>

      <div className="pd-info-grid">
        <div className="pd-card">
          <span className="pd-label">Start Date</span>
          <span className="pd-value">
            {project.startDate
              ? new Date(project.startDate).toLocaleDateString()
              : "N/A"}
          </span>
        </div>

        <div className="pd-card">
          <span className="pd-label">End Date</span>
          <span className="pd-value">
            {project.endDate
              ? new Date(project.endDate).toLocaleDateString()
              : "N/A"}
          </span>
        </div>

        <div className="pd-card full">
          <span className="pd-label">Mentor</span>
          <span className="pd-value">
            {project.mentor ? project.mentor.name : "No assigned mentor"}
          </span>
        </div>
      </div>

      <div className="pd-actions">
        <Link className="pd-btn edit" to="edit">Edit</Link>
        <button className="pd-btn delete" onClick={deleteProject}>Delete</button>
        <Link className="pd-btn back" to="/projects">Back</Link>
      </div>
    </div>
  );
}