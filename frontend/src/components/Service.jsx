/*import { useEffect, useState } from "react";
import "../styles/Services.css";
import ServiceCard from "./ServiceCard";
//import { API } from "../api/api";

export default function Services() {
  const [services, setServices] = useState([]);

 /* useEffect(() => {
    API.get("/services")
      .then(res => setServices(res.data))
      .catch(err => console.log(err));
  }, []); *

  return (
    <section id="services" className="services-section">
      <h2>Our Services</h2>

      <div className="services-grid">
        {services.map((item) => (
          <ServiceCard
            key={item._id}
            image={item.image}
            title={item.title}
            description={item.description}
          />
        ))}
      </div>
    </section>
  );
}*/
import { useEffect, useState } from "react";
import "../styles/Services.css";
import ServiceCard from "./ServiceCard";

export default function Services() {
  const [services, setServices] = useState([]);

  useEffect(() => {
    const savedServices = JSON.parse(localStorage.getItem("services"));
    if (savedServices) {
      setServices(savedServices);
    }
  }, []);

  return (
    <section id="services" className="services-section">
      <h2>Our Services</h2>

      <div className="services-grid">
        {services.map((item, index) => (
          <ServiceCard
            key={index}
            image={item.image}
            title={item.title}
            description={item.description}
          />
        ))}
      </div>
    </section>
  );
}