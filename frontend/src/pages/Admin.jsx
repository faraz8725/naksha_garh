/*import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Admin.css";

export default function AdminPanel() {
  const navigate = useNavigate();

  const [services, setServices] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [editIndex, setEditIndex] = useState(null);

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  // Image upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(URL.createObjectURL(file));
  };

  // Add or Update
  const handleSubmit = () => {
    const newService = { title, description, image };

    if (editIndex !== null) {
      const updated = [...services];
      updated[editIndex] = newService;
      setServices(updated);
      setEditIndex(null);
    } else {
      setServices([...services, newService]);
    }

    setTitle("");
    setDescription("");
    setImage(null);
  };

  // Delete
  const handleDelete = (index) => {
    const filtered = services.filter((_, i) => i !== index);
    setServices(filtered);
  };

  // Edit
  const handleEdit = (index) => {
    const item = services[index];
    setTitle(item.title);
    setDescription(item.description);
    setImage(item.image);
    setEditIndex(index);
  };

  return (
    <div className="admin-container">
      
      <div className="admin-header">
        <h2 className="admin-title">Admin Dashboard</h2>
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>

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
          {editIndex !== null ? "Update Service" : "Add Service"}
        </button>
      </div>

      <div className="services-grid">
        {services.map((item, index) => (
          <div key={index} className="service-card-admin">
            {item.image && <img src={item.image} alt="" />}

            <div className="content">
              <h4>{item.title}</h4>
              <p>{item.description}</p>

              <div className="card-buttons">
                <button
                  className="edit-btn"
                  onClick={() => handleEdit(index)}
                >
                  Edit
                </button>

                <button
                  className="delete-btn"
                  onClick={() => handleDelete(index)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
} 
  */

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Admin.css";

export default function AdminPanel() {
  const navigate = useNavigate();

  const [services, setServices] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [editIndex, setEditIndex] = useState(null);

  // 🔹 Load saved services on page load
  useEffect(() => {
    const savedServices = JSON.parse(localStorage.getItem("services"));
    if (savedServices) {
      setServices(savedServices);
    }
  }, []);

  // 🔹 Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  // 🔹 Image upload + preview
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  // 🔹 Add or Update Service
  const handleSubmit = () => {
    if (!title || !description) {
      alert("Please fill all fields");
      return;
    }

    let updatedServices;
    const newService = { title, description, image };

    if (editIndex !== null) {
      updatedServices = [...services];
      updatedServices[editIndex] = newService;
      setEditIndex(null);
    } else {
      updatedServices = [...services, newService];
    }

    setServices(updatedServices);
    localStorage.setItem("services", JSON.stringify(updatedServices));

    // Reset fields
    setTitle("");
    setDescription("");
    setImage(null);
  };

  // 🔹 Delete Service
  const handleDelete = (index) => {
    const filtered = services.filter((_, i) => i !== index);
    setServices(filtered);
    localStorage.setItem("services", JSON.stringify(filtered));
  };

  // 🔹 Edit Service
  const handleEdit = (index) => {
    const item = services[index];
    setTitle(item.title);
    setDescription(item.description);
    setImage(item.image);
    setEditIndex(index);
  };

  return (
    <div className="admin-container">
      
      <div className="admin-header">
        <h2 className="admin-title">Admin Dashboard</h2>
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>

      {/* Form Section */}
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
          {editIndex !== null ? "Update Service" : "Add Service"}
        </button>
      </div>

      {/* Services List */}
      <div className="services-grid">
        {services.length === 0 ? (
          <p>No services added yet.</p>
        ) : (
          services.map((item, index) => (
            <div key={index} className="service-card-admin">
              {item.image && <img src={item.image} alt="" />}

              <div className="content">
                <h4>{item.title}</h4>
                <p>{item.description}</p>

                <div className="card-buttons">
                  <button
                    className="edit-btn"
                    onClick={() => handleEdit(index)}
                  >
                    Edit
                  </button>

                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(index)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

    </div>
  );
}