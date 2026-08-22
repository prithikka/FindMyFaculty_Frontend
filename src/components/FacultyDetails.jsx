import React, { useState } from 'react';
import {
  ArrowLeft,
  Building2,
  MapPin,
  Navigation,
  Calendar,
  Clock,
  CheckCircle2,
  AlertCircle,
  ChevronDown
} from 'lucide-react';

export default function FacultyDetails({ faculty, onBack }) {
  if (!faculty) return null;

  const [timetableOpen, setTimetableOpen] = useState(false);

  const directionsList = faculty.directions || [
    "Enter CSE Academic Block via Main Entrance Lobby.",
    "Take Central Elevator to the teacher's floor level.",
    "Follow corridor signs towards the department wing.",
    "Locate cabin number along the main hallway."
  ];

  const todaySlots = faculty.todayTimetable || [
    { time: "09:00 AM - 10:30 AM", activity: "Lecture Session", venue: "Lecture Hall B", status: "Completed" },
    { time: "11:00 AM - 01:00 PM", activity: "Department Meeting", venue: "Conference Room", status: "Completed" },
    { time: "02:00 PM - 04:00 PM", activity: "Office Hours & Student Advisory", venue: faculty.currentLocation || "Faculty Cabin", status: "Ongoing" }
  ];

  return (
    <div className="details-container">
      {/* Top Back Navigation Button */}
      <button className="back-button" onClick={onBack} type="button">
        <ArrowLeft size={18} />
        <span>Back to Teachers List</span>
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
          <div className="details-header-meta">
            <div className="details-department-chip">
              <Building2 size={14} />
              <span>{faculty.department}</span>
            </div>
            <div className="details-status-chip">
              <span className="pulse-status-dot" />
              <span>{faculty.locationStatus || "In Cabin (Available)"}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Section 1: Current Location & Walking Directions */}
      <div className="details-section-card location-directions-section">
        <div className="location-callout-box">
          <div className="location-callout-header">
            <MapPin size={22} className="location-icon-primary" />
            <div>
              <span className="location-callout-label">CURRENT LOCATION</span>
              <h3 className="location-callout-title">{faculty.currentLocation || faculty.office}</h3>
            </div>
          </div>
        </div>

        {/* Single Line Walking Directions */}
        <div className="single-line-directions">
          <div className="directions-single-header">
            <Navigation size={18} className="directions-single-icon" />
            <span className="directions-label">Walking Directions:</span>
          </div>
          <p className="directions-single-text">
            {Array.isArray(faculty.directions)
              ? faculty.directions.join(' ➔ ')
              : 'Main Lobby ➔ Elevator ➔ Corridor ➔ Cabin'}
          </p>
        </div>
      </div>

      {/* Section 2: Today's Timetable Accordion */}
      <div className="details-section-card today-timetable-card">
        <button
          type="button"
          className="timetable-accordion-trigger"
          onClick={() => setTimetableOpen((prev) => !prev)}
        >
          <div className="timetable-header-left">
            <Calendar size={20} className="section-icon" />
            <h3 className="section-title">Today's Timetable</h3>
          </div>
          <ChevronDown
            size={18}
            className={`timetable-chevron ${timetableOpen ? 'chevron-open' : ''}`}
          />
        </button>

        {timetableOpen && (
          <div className="timetable-slots-list">
            {todaySlots.map((slot, idx) => {
              const isOngoing = slot.status === 'Ongoing';
              const isCompleted = slot.status === 'Completed';

              return (
                <div
                  key={idx}
                  className={`timetable-slot-card ${isOngoing ? 'ongoing-slot' : ''}`}
                >
                  <div className="slot-time-col">
                    <Clock size={16} className="slot-time-icon" />
                    <span className="slot-time-text">{slot.time}</span>
                  </div>

                  <div className="slot-details-col">
                    <h4 className="slot-activity-title">{slot.activity}</h4>
                    <span className="slot-venue-text">📍 {slot.venue}</span>
                  </div>

                  <div className="slot-status-col">
                    <span className={`slot-status-pill ${isOngoing ? 'pill-ongoing' : isCompleted ? 'pill-completed' : 'pill-upcoming'}`}>
                      {isOngoing ? (
                        <>
                          <span className="pulse-pill-dot" /> Ongoing
                        </>
                      ) : isCompleted ? (
                        <>
                          <CheckCircle2 size={12} /> Completed
                        </>
                      ) : (
                        <>
                          <AlertCircle size={12} /> Upcoming
                        </>
                      )}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
