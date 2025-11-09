import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  FaLock,
  FaBrain,
  FaBolt,
  FaTasks,
  FaFeatherAlt,
  FaCode,
  FaUser,
  FaRobot,
  FaTrash,
  FaBars,
  FaTimes
} from "react-icons/fa";
import { MdOutlineLightMode } from "react-icons/md";
import { FaTwitter, FaLinkedinIn, FaGithub } from 'react-icons/fa';
import { MessageCirclePlus } from "lucide-react";
import l from "./assets/l.jpeg";
import "./Home.css";

const features = [
  { icon: <FaBrain />, title: "Context-Aware Conversations", description: "EONIX understands the flow of dialogue, remembering previous exchanges to provide coherent and meaningful responses." },
  { icon: <MdOutlineLightMode />, title: "Dark & Immersive Interface", description: "Experience a beautifully designed interface that’s easy on the eyes and perfect for long conversations." },
  { icon: <FaBrain />, title: "Conversational Memory", description: "Remembers context across chats for truly coherent conversations." },
  { icon: <FaBolt />, title: "Lightning Speed", description: "Instant responses with real-time intelligence processing." },
  { icon: <FaTasks />, title: "Multitasking Mind", description: "Capable of reasoning, coding, writing, and more across diverse domains." },
  { icon: <FaLock />, title: "Privacy First", description: "Your conversations stay yours — secure and private." },
  { icon: <FaFeatherAlt />, title: "Adaptive Intelligence", description: "Learns from your preferences and adapts responses to match your communication style and needs." },
  { icon: <FaCode />, title: "Creative & Technical Expertise", description: "From creative writing to complex coding problems, EONIX excels across diverse domains." },
];

const steps = [
  { number: '01', icon: <MessageCirclePlus />, title: 'Start a New Chat', description: 'Click “New Chat” to start a fresh conversation.' },
  { number: '02', icon: <FaUser />, title: 'Type Your Message', description: 'Write your question, idea, or thought in the input box.' },
  { number: '03', icon: <FaRobot />, title: 'Get AI Response', description: 'EONIX responds in real-time with intelligent answers.' },
  { number: '04', icon: <FaTrash />, title: 'View Recent History & Delete Chats', description: 'Recent chats appear on the sidebar. Click on a chat to open or use the delete icon to remove it.' },
];

const textVariant = { hidden: { opacity: 0, y: 50 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8 } } };
const cardVariant = { hidden: { opacity: 0, scale: 0.8 }, visible: { opacity: 1, scale: 1, transition: { duration: 0.6 } } };

function Home() {
  const navigate = useNavigate();
  return (
    <section className="home-container">
      {/* Top Navbar */}
   <nav className="navbar">
  <div className="logo" onClick={() => navigate("/")}>
    <img src={l} alt="Logo" className="logo-icon" />
    <span className="logo-text">EONIX</span>
  </div>
  <ul className="nav-links">
    <li onClick={() => navigate("/about")}>About</li>
    <li onClick={() => navigate("/contact")}>Contact</li>
  </ul>
     </nav>



      {/* Hero Section */}
      <div className="sparkle-background">
        <motion.div className="hero-section hero-talk-to-future" initial="hidden" animate="visible" variants={textVariant}>
          <div className="hero-content-large">
            <h1 className="hero-title">Talk to the Future</h1>
            <h2 className="hero-subtitle">Powered by <span className="highlight-blue">EONIX AI</span></h2>
            <p className="hero-description">Experience intelligent conversations that think, feel, and evolve.</p>
            <div className="hero-buttons">
              <motion.button whileHover={{ scale: 1.05, boxShadow: "0 0 20px #00bcd4" }} className="highlight-blue start-btn primary-btn" onClick={() => navigate("/chatwindow")}>Start Chatting</motion.button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* What is EONIX Section */}
      <motion.div className="eonix-description-section" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.5 }} variants={{ visible: { opacity: 1, transition: { staggerChildren: 0.1 } } }}>
        <motion.h2 variants={textVariant}>What is <span className="highlight-blue">EONIX AI?</span></motion.h2>
        <motion.p variants={textVariant} className="ai-definition">
          EONIX AI is your personal intelligent companion — **designed to understand, reason, and engage in meaningful conversations**. Whether you’re seeking answers, brainstorming ideas, coding help, or creative writing — EONIX adapts to your style and provides responses that feel truly human.
        </motion.p>
      </motion.div>
      <hr className="divider-line" />

      {/* Features Section */}
      <motion.section className="features-section" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} variants={{ visible: { opacity: 1, transition: { staggerChildren: 0.1 } } }}>
        <motion.h2 variants={textVariant}>Powerful <span className="highlight-blue">Features</span></motion.h2>
        <motion.p variants={textVariant} className="feature-tagline">Discover what makes EONIX AI the most advanced conversational companion.</motion.p>
        <div className="feature-grid">
          {features.map((feature, index) => (
            <motion.div key={index} className="feature-card" variants={cardVariant} whileHover={{ scale: 1.03, boxShadow: "0 0 25px rgba(0, 188, 212, 0.4)" }}>
              <div className="feature-icon">{feature.icon}</div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>
      <hr className="divider-line" />

      {/* How to Use Section */}
      <motion.section className="how-to-use-section" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={{ visible: { opacity: 1, transition: { staggerChildren: 0.1 } } }}>
        <motion.h2 variants={textVariant}>How to <span className="highlight-blue">Use EONIX</span></motion.h2>
        <motion.p variants={textVariant} className="use-tagline">Get started in four simple steps and unlock the power of AI conversations.</motion.p>
        <div className="steps-grid">
          {steps.map((step, index) => (
            <motion.div key={index} className="step-card" variants={cardVariant}>
              <div className="step-number">{step.number}</div>
              <div className="step-icon">{step.icon}</div>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>
      <hr className="divider-line" />

      {/* Footer */}
    <footer className="footer"> 
      <div className="footer-content"> 
        <img src={l} className="logo-icon" /> 
        <div className="logo footer-logo">EONIX</div> 
        <p className="copyright-text">© 2025 EONIX. All rights reserved.</p> 
        <div className="socials"> <a href="#"><FaTwitter /></a> <a href="#"><FaLinkedinIn /></a> <a href="#"><FaGithub /></a> </div> <p className="footer-tagline">Powered by advanced AI technology. Built for the future of human-AI interaction.</p> </div> </footer>
    </section>
  );
}

export default Home;
