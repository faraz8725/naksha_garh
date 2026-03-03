


  import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/Admin.css";

export default function AdminPanel() {
  const navigate = useNavigate();

  const [services, setServices] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [editId, setEditId] = useState(null);

  const token = localStorage.getItem("token");

  // 🔥 Fetch All Services
  const fetchServices = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/user/allMedia"
      );
      setServices(res.data);
    } catch (err) {
      console.error("Fetch Error:", err);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  // 🔐 Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  // 📸 File Select
  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  // 🚀 Add / Update Service
  const handleSubmit = async () => {
    if (!title || !description || (!imageFile && !editId)) {
      alert("Please fill all fields");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);

      if (imageFile) {
        formData.append("image", imageFile); // ⚠️ MUST match upload.single("image")
      }

      if (editId) {
        // UPDATE
        await axios.put(
          `http://localhost:5000/api/user/updateMedia/${editId}`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );
        alert("Service Updated ✅");
      } else {
        // ADD
        await axios.post(
          "http://localhost:5000/api/user/uploadMedia",
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );
        alert("Service Added ✅");
      }

      // Reset
      setTitle("");
      setDescription("");
      setImageFile(null);
      setEditId(null);

      fetchServices();

    } catch (err) {
      console.log("STATUS:", err.response?.status);
      console.log("DATA:", err.response?.data);
      alert(err.response?.data?.message || "Operation failed ❌");
    }
  };

  // ✏️ Edit
  const handleEdit = (item) => {
    setTitle(item.title);
    setDescription(item.description);
    setEditId(item._id);
  };

  // 🗑 Delete
  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `http://localhost:5000/api/user/deleteMedia/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      alert("Deleted Successfully 🗑");
      fetchServices();

    } catch (err) {
      alert("Delete failed ❌");
    }
  };

  return (
    <div className="admin-container">

      <div className="admin-header">
        <h2>Admin Dashboard</h2>
        <button onClick={handleLogout}>Logout</button>
      </div>

      {/* FORM */}
      <div className="admin-form">
        <input
          type="text"
          placeholder="Service Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <input type="file" onChange={handleImageChange} />

        <button onClick={handleSubmit}>
          {editId ? "Update Service" : "Add Service"}
        </button>
      </div>

      {/* SERVICES LIST */}
      <div className="services-grid">
        {services.map((item) => (
          <div key={item._id} className="service-card-admin">
            {item.imageUrl && (
              <img src={item.imageUrl} alt={item.title} />
            )}

            <h4>{item.title}</h4>
            <p>{item.description}</p>

            <div>
              <button onClick={() => handleEdit(item)}>
                Edit
              </button>

              <button onClick={() => handleDelete(item._id)}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}