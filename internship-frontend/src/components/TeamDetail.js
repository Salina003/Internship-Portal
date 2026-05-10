import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import api from "../api";
import "./TeamDetail.css";

export default function TeamDetail() {
  const { id } = useParams();
  const [team, setTeam] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    api.get(`/teams/${id}`).then(res => setTeam(res.data));
  }, [id]);

  const deleteTeam = async () => {
    if (window.confirm("Delete team?")) {
      await api.delete(`/teams/${id}`);
      navigate("/teams");
    }
  };

  if (!team) return <p>Loading...</p>;

  return (
    <div className="team-detail">
      <h3>{team.name}</h3>
      <p className="team-description">{team.description || "No description"}</p>

      <div className="team-info">
        <div className="team-card">
          <strong>Project ID:</strong> {team.projectId || "None"}
        </div>
      </div>

      <p>Users:</p>
      {team.users && team.users.length > 0 ? (
        <div className="team-users">
          {team.users.map(user => (
            <span className="user-badge" key={user.id}>
              {user.name} (ID: {user.id})
            </span>
          ))}
        </div>
      ) : (
        <p>No users assigned to this team.</p>
      )}

      <div className="team-actions">
        <Link className="btn-edit" to={`/teams/${id}/edit`}>Edit</Link>
        <button className="btn-delete" onClick={deleteTeam}>Delete</button>
        <Link className="btn-back" to="/teams">Back</Link>
      </div>
    </div>
  );
}