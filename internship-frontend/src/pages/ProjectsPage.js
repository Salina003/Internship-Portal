import React from "react";
import { Routes, Route, NavLink } from "react-router-dom";
import ProjectList from "../components/ProjectList";
import ProjectDetail from "../components/ProjectDetail";
import ProjectForm from "../components/ProjectForm";
import "./ProjectsPage.css";

export default function ProjectsPage() {
  return (
    <div className="projects-wrapper">
      <div className="projects-header">
        <div>
          <h2 className="projects-title">Discover Projects</h2>
          <p className="projects-subtitle">
            Join multiple projects and collaborate with teams across domains
          </p>
        </div>

        <div className="projects-count">24 Projects Available</div>
      </div>

      <nav className="projects-nav">
        <NavLink end to="">
          Browse
        </NavLink>
        <NavLink to="new">
          New Project
        </NavLink>
      </nav>

      <section className="projects-content">
        <Routes>
          <Route path="/" element={<ProjectList />} />
          <Route path="new" element={<ProjectForm />} />
          <Route path=":id" element={<ProjectDetail />} />
          <Route path=":id/edit" element={<ProjectForm edit />} />
        </Routes>
      </section>
    </div>
  );
}