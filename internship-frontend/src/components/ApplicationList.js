import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api";
import "./ApplicationList.css";

export default function ApplicationList() {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    api.get("/applications").then((res) => setApplications(res.data));
  }, []);

  if (!applications.length)
    return <p className="empty-text">No applications found.</p>;

  return (
    <ul className="application-list">
      {applications.map((a) => (
        <li className="application-item" key={a.id}>
          <Link to={`${a.id}`}>
            <span>Application #{a.id}</span>
            <span className={`app-status ${a.status || ""}`}>
              {a.status || "N/A"}
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}