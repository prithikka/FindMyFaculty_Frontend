import React from 'react';

export default function FacultyCard({ faculty, onClick }) {
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
          src={faculty.image}
          alt={faculty.name}
          className="faculty-card-image"
          loading="lazy"
        />
      </div>
      <h3 className="faculty-card-name">{faculty.name}</h3>
    </div>
  );
}
