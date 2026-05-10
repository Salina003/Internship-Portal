import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import api from "../api";
import "./ProgressUpdateDetail.css";

export default function ProgressUpdateDetail() {
  const { id } = useParams();
  const [update, setUpdate] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    api.get(`/progressupdates/${id}`).then((res) => setUpdate(res.data));
  }, [id]);

  const deleteUpdate = async () => {
    if (window.confirm("Delete update?")) {
      await api.delete(`/progressupdates/${id}`);
      navigate("/progressupdates");
    }
  };

  if (!update) return <p>Loading...</p>;

  const calculateDynamicCompletion = () => {
    if (!update.startDate || !update.endDate) return "0%";

    const start = new Date(update.startDate);
    const end = new Date(update.endDate);
    const now = new Date();

    if (now <= start) return "0%";
    if (now >= end) return "100%";

    const percent = Math.round(((now - start) / (end - start)) * 100);
    return `${percent}%`;
  };

  const progress = calculateDynamicCompletion();

  return (
    <div className="progress-detail">
      <h3>Progress Update #{update.id}</h3>

      <div className="progress-grid">
        <div className="info-card">Application ID: {update.applicationId || "N/A"}</div>
        <div className="info-card">User ID: {update.userId || "N/A"}</div>

        <div className="info-card info-full">
          Content: {update.content || "No content"}
        </div>

        <div className="info-card">Start: {update.startDate ? new Date(update.startDate).toLocaleDateString() : "N/A"}</div>
        <div className="info-card">End: {update.endDate ? new Date(update.endDate).toLocaleDateString() : "N/A"}</div>

        <div className="info-card info-full">
          Progress Details: {update.progressDetails || "None"}
        </div>
      </div>

      <div className="progress-bar-wrapper">
        <div className="progress-bar-bg">
          <div
            className="progress-bar-fill"
            style={{ "--progress": progress }}
          ></div>
        </div>
        <div className="progress-text">{progress} Complete</div>
      </div>

      <div className="actions">
        <Link className="btn-edit" to={`/progressupdates/${id}/edit`}>Edit</Link>
        <button className="btn-delete" onClick={deleteUpdate}>Delete</button>
        <Link className="btn-back" to="/progressupdates">Back</Link>
      </div>
    </div>
  );
}