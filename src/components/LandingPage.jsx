import React, { useState, useEffect } from 'react';
import { ArrowRight, Search, MapPin, Navigation, Calendar } from 'lucide-react';
import Logo from './Logo';
import IsometricCampusMap from './IsometricCampusMap';

export default function LandingPage({ onOpenStudentLogin }) {
  const [activeNav, setActiveNav] = useState('home'); // 'home' | 'about'

  // ScrollSpy listener to update activeNav based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const homeSection = document.getElementById('home');
      const aboutSection = document.getElementById('about');

      if (homeSection && aboutSection) {
        const aboutTop = aboutSection.getBoundingClientRect().top;
        // If aboutSection is in view (near upper half of viewport), activate 'about'
        if (aboutTop <= window.innerHeight * 0.4) {
          setActiveNav('about');
        } else {
          setActiveNav('home');
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    setActiveNav(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="landing-container">
      {/* Sticky Navigation Bar */}
      <header className="landing-navbar">
        <div className="landing-navbar-inner">
          <div className="landing-brand" onClick={() => scrollToSection('home')} role="button" tabIndex={0}>
            <Logo size="md" />
          </div>

          <nav className="landing-nav-links">
            <button
              type="button"
              className={`landing-nav-link ${activeNav === 'home' ? 'active' : ''}`}
              onClick={() => scrollToSection('home')}
            >
              Home
            </button>
            <button
              type="button"
              className={`landing-nav-link ${activeNav === 'about' ? 'active' : ''}`}
              onClick={() => scrollToSection('about')}
            >
              About
            </button>
          </nav>
        </div>
      </header>

      {/* Main Single Page Scroll Content */}
      <main className="landing-main-scroll">
        {/* Section 1: Home Hero */}
        <section id="home" className="landing-section hero-section">
          <div className="landing-hero">
            <div className="hero-left">
              <h1 className="hero-title">
                FindMy<span className="hero-accent">Faculty</span>
              </h1>
              <p className="hero-subtitle">
                An intelligent campus platform for discovering faculty members, locating cabins, finding clear walking directions, and checking active schedules in real time.
              </p>
              <div className="hero-cta-group">
                <button
                  type="button"
                  className="hero-primary-btn"
                  onClick={onOpenStudentLogin}
                >
                  <ArrowRight size={18} />
                  <span>Student Login</span>
                </button>
              </div>
            </div>

            <div className="hero-right">
              <IsometricCampusMap />
            </div>
          </div>
        </section>

        {/* Section 2: About / Core Capabilities */}
        <section id="about" className="landing-section about-section">
          <div className="landing-about">
            <div className="about-header">
              <span className="about-badge">CORE CAPABILITIES</span>
              <h2 className="about-title">Designed for Campus Discovery</h2>
              <p className="about-subtitle">
                FindMyFaculty provides students with instant clarity on faculty locations and availability across campus buildings.
              </p>
            </div>

            <div className="capabilities-grid">
              <div className="capability-card">
                <div className="capability-icon">
                  <Search size={22} />
                </div>
                <h3 className="capability-card-title">Faculty Discovery</h3>
                <p className="capability-card-desc">
                  Browse and search faculty members by name, department, expertise, or research lab.
                </p>
              </div>

              <div className="capability-card">
                <div className="capability-icon">
                  <MapPin size={22} />
                </div>
                <h3 className="capability-card-title">Cabin Location</h3>
                <p className="capability-card-desc">
                  View exact building numbers, floor levels, wing sections, and cabin numbers.
                </p>
              </div>

              <div className="capability-card">
                <div className="capability-icon">
                  <Navigation size={22} />
                </div>
                <h3 className="capability-card-title">Directions</h3>
                <p className="capability-card-desc">
                  Understand clear walking paths and elevator routes to reach any faculty cabin efficiently.
                </p>
              </div>

              <div className="capability-card">
                <div className="capability-icon">
                  <Calendar size={22} />
                </div>
                <h3 className="capability-card-title">Timetable</h3>
                <p className="capability-card-desc">
                  View real-time faculty office hours, ongoing lecture slots, and consultation availability.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
