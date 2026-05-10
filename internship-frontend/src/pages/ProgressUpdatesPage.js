import React from "react";
import { Routes, Route, NavLink } from "react-router-dom";
import ProgressUpdateList from "../components/ProgressUpdateList";
import ProgressUpdateDetail from "../components/ProgressUpdateDetail";
import ProgressUpdateForm from "../components/ProgressUpdateForm";
import "./ProgressUpdatesPage.css";

export default function ProgressUpdatesPage() {
  return (
    <div className="progress-page">
      <h2>Progress Updates</h2>

      <nav className="progress-nav">
        <NavLink end to="">
          List
        </NavLink>
        <NavLink to="new">
          Add New
        </NavLink>
      </nav>

      <div className="progress-content">
        <Routes>
          <Route path="/" element={<ProgressUpdateList />} />
          <Route path="new" element={<ProgressUpdateForm />} />
          <Route path=":id" element={<ProgressUpdateDetail />} />
          <Route path=":id/edit" element={<ProgressUpdateForm edit />} />
        </Routes>
      </div>
    </div>
  );
}