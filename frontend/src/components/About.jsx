import { useState } from "react";
import "../styles/About.css";
import aboutImg from "../assets/home1.png";

export default function About() {
  const [showMore, setShowMore] = useState(false);

  return (
    <section className="about-section" id="about">
      <div className="about-container">
        
        <div className="about-image">
          <img src={aboutImg} alt="About Us" />
        </div>

        <div className="about-content">
          <h2>About Us</h2>

          <p>
            We are a passionate team dedicated to delivering high-quality
            digital solutions.
          </p>

          {/* Ye content tabhi dikhega jab button click hoga */}
          {showMore && (
            <>
              <p>
                Our mission is to help businesses grow with innovative design 
                and development services.
              </p>

              <p>
                With years of experience in web development and UI/UX design,
                we focus on creating impactful digital experiences.
              </p>
            </>
          )}

          <button
            className="about-btn"
            onClick={() => setShowMore(!showMore)}
          >
            {showMore ? "Show Less" : "Learn More"}
          </button>
        </div>

      </div>
    </section>
  );
}