

import { useEffect, useState } from "react";
import axios from "axios";
import "../styles/Services.css";
import ServiceCard from "./ServiceCard";

export default function Services() {
  const [services, setServices] = useState([]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/user/allMedia"
        );

        console.log("Website Data:", res.data); // 🔥 DEBUG
        setServices(res.data);

      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };

    fetchServices();
  }, []);

  return (
    <section className="services-section">
      <h2>Our Services</h2>

      <div className="services-grid">
        {services.length === 0 ? (
          <p>No services available</p>
        ) : (
          services.map((item) => (
            <ServiceCard
              key={item._id}
              image={item.imageUrl}
              title={item.title}
              description={item.description}
            />
          ))
        )}
      </div>
    </section>
  );
}