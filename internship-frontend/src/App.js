import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useLocation,
} from "react-router-dom";

import Home from "./pages/Home";
import UsersPage from "./pages/UsersPage";
import ProjectsPage from "./pages/ProjectsPage";
import TeamsPage from "./pages/TeamsPage";
import ApplicationsPage from "./pages/ApplicationsPage";
import ProgressUpdatesPage from "./pages/ProgressUpdatesPage";
import CertificateListPage from "./pages/CertificateListPage";

import "./App.css";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const links = [
    { to: "/", label: "Home" },
    { to: "/users", label: "Users" },
    { to: "/projects", label: "Projects" },
    { to: "/teams", label: "Teams" },
    { to: "/applications", label: "Applications" },
    { to: "/progressupdates", label: "Progress Updates" },
    { to: "/my-certificates", label: "Certificates" },
  ];

  return (
    <>
      <div className={`navbar ${menuOpen ? "active" : ""}`}>
        <div className="nav-logo">ProjectApp</div>

        <div className="nav-links">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={
                location.pathname.startsWith(link.to) ? "active-link" : ""
              }
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>

      {/* Mobile Hamburger */}
      <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
      </div>
    </>
  );
}

function App() {
  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/users/*" element={<UsersPage />} />
            <Route path="/projects/*" element={<ProjectsPage />} />
            <Route path="/teams/*" element={<TeamsPage />} />
            <Route path="/applications/*" element={<ApplicationsPage />} />
            <Route path="/progressupdates/*" element={<ProgressUpdatesPage />} />
            <Route path="/my-certificates" element={<CertificateListPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;