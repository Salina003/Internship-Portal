import React from "react";
import { Routes, Route, Link, NavLink } from "react-router-dom";
import ApplicationList from "../components/ApplicationList";
import ApplicationDetail from "../components/ApplicationDetail";
import ApplicationForm from "../components/ApplicationForm";
import "./ApplicationsPage.css";

export default function ApplicationsPage() {
  return (
    <div className="applications-page">
      <h2>Applications</h2>

      <nav className="app-nav">
        <NavLink end to="">
          List
        </NavLink>
        <NavLink to="new">
          Add New
        </NavLink>
      </nav>

      <div className="app-content">
        <Routes>
          <Route path="/" element={<ApplicationList />} />
          <Route path="new" element={<ApplicationForm />} />
          <Route path=":id" element={<ApplicationDetail />} />
          <Route path=":id/edit" element={<ApplicationForm edit />} />
        </Routes>
      </div>
    </div>
  );
}