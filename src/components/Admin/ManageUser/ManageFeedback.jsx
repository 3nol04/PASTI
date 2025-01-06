import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../../Item/Navbar";
import Alert from "@mui/material/Alert";


const ManageFeedback = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isProcessing, setIsProcessing] = useState({});
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    document.body.style.backgroundColor = "#1c1c1c";
    document.body.style.backgroundImage = "url('/assets/Dashboard/dBg.png')";
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundPosition = "center";
    document.body.style.backgroundAttachment = "fixed";

    const fetchFeedbacks = async () => {
      setLoading(true);
      try {
        const response = await axios.get("http://8.218.83.35:80/api/feedbacks/list", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        if (response.data.success && Array.isArray(response.data.data)) {
          setFeedbacks(response.data.data);
        } else {
          setError("Data feedback tidak valid.");
        }
      } catch (err) {
        if (err.response?.status === 500) {
          setError("Koneksi ke server gagal, silahkan coba lagi.");
        }
        setError(err.response?.data?.message || "Gagal memuat data feedback.");
      } finally {
        setLoading(false);
      }
    };

    fetchFeedbacks();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus feedback ini?")) {
      setIsProcessing((prev) => ({ ...prev, [id]: true }));
      try {
        await axios.delete(`http://8.218.83.35:80/api/feedbacks/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setFeedbacks((prevFeedbacks) => prevFeedbacks.filter((feedback) => feedback.id !== id));
        alert("Feedback berhasil dihapus.");
      } catch (err) {
        console.error(err);
        setError(err.response?.data?.message || "Gagal menghapus feedback.");
      } finally {
        setIsProcessing((prev) => ({ ...prev, [id]: false }));
      }
    }
  };

  const filteredFeedbacks = feedbacks.filter((feedback) =>
    feedback.message.toLowerCase().includes(searchQuery.toLowerCase()) ||
    feedback.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <Navbar bgColor="#1c1c1c" />
      <div className="container mt-5">
        <h2 style={{ fontFamily: "Raleway", color: "white", marginTop: "20px" }}>Feedback</h2>
        {error && <Alert variant="outlined" severity="error">{error}</Alert>}
        <input
          type="text"
          className="form-control search-bar mb-3"
          placeholder="Cari data..."
          value={searchQuery} 
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{ width: "200px" }}
        />

        <table className="table table-striped">
          <thead>
            <tr>
              <th style={{ width: "10%" }}>No</th>
              <th style={{ width: "40%" }}>Feedback</th>
              <th style={{ width: "30%" }}>User</th>
              <th style={{ width: "10%" }}>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {filteredFeedbacks.length > 0 ? (
              filteredFeedbacks.map((feedback, index) => (
                <tr key={feedback.id}>
                  <td>{index + 1}</td>
                  <td>{feedback.message}</td>
                  <td>{feedback.email}</td>
                  <td>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDelete(feedback.id)}
                      disabled={isProcessing[feedback.id]}
                    >
                      {isProcessing[feedback.id] ? "Processing..." : "Delete"}
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4">Tidak ada feedback untuk ditampilkan.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ManageFeedback;
