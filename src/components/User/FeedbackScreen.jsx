import React, { useState } from "react";
import axios from "axios";
import "../../styles/FeedbackForm.css";

const FeedbackForm = () => {
  const [name, setName] = useState(""); 
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) {
      setError("You must be logged in to submit feedback.");
      return;
    }

    const formData = new FormData();
    formData.append("name", name); 
    formData.append("email", email);
    formData.append("message", message);

    try {
      const response = await axios.post(
        "http://8.218.83.35:80/api/feedbacks", 
        formData, 
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data", 
          },
        }
      );

      if (response.status === 201) {
        setSuccess("Thank you for your feedback!");
        setName(""); 
        setEmail("");
        setMessage("");

        setTimeout(() => {
          setSuccess("");
        }, 3000);
      } else {
        setError("Failed to send feedback. Please try again.");
      }
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred. Please try again.");
    }
  };

  return (
    <div className="feedback-container">
      <h2>Submit your feedback!</h2>
      <p>Every step you take supports a more inclusive world.</p>

      {success && <div className="feedback-success">{success}</div>}
      {error && <div className="feedback-error">{error}</div>}

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="feedback-input"
        />
        <input
          type="email"
          placeholder="Enter Your Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="feedback-input"
        />
        <textarea
          placeholder="Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
          rows="5"
          className="feedback-textarea"
        ></textarea>
        <button type="submit" className="feedback-button">
          Send Feedback
        </button>
      </form>
    </div>
  );
};

export default FeedbackForm;
