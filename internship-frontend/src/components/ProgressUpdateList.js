import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api";
import "./ProgressUpdateList.css";

export default function ProgressUpdateList() {
  const [updates, setUpdates] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/progressupdates")
      .then((res) => setUpdates(res.data))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <p className="empty-progress">Loading progress updates...</p>;
  }

  if (!updates.length) {
    return <p className="empty-progress">No progress updates found.</p>;
  }

  return (
    <ul className="progress-list">
      {updates.map((u) => (
        <li className="progress-item" key={u.id}>
          <Link to={`/progressupdates/${u.id}`} className="progress-card">
            {/* LEFT */}
            <div className="card-left">
              <h4>Progress Update #{u.id}</h4>

              <p className="card-meta">
                Application #{u.applicationId}
              </p>

              {u.date && (
                <p className="card-date">
                  {new Date(u.date).toLocaleDateString()}
                </p>
              )}
            </div>

            {/* RIGHT */}
            <div className="card-right">
              <span className="progress-badge">
                {u.completionPercentage ?? 0}%
              </span>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}