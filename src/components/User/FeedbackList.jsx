import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../styles/FeedbackList.css";

const FeedbackList = () => {
  const [feedbacks, setFeedbacks] = useState([]);

  const fetchFeedbacks = async () => {
    try {
      const response = await axios.get("http://8.218.83.35:80/api/feedbacks", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const sortedFeedbacks = response.data
        .sort((a, b) => new Date(b.created_at) - new Date(a.created_at)) 
        .slice(0, 3); 

      setFeedbacks(sortedFeedbacks);
    } catch (error) {
      console.error("Error fetching feedbacks:", error);
    }
  };

  useEffect(() => {
    fetchFeedbacks();

    const interval = setInterval(() => {
      fetchFeedbacks();
    }, 10000); 

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="container">
      <h2 className="header">Experience</h2>
      <div className="list-container">
        {feedbacks.map((feedback, index) => (
          <div key={index} className="feedback-card">
            <div className="feedback-content">
              <p className="email">
                <i className="bi bi-person-circle mx-2"></i>
                {feedback.email}
              </p>
              <p className="message">{feedback.message}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeedbackList;
