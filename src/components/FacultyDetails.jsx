import React, { useState, useEffect } from 'react';
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
import {
  getFacultyAvatarUrl,
  getFacultyDetails,
  getFacultyLocation,
  getFacultyDayTimetable
} from '../api/facultyAPI';

const WEEKDAYS = [
  { key: 'TODAY', label: 'Today' },
  { key: 'MON', label: 'Mon' },
  { key: 'TUE', label: 'Tue' },
  { key: 'WED', label: 'Wed' },
  { key: 'THU', label: 'Thu' },
  { key: 'FRI', label: 'Fri' }
];

export default function FacultyDetails({ faculty, onBack }) {
  const [timetableOpen, setTimetableOpen] = useState(true);
  const [selectedDay, setSelectedDay] = useState('TODAY');
  const [liveLocation, setLiveLocation] = useState(faculty?.currentLocation || faculty?.cabin || 'CSE Academic Block');
  const [liveStatus, setLiveStatus] = useState(faculty?.locationStatus || 'In Cabin (Available)');
  const [dayTimetable, setDayTimetable] = useState([]);
  const [activeDayName, setActiveDayName] = useState('Today');
  const [isLoadingSchedule, setIsLoadingSchedule] = useState(false);

  const fallbackAvatar = getFacultyAvatarUrl(faculty?.name);
  const photoSrc = faculty?.image_url || faculty?.image || fallbackAvatar;

  // Fetch live location and status
  useEffect(() => {
    let isMounted = true;

    async function fetchLiveFacultyInfo() {
      if (!faculty?.id) return;

      try {
        const [detailsRes, locationRes] = await Promise.allSettled([
          getFacultyDetails(faculty.id),
          getFacultyLocation(faculty.id)
        ]);

        if (!isMounted) return;

        if (detailsRes.status === 'fulfilled' && detailsRes.value) {
          const det = detailsRes.value;
          if (det.location) {
            setLiveLocation(det.location.startsWith('CSE') || det.location.toLowerCase().includes('classroom') || det.location.toLowerCase().includes('hall') || det.location.toLowerCase().includes('lab') ? det.location : `CSE Academic Block • ${det.location}`);
          }
          if (det.status) {
            setLiveStatus(det.status);
          }
        }

        if (locationRes.status === 'fulfilled' && locationRes.value && locationRes.value.location) {
          const loc = locationRes.value.location;
          setLiveLocation(loc.startsWith('CSE') || loc.toLowerCase().includes('classroom') || loc.toLowerCase().includes('hall') || loc.toLowerCase().includes('lab') ? loc : `CSE Academic Block • ${loc}`);
        }
      } catch (err) {
        console.warn('Could not fetch real-time faculty info:', err);
      }
    }

    fetchLiveFacultyInfo();
    return () => { isMounted = false; };
  }, [faculty?.id]);

  // Fetch ONLY that day's timetable
  useEffect(() => {
    let isMounted = true;

    async function fetchDaySchedule() {
      if (!faculty?.id) return;
      setIsLoadingSchedule(true);

      try {
        const queryDay = selectedDay === 'TODAY' ? null : selectedDay;
        const res = await getFacultyDayTimetable(faculty.id, queryDay);

        if (!isMounted) return;

        if (res && Array.isArray(res.timetable)) {
          const formatted = res.timetable.map((item) => {
            const hasRoom = item.room && item.room.trim() !== '' && item.room.trim() !== '-';
            const roomClean = hasRoom ? item.room.trim() : '';
            const venue = hasRoom
              ? (roomClean.toLowerCase().includes('room') || roomClean.toLowerCase().includes('hall') || roomClean.toLowerCase().includes('lab') || roomClean.toLowerCase().includes('classroom')
                  ? roomClean
                  : `Classroom ${roomClean}`)
              : 'Classroom (Lecture)';

            return {
              time: `${item.start_time} - ${item.end_time}`,
              activity: `Period ${item.period_no}`,
              venue: venue,
              status: item.status || 'Scheduled'
            };
          });
          setDayTimetable(formatted);
          setActiveDayName(res.day || selectedDay);
        } else {
          setDayTimetable([]);
        }
      } catch (err) {
        console.warn('Could not fetch day schedule:', err);
        if (isMounted) setDayTimetable([]);
      } finally {
        if (isMounted) setIsLoadingSchedule(false);
      }
    }

    fetchDaySchedule();
    return () => { isMounted = false; };
  }, [faculty?.id, faculty?.cabin, selectedDay]);

  if (!faculty) return null;

  const directionsText = Array.isArray(faculty.directions) && faculty.directions.length > 0
    ? faculty.directions.join(' ➔ ')
    : typeof faculty.cabin_directions === 'string' && faculty.cabin_directions.trim()
      ? faculty.cabin_directions
      : 'Main Lobby ➔ Central Elevator / Stairs ➔ CSE Department Floor ➔ Cabin';

  const dayHeading = selectedDay === 'TODAY'
    ? `Today's Timetable (${activeDayName})`
    : `${activeDayName} Timetable`;

  return (
    <div className="details-container">
      {/* Top Back Navigation Button */}
      <button className="back-button" onClick={onBack} type="button">
        <ArrowLeft size={18} />
        <span>Back to Faculty List</span>
      </button>

      {/* Hero Header Card */}
      <div className="details-hero-card">
        <img
          src={photoSrc}
          alt={faculty.name}
          className="details-avatar"
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = fallbackAvatar;
          }}
        />
        <div className="details-header-info">
          <h2 className="details-name">{faculty.name}</h2>
          <div className="details-header-meta">
            <div className="details-department-chip">
              <Building2 size={14} />
              <span>{faculty.department || 'Computer Science & Engineering'}</span>
            </div>
            <div className="details-status-chip">
              <span className="pulse-status-dot" />
              <span>{liveStatus}</span>
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
              <h3 className="location-callout-title">{liveLocation}</h3>
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
            {directionsText}
          </p>
        </div>
      </div>

      {/* Section 2: That Day's Timetable */}
      <div className="details-section-card today-timetable-card">
        <div className="timetable-header-container" style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
            <button
              type="button"
              className="timetable-accordion-trigger"
              style={{ width: 'auto', padding: 0 }}
              onClick={() => setTimetableOpen((prev) => !prev)}
            >
              <div className="timetable-header-left">
                <Calendar size={20} className="section-icon" />
                <h3 className="section-title">{dayHeading}</h3>
              </div>
              <ChevronDown
                size={18}
                className={`timetable-chevron ${timetableOpen ? 'chevron-open' : ''}`}
                style={{ marginLeft: '0.5rem' }}
              />
            </button>

            {/* Quick Day Selector Pills */}
            <div className="day-pills-row" style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap' }}>
              {WEEKDAYS.map((d) => (
                <button
                  key={d.key}
                  type="button"
                  onClick={() => setSelectedDay(d.key)}
                  style={{
                    padding: '0.25rem 0.65rem',
                    fontSize: '0.75rem',
                    fontWeight: selectedDay === d.key ? 700 : 500,
                    borderRadius: '8px',
                    border: selectedDay === d.key ? '1px solid var(--accent-primary, #38bdf8)' : '1px solid rgba(255, 255, 255, 0.1)',
                    background: selectedDay === d.key ? 'rgba(56, 189, 248, 0.15)' : 'rgba(255, 255, 255, 0.04)',
                    color: selectedDay === d.key ? 'var(--accent-primary, #38bdf8)' : 'var(--text-muted)',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease'
                  }}
                >
                  {d.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {timetableOpen && (
          <div className="timetable-slots-list" style={{ marginTop: '1rem' }}>
            {isLoadingSchedule ? (
              <div style={{ textAlign: 'center', padding: '1.5rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                Loading schedule for {activeDayName}...
              </div>
            ) : dayTimetable.length > 0 ? (
              dayTimetable.map((slot, idx) => {
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
                            <AlertCircle size={12} /> {slot.status === 'Scheduled' ? 'Scheduled' : 'Upcoming'}
                          </>
                        )}
                      </span>
                    </div>
                  </div>
                );
              })
            ) : (
              <div style={{
                textAlign: 'center',
                padding: '2rem 1rem',
                background: 'rgba(255, 255, 255, 0.02)',
                borderRadius: '12px',
                border: '1px dashed rgba(255, 255, 255, 0.1)'
              }}>
                <Calendar size={28} style={{ opacity: 0.4, margin: '0 auto 0.5rem', display: 'block' }} />
                <p style={{ margin: '0 0 0.25rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                  No lectures scheduled for {selectedDay === 'TODAY' ? `Today (${activeDayName})` : activeDayName}
                </p>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                  Faculty is available in their cabin ({faculty.cabin && faculty.cabin !== '-' ? faculty.cabin : 'CSE Department'}).
                </span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
