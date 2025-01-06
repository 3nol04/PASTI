import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function ProtectedRoute({ children, allowedRoles }) {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (!token) {
      navigate("/"); // ke login kalo belum login
    } else if (!allowedRoles.includes(role)) {
      // Redirect based on role mismatch 
      // ini mau dikasih component Authorize
      if (role === "admin") {
        navigate("/Admin/dashboard"); // ke admin dashboard
      } else if (role === "user") {
        navigate("/user/home"); // ke user home
      } else {
        navigate("/"); // balik ke login kalo tidak ada 
      }
    }
  }, [navigate, allowedRoles]);

  return children;
}
