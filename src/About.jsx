import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import l from "./assets/l.jpeg";
import { FaBrain, FaLock, FaBolt, FaFeatherAlt, FaCode } from 'react-icons/fa';
import { MdOutlineLightMode } from 'react-icons/md';
import "./About.css";

const aboutSections = [
  {
    title: "Our Mission",
    description: "EONIX AI aims to bridge the gap between human intelligence and artificial intelligence, enabling people to interact with AI naturally and creatively. We are committed to privacy, reliability, and adaptive intelligence.",
    icon: <FaBrain />
  },
  {
    title: "Our Vision",
    description: "We envision a future where AI is not just a tool but a collaborative partner — helping humans solve problems, create art, code efficiently, and make informed decisions with context-aware insights.",
    icon: <MdOutlineLightMode />
  },
  {
    title: "Our Values",
    description: "Innovation, trust, and user empowerment guide every decision at EONIX. We value the privacy of your conversations and strive to make AI interaction seamless and meaningful.",
    icon: <FaLock />
  },
  {
    title: "Our Capabilities",
    description: "From creative writing to coding, reasoning, and problem-solving, EONIX adapts to multiple domains. Our lightning-fast AI ensures that every interaction is responsive and intelligent.",
    icon: <FaBolt />
  },
  {
    title: "Our Expertise",
    description: "EONIX combines technical mastery with creative intelligence. We continuously enhance AI algorithms to offer users a rich conversational experience that evolves with their needs.",
    icon: <FaCode />
  },
  {
    title: "Adaptive Learning",
    description: "EONIX remembers conversation context, learns user preferences, and adapts over time. Each interaction becomes more personalized, making your AI experience smarter and more human-like.",
    icon: <FaFeatherAlt />
  }
];

// Animation variants
const textVariant = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
};

const cardVariant = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.6 } }
};

function About() {
  const navigate = useNavigate();

  return (
    <section className="about-container">
      {/* Navbar */}
      <nav className="navbar">
        <div className="logo" onClick={() => navigate("/")}>
          <img src={l} className="logo-icon" />
          <span className="logo-text">EONIX</span>
        </div>
        <ul className="nav-links">
          <li onClick={() => navigate("/")}>Home</li>
          <li onClick={() => navigate("/contact")}>Contact</li>
        </ul>
      </nav>

      {/* Hero Section */}
      <div className="about-hero-section">
        <motion.h1
          className="hero-title"
          initial="hidden"
          animate="visible"
          variants={textVariant}
        >
          About <span className="highlight-blue">EONIX AI</span>
        </motion.h1>
        <motion.p
          className="hero-subtitle"
          initial="hidden"
          animate="visible"
          variants={textVariant}
        >
          Discover our journey, values, and vision for the future of human-AI interaction.
        </motion.p>
      </div>

      {/* About Sections */}
      <motion.div
        className="about-sections-grid"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={{ visible: { opacity: 1, transition: { staggerChildren: 0.1 } } }}
      >
        {aboutSections.map((section, index) => (
          <motion.div
            key={index}
            className="about-card"
            variants={cardVariant}
            whileHover={{ scale: 1.03, boxShadow: "0 0 25px rgba(0, 188, 212, 0.5)" }}
          >
            <div className="about-icon">{section.icon}</div>
            <h3>{section.title}</h3>
            <p>{section.description}</p>
          </motion.div>
        ))}
      </motion.div>

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

export default About;
