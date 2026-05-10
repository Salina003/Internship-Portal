import React from "react";
import { Routes, Route, NavLink } from "react-router-dom";
import UserList from "../components/UserList";
import UserDetail from "../components/UserDetail";
import UserForm from "../components/UserForm";
import "./UsersPage.css";

function UsersPage() {
  return (
    <div className="users-page">
      <h2>Users</h2>

      <nav className="user-nav">
        <NavLink end to="">
          User List
        </NavLink>
        <NavLink to="new">
          Add User
        </NavLink>
      </nav>

      <div className="user-content">
        <Routes>
          <Route path="/" element={<UserList />} />
          <Route path="new" element={<UserForm />} />
          <Route path=":id" element={<UserDetail />} />
          <Route path=":id/edit" element={<UserForm edit />} />
        </Routes>
      </div>
    </div>
  );
}

export default UsersPage;