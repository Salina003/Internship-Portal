import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api";
import "./UserList.css";

export default function UserList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    api.get("/users").then(res => setUsers(res.data));
  }, []);

  if (!users.length)
    return <p className="empty-users">No users found.</p>;

  return (
    <ul className="user-list">
      {users.map((u) => (
        <li className="user-item" key={u.id}>
          <Link to={`/users/${u.id}`}>
            {/* Top row: user name and optional badge */}
            <div className="user-title-row">
              <span className="user-name">{u.name}</span>
              {/* Uncomment below to show user role as a badge */}
              {/* <span className="user-badge">{u.role}</span> */}
            </div>
            {/* Meta row: user email */}
            <div className="user-meta">{u.email}</div>
          </Link>
        </li>
      ))}
    </ul>
  );
}