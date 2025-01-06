import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../../styles/blog.css";

const BlogCard = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true);
      try {
        const response = await axios.get("http://8.218.83.35:80/api/blogs", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        if (response.data.success && Array.isArray(response.data.data)) { 
          setBlogs(response.data.data);
        } else {
          setError("Invalid data received from the server.");
        }
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch blogs.");
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="alert alert-danger">{error}</div>;

  const handleButtonClick = () => {
    if (token) {
      navigate("/user/predict");
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="blog-section" style={{ padding: "50px 0"  }}>
      <div className="container text-center">
        <div>
          <h2 className="text-start" style={{ fontWeight: "bold", marginBottom: "20px" }}>
            Let's try now!
          </h2>
          <p className="text-start" style={{ color: "#6c757d", marginBottom: "40px" }}>
            Try our fun and educational website about sign language! Learn how to communicate with hand signals, increase
            understanding, and promote inclusivity together. Start now and be part of positive change!
          </p>
        </div>

        <div
          className="container kontainer-blog"
          style={{
            display: "flex",
            overflowX: "auto",
            gap: "20px",
            paddingBottom: "20px",
            width: "100%",
            maxWidth: "1080px",
            whiteSpace: "nowrap",
            margin: "0 auto",
          }}
        >
          {blogs.length > 0 ? (
            blogs.map((blog) => (
              <div
                key={blog.id}
                className="blog-card"
                style={{
                  width: "250px",
                  height: "300px",
                  display: "inline-block",
                  backgroundColor: "#1c1c1c",
                  borderRadius: "10px",
                  overflow: "hidden",
                  flexShrink: 0, 
                }}
              >
                <div
                  className="blog-image"
                  style={{
                    width: "100%",
                    height: "70%",
                    overflow: "hidden",
                  }}
                >
                  <img
                    src={`http://8.218.83.35:80/storage/${blog.image}`}
                    alt={blog.title}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </div>
                <div
                  className="blog-title"
                  style={{
                    width: "100%",
                    height: "30%",
                    backgroundColor: "#fff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <p
                    style={{
                      margin: "0",
                      fontSize: "16px",
                      fontWeight: "bold",
                      textAlign: "center",
                    }}
                  >
                    {blog.title}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <div>
              <p>No data available</p>
            </div>
          )}
        </div>

        <button
          style={{
            marginTop: "40px",
            padding: "10px 20px",
            fontSize: "18px",
            color: "#fff",
            backgroundColor: "#000",
            border: "none",
            borderRadius: "10px",
            cursor: "pointer",
          }}
          onClick={handleButtonClick}
        >
          Upload →
        </button>
      </div>
    </div>
  );
};

export default BlogCard;
