import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../../Item/Navbar";
import Alert from '@mui/material/Alert';
import "../../../styles/manageUser.css";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [admin, setAdmin] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isProcessing, setIsProcessing] = useState({}); 
  const [adminSearchQuery, setAdminSearchQuery] = useState(""); 
  const [userSearchQuery, setUserSearchQuery] = useState(""); 

  // Fetch data pengguna
  useEffect(() => {
    document.body.style.backgroundColor = "#1c1c1c";
    document.body.style.backgroundImage = "url('/assets/Dashboard/dBg.png')";
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundPosition = "center";
    document.body.style.backgroundAttachment = "fixed";
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const response = await axios.get("http://8.218.83.35:80/api/users", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        if (response.data.success && Array.isArray(response.data.data)) {
          setUsers(response.data.data.filter((user) => user.role === "user"));
          setAdmin(response.data.data.filter((user) => user.role === "admin"));
        } else {
          setError("Data pengguna tidak valid.");
        }
      } catch (err) {
        if (err.response?.status === 500) {
          setError("Koneksi ke server gagal, silahkan coba lagi.");
        }
        setError(err.response?.data?.message || "Gagal memuat data pengguna.");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const filteredAdmins = admin.filter((admin) =>
    admin.name.toLowerCase().includes(adminSearchQuery.toLowerCase())
  );
  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(userSearchQuery.toLowerCase())
  );

  // Hapus pengguna
  const handleDelete = async (id) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus pengguna ini?")) {
      setIsProcessing((prev) => ({ ...prev, [id]: true }));
      try {
        await axios.delete(`http://8.218.83.35:80/api/users/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
        setAdmin((prevAdmins) => prevAdmins.filter((admin) => admin.id !== id));
        alert("Pengguna berhasil dihapus.");
      } catch (err) {
        console.error(err);
        setError(err.response?.data?.message || "Gagal menghapus pengguna.");
      } finally {
        setIsProcessing((prev) => ({ ...prev, [id]: false }));
      }
    }
  };

  // Simpan perubahan pengguna
  const handleEdit = async (e) => {
    e.preventDefault();
    setIsProcessing((prev) => ({ ...prev, [selectedUser.id]: true }));
    try {
      const response = await axios.patch(
        `http://8.218.83.35:80/api/users/${selectedUser.id}`,
        {
          name: selectedUser.name,
          email: selectedUser.email,
          role: selectedUser.role,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (selectedUser.role === "admin") {
        setAdmin((prevAdmins) =>
          prevAdmins.map((admin) =>
            admin.id === selectedUser.id ? selectedUser : admin
          )
        );
      } else {
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user.id === selectedUser.id ? selectedUser : user
          )
        );
      }
      setSelectedUser(null);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Gagal memperbarui pengguna.");
    } finally {
      setIsProcessing((prev) => ({ ...prev, [selectedUser.id]: false }));
    }
  };

  return (
    <>
      <Navbar bgColor="#1c1c1c" />
      <div className="container mt-5">
        {/* Table Admin */}
        <h2 style={{ fontFamily: "Raleway", color: "white", marginTop: "20px" }}>Admin</h2>
        <input
          type="text"
          className="form-control search-bar mb-3"
          placeholder="Cari Admin ..."
          value={adminSearchQuery}
          onChange={(e) => setAdminSearchQuery(e.target.value)}
          style={{ width: "200px" }}
        />
        <table className="table table-striped">
          <thead>
            <tr>
              <th style={{ width: "10%" }}>No</th>
              <th style={{ width: "30%" }}>Nama</th>
              <th style={{ width: "30%" }}>Email</th>
              <th style={{ width: "20%" }}>Role</th>
              <th style={{ width: "10%" }}>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {filteredAdmins.length > 0 ? (
              filteredAdmins.map((admin, index) => (
                <tr key={admin.id}>
                  <td>{index + 1}</td>
                  <td>{admin.name}</td>
                  <td>{admin.email}</td>
                  <td>{admin.role}</td>
                  <td>
                    <button
                      className="btn btn-warning btn-sm me-2"
                      onClick={() => setSelectedUser(admin)}
                      disabled={isProcessing[admin.id]}
                    >
                      {isProcessing[admin.id] ? "Loading..." : "Edit"}
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDelete(admin.id)}
                      disabled={isProcessing[admin.id]}
                    >
                      {isProcessing[admin.id] ? "Processing..." : "Delete"}
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5">Tidak ada admin untuk ditampilkan.</td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Table Users */}
        <h2 style={{ fontFamily: "Raleway", color: "white", marginTop: "40px" }}>Users</h2>
        <input
          type="text"
          className="form-control search-bar mb-3"
          placeholder="Cari User ..."
          value={userSearchQuery}
          onChange={(e) => setUserSearchQuery(e.target.value)}
          style={{ width: "200px" }}
        />
        {error && <Alert variant="outlined" severity="error">{error}</Alert>}
        <table className="table table-striped mt-4">
          <thead>
            <tr>
              <th style={{ width: "10%" }}>No</th>
              <th style={{ width: "30%" }}>Nama</th>
              <th style={{ width: "30%" }}>Email</th>
              <th style={{ width: "20%" }}>Role</th>
              <th style={{ width: "10%" }}>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user, index) => (
                <tr key={user.id}>
                  <td>{index + 1}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td>
                    <button
                      className="btn btn-warning btn-sm me-2"
                      onClick={() => setSelectedUser(user)}
                      disabled={isProcessing[user.id]}
                    >
                      {isProcessing[user.id] ? "Loading..." : "Edit"}
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDelete(user.id)}
                      disabled={isProcessing[user.id]}
                    >
                      {isProcessing[user.id] ? "Processing..." : "Delete"}
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5">Tidak ada pengguna untuk ditampilkan.</td>
              </tr>
            )}
          </tbody>
        </table>

        {selectedUser && (
          <div
            className="modal show d-block"
            tabIndex="-1"
            style={{ width: "100%", backdropFilter: "blur(10px)" }}
          >
            <div className="modal-dialog">
              <div className="modal-content" style={{ backgroundColor: "#f5f5f5" }}>
                <div className="modal-header">
                  <h5
                    className="modal-title d-flex justify-content-center"
                    style={{ width: "100%" }}
                  >
                    Edit {selectedUser.role === "admin" ? "Admin" : "User"}
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setSelectedUser(null)}
                    disabled={isProcessing[selectedUser.id]}
                  ></button>
                </div>
                <form onSubmit={handleEdit}>
                  <div className="modal-body">
                    <div className="mb-3">
                      <label
                        htmlFor="name"
                        className="form-label"
                        style={{ fontSize: "20px", fontFamily: "Roboto" }}
                      >
                        Nama
                      </label>
                      <input
                        type="text"
                        id="name"
                        className="form-control"
                        value={selectedUser.name}
                        onChange={(e) => setSelectedUser({ ...selectedUser, name: e.target.value })}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label
                        htmlFor="email"
                        className="form-label"
                        style={{ fontSize: "20px", fontFamily: "Roboto" }}
                      >
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        className="form-control"
                        value={selectedUser.email}
                        onChange={(e) => setSelectedUser({ ...selectedUser, email: e.target.value })}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label
                        htmlFor="role"
                        className="form-label"
                        style={{ fontSize: "20px", fontFamily: "Roboto" }}
                      >
                        Role
                      </label>
                      <select
                        id="role"
                        className="form-select"
                        value={selectedUser.role}
                        onChange={(e) => setSelectedUser({ ...selectedUser, role: e.target.value })}
                        required
                      >
                        <option value="admin">Admin</option>
                        <option value="user">User</option>
                      </select>
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={() => setSelectedUser(null)}
                      disabled={isProcessing[selectedUser.id]}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="btn btn-primary"
                      disabled={isProcessing[selectedUser.id]}
                    >
                      {isProcessing[selectedUser.id] ? "Saving..." : "Save Changes"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ManageUsers;