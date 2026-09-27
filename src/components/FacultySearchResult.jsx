import React from 'react';
import { Building2, Mail, ChevronRight, MapPin } from 'lucide-react';
import { getFacultyAvatarUrl } from '../api/facultyAPI';

export default function FacultySearchResult({ faculty, onClick }) {
  const fallbackAvatar = getFacultyAvatarUrl(faculty?.name);
  const photoSrc = faculty?.image_url || faculty?.image || fallbackAvatar;

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
        src={photoSrc}
        alt={faculty.name}
        className="faculty-result-image"
        loading="lazy"
        onError={(e) => {
          e.currentTarget.onerror = null;
          e.currentTarget.src = fallbackAvatar;
        }}
      />
      <div className="faculty-result-info">
        <h3 className="faculty-result-name">{faculty.name}</h3>
        <p className="faculty-result-title">{faculty.cabin && faculty.cabin !== '-' ? `Cabin: ${faculty.cabin}` : faculty.designation}</p>
        <div className="faculty-result-meta">
          <span className="meta-item">
            <Building2 size={14} />
            {faculty.department}
          </span>
          {faculty.cabin && faculty.cabin !== '-' && (
            <span className="meta-item">
              <MapPin size={14} />
              {faculty.cabin}
            </span>
          )}
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
