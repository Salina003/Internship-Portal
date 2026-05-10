import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api";
import "./ProjectList.css";

export default function ProjectList() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    api.get("/projects").then((res) => setProjects(res.data));
  }, []);

  if (!projects.length)
    return (
      <div className="pl-empty">
        <p>No projects created yet.</p>
      </div>
    );

  return (
    <div className="pl-container">
      <div className="pl-header">
        <h2>Projects</h2>
        <p className="pl-sub">Explore projects and view details</p>
      </div>

      <ul className="pl-list">
        {projects.map((p) => (
          <li className="pl-item" key={p.id}>
            <Link to={`${p.id}`}>
              <div className="pl-title-row">
                <span className="pl-title">{p.name}</span>
                {p.mentor && (
                  <span className="pl-badge">{p.mentor.name}</span>
                )}
              </div>

              <div className="pl-meta">
                {p.startDate && (
                  <span>
                    {new Date(p.startDate).toLocaleDateString()}
                  </span>
                )}
                {p.endDate && (
                  <>
                    <span className="pl-dot">•</span>
                    <span>
                      {new Date(p.endDate).toLocaleDateString()}
                    </span>
                  </>
                )}
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}