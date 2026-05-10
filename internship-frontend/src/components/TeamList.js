import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api";
import "./TeamList.css";

export default function TeamList() {
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    api.get("/teams").then(res => setTeams(res.data));
  }, []);

  if (!teams.length)
    return <p className="empty-teams">No teams found.</p>;

  return (
    <ul className="team-list">
      {teams.map(team => (
        <li className="team-item" key={team.id}>
          <Link to={`/teams/${team.id}`}>
            {/* Top row: team name */}
            <div className="team-title-row">
              <span className="team-name">{team.name}</span>
              {/* Optional: <span className="team-badge">{team.type}</span> */}
            </div>
            {/* Meta row for future use */}
            {/* <div className="team-meta">{team.membersCount} members</div> */}
          </Link>
        </li>
      ))}
    </ul>
  );
}