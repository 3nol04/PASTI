import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { logout } from "../Auth/logout";
import "../../styles/nav.css";

const Navbar = React.forwardRef(({ bgColor }, ref) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const role = localStorage.getItem("role");
  const name = localStorage.getItem("name");
  const token = localStorage.getItem("token");

  const handleLogout = async () => {
    const success = await logout();
    if (success) {
      ["token", "name", "role"].forEach((item) => localStorage.removeItem(item));
      window.location.href = "/";
    }
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <nav
      ref={ref}
      className="navbar navbar-expand-lg navbar-dark shadow-sm fixed-top"
      style={{
        backgroundColor: "transparent",
        position: "fixed",
        color: "white",
        top: 0,
        width: "100%",
        zIndex: 1000,
      }}
    >
      <div className="container-fluid">
        <a className="navbar-brand fw-bold">
          {role === "admin" ? (
            <p className="admin-title">Admin Panel</p>
          ) : (
            <p className="user-title">Pasti</p>
          )}
        </a>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav mx-auto">
            {role === "admin" && (
              <>
                <li className="nav-item">
                  <NavLink
                    className={`nav-link ${window.location.pathname === "/Admin/dashboard" ? "active" : ""}`}
                    to="/Admin/dashboard"
                  >
                    Dashboard
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    className={`nav-link ${window.location.pathname === "/Admin/manage/users" ? "active" : ""}`}
                    to="/Admin/manage/users"
                  >
                    Manage Users
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    className={`nav-link ${window.location.pathname === "/Admin/manage/blogs" ? "active" : ""}`}
                    to="/Admin/manage/blogs"
                  >
                    Manage Blogs
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    className={`nav-link ${window.location.pathname === "/Admin/manage/Feedback" ? "active" : ""}`}
                    to="/Admin/manage/Feedback"
                  >
                    Manage Feedback
                  </NavLink>
                </li>
              </>
            )}
          </ul>

          <ul className="navbar-nav ms-auto">
            {role === "user" && (
              <li className="nav-item">
                <NavLink className="nav-link text-white" to="/User/home">
                  Home
                </NavLink>
              </li>
            )}
          </ul>

          <div className="d-flex align-items-center">
            {token ? (
              <>
               
                {role === "user" && (
                  <div className="dropdown">
                    <button className="btn dropdown-toggle"
                      type="button"
                      id="dropdownMenuButton1"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >Setting</button>
                    <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                      <li>
                        <NavLink className="dropdown-item" to="/user/Profile/setting">
                          Setting
                        </NavLink>
                      </li>
                    </ul>
                  </div>
                )}

                <span className="text-white me-3">{`Hi, ${name || "Guest"}`}</span>

                <button onClick={handleLogout} className="btn ms-3 text-white hover-red">
                  <i className="bi bi-box-arrow-right me-2"></i> Logout
                </button>
              </>
            ) : (
              <NavLink className="btn btn-outline-primary" to="/login">
                <i className="bi bi-box-arrow-in-right me-2"></i> Login
              </NavLink>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
});

export default Navbar;