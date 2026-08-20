import React from 'react';
import { Building2, Mail, ChevronRight } from 'lucide-react';

export default function FacultySearchResult({ faculty, onClick }) {
  return (
    <div
      className="faculty-result-card"
      onClick={() => onClick(faculty)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          onClick(faculty);
        }
      }}
    >
      <img
        src={faculty.image}
        alt={faculty.name}
        className="faculty-result-image"
        loading="lazy"
      />
      <div className="faculty-result-info">
        <h3 className="faculty-result-name">{faculty.name}</h3>
        <p className="faculty-result-title">{faculty.designation}</p>
        <div className="faculty-result-meta">
          <span className="meta-item">
            <Building2 size={14} />
            {faculty.department}
          </span>
          <span className="meta-item">
            <Mail size={14} />
            {faculty.email}
          </span>
        </div>
      </div>
      <ChevronRight size={20} className="arrow-icon" />
    </div>
  );
}
