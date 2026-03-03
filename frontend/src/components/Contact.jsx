/*import "../styles/Contact.css";
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaInstagram, FaLinkedin } from "react-icons/fa";

export default function Contact() {
  return (
    <section className="contact-section" id="contact">
      <h2>Contact Us</h2>
      <div className="contact-container">

        <div className="contact-info">
          <div className="contact-card">
            <FaMapMarkerAlt className="contact-icon" />
            <h3>Location</h3>
            <p>Your City, Country</p>
          </div>

          <div className="contact-card">
            <FaPhoneAlt className="contact-icon" />
            <h3>Phone</h3>
            <p>+91 123 456 7890</p>
          </div>

          <div className="contact-card">
            <FaEnvelope className="contact-icon" />
            <h3>Email</h3>
            <p>yourmail@example.com</p>
          </div>

          <div className="contact-card">
            <FaInstagram className="contact-icon" />
            <h3>Instagram</h3>
            <p>@your_instagram</p>
          </div>

          <div className="contact-card">
            <FaLinkedin className="contact-icon" />
            <h3>LinkedIn</h3>
            <p>linkedin.com/in/yourprofile</p>
          </div>
        </div>

        {/* Optional Contact Form *}
        <div className="contact-form">
          <h3>Send a Message</h3>
          <form>
            <input type="text" placeholder="Your Name" />
            <input type="email" placeholder="Your Email" />
            <textarea placeholder="Your Message" rows="5"></textarea>
            <button type="submit">Send Message</button>
          </form>
        </div>

      </div>
    </section>
  );
} */

  import "../styles/Contact.css";
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaInstagram, FaLinkedin } from "react-icons/fa";

export default function Contact() {
  return (
    <section className="contact-section" id="contact">
      <h2>Contact Us</h2>

      <div className="contact-container">

        <div className="contact-item">
          <FaMapMarkerAlt className="contact-icon" />
          <h4>Location</h4>
          <p>Your City, Country</p>
        </div>

        <div className="contact-item">
          <FaPhoneAlt className="contact-icon" />
          <h4>Phone</h4>
          <p>+91 123 456 7890</p>
        </div>

        <div className="contact-item">
          <FaEnvelope className="contact-icon" />
          <h4>Email</h4>
          <p>yourmail@example.com</p>
        </div>

        <div className="contact-item">
          <FaInstagram className="contact-icon" />
          <h4>Instagram</h4>
          <p>@your_instagram</p>
        </div>

        <div className="contact-item">
          <FaLinkedin className="contact-icon" />
          <h4>LinkedIn</h4>
          <p>linkedin.com/in/yourprofile</p>
        </div>

      </div>
    </section>
  );
}