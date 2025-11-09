import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';
import l from "./assets/l.jpeg";
import "./Home.css";

const textVariant = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
};

const cardVariant = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.6 } }
};

function Contact() {
  const navigate = useNavigate();

  const contactMethods = [
    { icon: <FaEnvelope />, title: "Email", description: "contact@eonix.ai" },
    { icon: <FaPhone />, title: "Phone", description: "+91 98765 43210" },
    { icon: <FaMapMarkerAlt />, title: "Address", description: "123 Future St, AI City, India" },
  ];

  return (
    <section className="home-container">
      {/* Navbar */}
      <nav className="navbar">
        <div className="logo" onClick={() => navigate("/")}>
          <img src={l} className="logo-icon" />
          <span className="logo-text">EONIX</span>
        </div>
        <ul className="nav-links">
          <li onClick={() => navigate("/")}>Home</li>
          <li onClick={() => navigate("/about")}>About</li>
        </ul>
      </nav>

      {/* Hero Section */}
      <motion.div
        className="hero-section hero-talk-to-future"
        initial="hidden"
        animate="visible"
        variants={textVariant}
      >
        <div className="hero-content-large">
          <h1 className="hero-title">Get in Touch</h1>
          <h2 className="hero-subtitle">We’d love to hear from you</h2>
          <p className="hero-description">Whether it’s feedback, questions, or collaboration ideas, EONIX is always listening.</p>
        </div>
      </motion.div>

      {/* Contact Cards */}
      <motion.section
        className="features-section"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={{ visible: { opacity: 1, transition: { staggerChildren: 0.1 } } }}
      >
        <motion.h2 variants={textVariant}>Contact <span className="highlight-blue">EONIX</span></motion.h2>
        <motion.p variants={textVariant} className="feature-tagline">
          Choose your preferred way to reach out.
        </motion.p>

        <div className="feature-grid">
          {contactMethods.map((method, index) => (
            <motion.div
              key={index}
              className="feature-card"
              variants={cardVariant}
              whileHover={{ scale: 1.03, boxShadow: "0 0 25px rgba(0, 188, 212, 0.4)" }}
            >
              <div className="feature-icon">{method.icon}</div>
              <h3>{method.title}</h3>
              <p>{method.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <img src={l} className="logo-icon" />
          <div className="logo footer-logo">EONIX</div>
          <p className="copyright-text">© 2025 EONIX. All rights reserved.</p>
        </div>
      </footer>
    </section>
  );
}

export default Contact;
