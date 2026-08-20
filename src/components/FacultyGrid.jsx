import React from 'react';
import FacultyCard from './FacultyCard';

export default function FacultyGrid({ facultyList, onSelectFaculty }) {
  return (
    <div className="faculty-grid">
      {facultyList.map((faculty) => (
        <FacultyCard
          key={faculty.id}
          faculty={faculty}
          onClick={onSelectFaculty}
        />
      ))}
    </div>
  );
}
