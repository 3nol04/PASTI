import { useState } from "react";
import axios from "axios";
import { useNavigate, NavLink } from "react-router-dom";
import "../../styles/Register.css";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (password !== passwordConfirmation) {
      setError("Konfirmasi password tidak cocok dengan password.");
      return;
    }

    try {

      await axios.post("http://8.218.83.35:80/api/register", {
        name : name,
        email : email,
        password : password,
        password_confirmation: passwordConfirmation,
      });

      setMessage("Pendaftaran berhasil! Silakan login.");
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (err) {
      setError("Pendaftaran gagal, periksa kembali data Anda.");
    }
  };

  return (
    <div className="register-container">
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="card p-5 shadow-lg register-card">
          <h2 className="text-center mb-4 register-heading">Register</h2>
          <form onSubmit={handleSubmit} className="fade-in">
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Name
              </label>
              <input
                type="text"
                className="form-control"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-3 position-relative">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type={passwordVisible ? "text" : "password"}
                className="form-control"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="btn toggle-button"
                onClick={() => setPasswordVisible(!passwordVisible)}
              >
                <i className={passwordVisible ? "bi bi-eye-slash" : "bi bi-eye"}></i>
              </button>
            </div>
            <div className="mb-3 position-relative">
              <label htmlFor="passwordConfirmation" className="form-label">
                Confirm Password
              </label>
              <input
                type={confirmPasswordVisible ? "text" : "password"}
                className="form-control"
                id="passwordConfirmation"
                value={passwordConfirmation}
                onChange={(e) => setPasswordConfirmation(e.target.value)}
                required
              />
              <button
                type="button"
                className="btn toggle-button"
                onClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
              >
                <i className={confirmPasswordVisible ? "bi bi-eye-slash" : "bi bi-eye"}></i>
              </button>
            </div>
            {error && <p className="text-danger text-center fade-in">{error}</p>}
            {message && <p className="text-success text-center fade-in">{message}</p>}
            <button
              type="submit"
              className="btn btn-primary w-100 pulse-button"
            >
              Register
            </button>
          </form>
          <div className="text-center mt-3 fade-in">
            <span>
              Punya akun?{" "}
              <NavLink to="/login" className="register-link">
                Masuk di sini
              </NavLink>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
