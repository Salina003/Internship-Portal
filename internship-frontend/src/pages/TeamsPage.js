import React from "react";
import { Routes, Route, NavLink } from "react-router-dom";
import TeamList from "../components/TeamList";
import TeamDetail from "../components/TeamDetail";
import TeamForm from "../components/TeamForm";
import "./TeamsPage.css";

export default function TeamsPage() {
  return (
    <div className="teams-page">
      <h2>Teams</h2>

      <nav className="team-nav">
        <NavLink end to="">
          List
        </NavLink>
        <NavLink to="new">
          Add New
        </NavLink>
      </nav>

      <div className="team-content">
        <Routes>
          <Route path="/" element={<TeamList />} />
          <Route path="new" element={<TeamForm />} />
          <Route path=":id" element={<TeamDetail />} />
          <Route path=":id/edit" element={<TeamForm edit />} />
        </Routes>
      </div>
    </div>
  );
}