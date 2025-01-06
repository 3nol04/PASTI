import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../Item/Navbar";

const ManageBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isProcessing, setIsProcessing] = useState({});
  const [newBlog, setNewBlog] = useState({
    title: "",
    description: "",
    image: "",
  });
  const [isCreating, setIsCreating] = useState(false);

  useEffect(() => {
    document.body.style.backgroundColor = "#1c1c1c";
    document.body.style.backgroundImage = "url('/assets/Dashboard/dBg.png')";
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundPosition = "center";
    document.body.style.backgroundAttachment = "fixed";
    document.body.style.backgroundColor = "white"; 
    document.body.style.backgroundColor = "";
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
          setError("Data blog tidak valid.");
        }
      } catch (err) {
        setError(err.response?.data?.message || "Gagal memuat data blog.");
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus blog ini?")) {
      setIsProcessing((prev) => ({ ...prev, [id]: true }));
      try {
        await axios.delete(`http://8.218.83.35:80/api/blogs/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setBlogs((prevBlogs) => prevBlogs.filter((blog) => blog.id !== id));
      } catch (err) {
        setError(err.response?.data?.message || "Gagal menghapus blog.");
      } finally {
        setIsProcessing((prev) => ({ ...prev, [id]: false }));
      }
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    setIsProcessing((prev) => ({ ...prev, create: true }));
    try {
      const formData = new FormData();
      formData.append("title", newBlog.title);
      formData.append("description", newBlog.description);
      formData.append("image", newBlog.image);
      const response = await axios.post("http://8.218.83.35:80/api/blogs", formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data",
        },
      });
      setBlogs((prevBlogs) => [response.data.data, ...prevBlogs]);
      setNewBlog({ title: "", description: "", image: "" });
      setIsCreating(false);
    } catch (err) {
      setError(err.response?.data?.message || "Gagal membuat blog.");
    } finally {
      setIsProcessing((prev) => ({ ...prev, create: false }));
    }
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    setIsProcessing((prev) => ({ ...prev, [selectedBlog.id]: true }));
    try {
      const formData = new FormData();
      formData.append("title", selectedBlog.title);
      formData.append("description", selectedBlog.description);
      if (selectedBlog.image instanceof File) {
        formData.append("image", selectedBlog.image);
      }
      await axios.post(
        `http://8.218.83.35:80/api/blogs/${selectedBlog.id}?_method=PATCH`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setBlogs((prevBlogs) =>
        prevBlogs.map((blog) =>
          blog.id === selectedBlog.id ? { ...selectedBlog, image: blog.image } : blog
        )
      );
      setSelectedBlog(null);
    } catch (err) {
      setError(err.response?.data?.message || "Gagal memperbarui blog.");
    } finally {
      setIsProcessing((prev) => ({ ...prev, [selectedBlog.id]: false }));
    }
  };

  return (
    <>
      <Navbar bgColor="#1c1c1c" />
      <div className="container mt-5" style={{ paddingTop: "30px", color: "white", fontFamily: "Raleway" }}>
        <div className="d-flex justify-content-between align-items-center">
          <h2>Manage Blogs</h2>
          <button className="btn btn-success mb-1" onClick={() => setIsCreating(true)}>
            Create New Blog
          </button>
        </div>

        {error && <div className="alert alert-danger">{error}</div>}

        {loading ? (
          <p>Loading...</p>
        ) : (
          <table className="table table-striped mt-4">
            <thead>
              <tr>
                <th>No</th>
                <th>Title</th>
                <th>Description</th>
                <th>Image</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {blogs.length > 0 ? (
                blogs.map((blog, index) => (
                  <tr key={blog.id}>
                    <td>{index + 1}</td>
                    <td>{blog.title}</td>
                    <td>{blog.description}</td>
                    <td>
                      {blog.image && (
                        <img
                          src={`http://8.218.83.35:80/storage/${blog.image}`}
                          alt={blog.title}
                          style={{ width: "100px", height: "100px" }}
                        />
                      )}
                    </td>
                    <td>
                      <button
                        className="btn btn-warning btn-sm me-2"
                        onClick={() => setSelectedBlog(blog)}
                        disabled={isProcessing[blog.id]}
                      >
                        {isProcessing[blog.id] ? "Loading..." : "Edit"}
                      </button>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleDelete(blog.id)}
                        disabled={isProcessing[blog.id]}
                      >
                        {isProcessing[blog.id] ? "Processing..." : "Delete"}
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5">Tidak ada blog untuk ditampilkan.</td>
                </tr>
              )}
            </tbody>
          </table>
        )}

        {isCreating && (
          <ModalForm
            title="Create New Blog"
            blog={newBlog}
            setBlog={setNewBlog}
            onSubmit={handleCreate}
            onClose={() => setIsCreating(false)}
            isProcessing={isProcessing.create}
            backdropStyle={{ backdropFilter: "blur(10px)" }} 
          />
        )}

        {selectedBlog && (
          <ModalForm
            title="Edit Blog"
            blog={selectedBlog}
            setBlog={setSelectedBlog}
            onSubmit={handleEdit}
            onClose={() => setSelectedBlog(null)}
            isProcessing={isProcessing[selectedBlog.id]}
            backdropStyle={{ backdropFilter: "blur(10px)" }} 
          />
        )}
      </div>
    </>
  );
};

const ModalForm = ({ title, blog, setBlog, onSubmit, onClose, isProcessing, backdropStyle }) => (
  <div className="modal show d-block text-dark" tabIndex="-1" style={{ ...backdropStyle }}>
    <div className="modal-dialog">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">{title}</h5>
          <button type="button" className="btn-close" onClick={onClose}></button>
        </div>
        <form onSubmit={onSubmit}>
          <div className="modal-body">
            <div className="mb-3">
              <label htmlFor="title" className="form-label">
                Title
              </label>
              <input
                type="text"
                id="title"
                className="form-control"
                value={blog.title}
                onChange={(e) => setBlog({ ...blog, title: e.target.value })}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="description" className="form-label">
                Description
              </label>
              <textarea
                id="description"
                className="form-control"
                value={blog.description}
                onChange={(e) => setBlog({ ...blog, description: e.target.value })}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="image" className="form-label">
                Upload Image
              </label>
              <input
                type="file"
                id="image"
                className="form-control"
                onChange={(e) => setBlog({ ...blog, image: e.target.files[0] })}
              />
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" disabled={isProcessing}>
              {isProcessing ? "Saving..." : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
);

export default ManageBlogs;
