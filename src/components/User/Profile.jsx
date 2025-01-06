import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../../styles/Profile.css";

const UpdateProfile = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get("http://8.218.83.35:80/api//user", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setUser({
          name: response.data.name,
          email: response.data.email,
        });
      } catch (err) {
        setError("Failed to load user data.");
      }
    };

    fetchUserData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.patch(
        "http://8.218.83.35:80/api/user/update-profile",
        user,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setSuccessMessage(response.data.message);
      setError("");

      setTimeout(() => {
        navigate("/user/home");
      }, 1500);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update profile.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  return (
    <div className="profile-page-container">
      <div className="back-button-container">
        <button
          className="back-button"
          onClick={() => navigate(-1)}
        >
          <i className="bi bi-arrow-left"></i> Back
        </button>
      </div>

      <div className="profile-form-card animated-card">
        <h1 className="profile-title">Profile Settings</h1>

        {error && <div className="alert-message alert-error">{error}</div>}
        {successMessage && (
          <div className="alert-message alert-success">{successMessage}</div>
        )}

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={user.name}
            onChange={handleChange}
            required
            className="input-field"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={user.email}
            onChange={handleChange}
            required
            className="input-field"
          />
          <input
            type="password"
            name="password"
            placeholder="New Password (optional)"
            value={user.password}
            onChange={handleChange}
            className="input-field"
          />
          <button
            type="submit"
            disabled={loading}
            className={`submit-button ${loading ? "loading" : ""}`}
          >
            {loading ? "Saving..." : "Save Changes"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateProfile;