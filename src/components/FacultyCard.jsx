import React from 'react';
import { getFacultyAvatarUrl } from '../api/facultyAPI';

export default function FacultyCard({ faculty, onClick }) {
  const fallbackAvatar = getFacultyAvatarUrl(faculty?.name);
  const photoSrc = faculty?.image_url || faculty?.image || fallbackAvatar;

  return (
    <div
      className="faculty-card"
      onClick={() => onClick(faculty)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          onClick(faculty);
        }
      }}
    >
      <div className="faculty-card-image-wrapper">
        <img
          src={photoSrc}
          alt={faculty.name}
          className="faculty-card-image"
          loading="lazy"
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = fallbackAvatar;
          }}
        />
      </div>
      <h3 className="faculty-card-name">{faculty.name}</h3>
    </div>
  );
}
