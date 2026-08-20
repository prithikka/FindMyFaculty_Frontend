import React from 'react';
import {
  ArrowLeft,
  Building2,
  Mail,
  Phone,
  MapPin,
  Clock,
  BookOpen,
  User,
  ExternalLink
} from 'lucide-react';

export default function FacultyDetails({ faculty, onBack }) {
  if (!faculty) return null;

  return (
    <div className="details-container">
      <button className="back-button" onClick={onBack} type="button">
        <ArrowLeft size={18} />
        Back to Faculty List
      </button>

      {/* Hero Header Card */}
      <div className="details-hero-card">
        <img
          src={faculty.image}
          alt={faculty.name}
          className="details-avatar"
        />
        <div className="details-header-info">
          <h2 className="details-name">{faculty.name}</h2>
          <p className="details-designation">{faculty.designation}</p>
          <div className="details-department-chip">
            <Building2 size={14} />
            <span>{faculty.department}</span>
          </div>
        </div>
      </div>

      {/* Details Grid */}
      <div className="details-grid-layout">
        {/* Left Column: Biography & Courses */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* Bio Section */}
          <div className="details-section-card">
            <h3 className="section-heading">
              <User size={18} className="section-icon" />
              Biography & Research
            </h3>
            <p style={{ color: 'var(--text-secondary)', lineHeight: '1.65', fontSize: '0.95rem' }}>
              {faculty.bio || 'No biography details currently provided.'}
            </p>
          </div>

          {/* Courses Section */}
          <div className="details-section-card">
            <h3 className="section-heading">
              <BookOpen size={18} className="section-icon" />
              Courses & Teaching
            </h3>
            <div className="courses-tags-wrapper">
              {faculty.courses && faculty.courses.length > 0 ? (
                faculty.courses.map((course, idx) => (
                  <div key={idx} className="course-badge">
                    {course}
                  </div>
                ))
              ) : (
                <p style={{ color: 'var(--text-muted)' }}>No courses currently listed.</p>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Contact & Office Hours */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div className="details-section-card">
            <h3 className="section-heading">Contact Information</h3>
            <div className="info-list">
              <div className="info-item">
                <Mail size={16} className="info-item-icon" />
                <div className="info-item-content">
                  <span className="info-item-label">Email</span>
                  <span className="info-item-value">{faculty.email}</span>
                </div>
              </div>

              <div className="info-item">
                <Phone size={16} className="info-item-icon" />
                <div className="info-item-content">
                  <span className="info-item-label">Phone</span>
                  <span className="info-item-value">{faculty.phone || 'N/A'}</span>
                </div>
              </div>

              <div className="info-item">
                <MapPin size={16} className="info-item-icon" />
                <div className="info-item-content">
                  <span className="info-item-label">Office Location</span>
                  <span className="info-item-value">{faculty.office}</span>
                </div>
              </div>

              <div className="info-item">
                <Clock size={16} className="info-item-icon" />
                <div className="info-item-content">
                  <span className="info-item-label">Office Hours</span>
                  <span className="info-item-value">{faculty.officeHours}</span>
                </div>
              </div>
            </div>

            <a
              href={`mailto:${faculty.email}`}
              className="contact-action-btn"
              style={{ marginTop: '0.75rem' }}
            >
              <Mail size={16} />
              Send Email
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
