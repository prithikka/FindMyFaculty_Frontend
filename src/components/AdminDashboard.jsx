import React, { useEffect, useState } from 'react';
import { ArrowRight, Building2, CalendarClock, Users } from 'lucide-react';
import { getFacultyList } from '../api/authAPI';

const overviewCards = [
  {
    title: 'Faculty Management',
    description: 'Add, edit, search, and remove faculty records.',
    icon: Users,
    action: 'Manage faculty',
    target: 'faculty'
  },
  {
    title: 'Timetable Management',
    description: 'Update room assignments and schedule windows.',
    stat: '6 Days',
    icon: CalendarClock,
    action: 'Manage timetable',
    target: 'timetable'
  }
];

export default function AdminDashboard({ currentUser, onNavigate, activeView }) {
  const [facultyCount, setFacultyCount] = useState(null);
  const [facultyCountError, setFacultyCountError] = useState(false);

  useEffect(() => {
    let isMounted = true;

    async function loadFacultyCount() {
      try {
        const faculties = await getFacultyList();
        if (isMounted) {
          setFacultyCount(faculties.length);
          setFacultyCountError(false);
        }
      } catch (error) {
        if (isMounted) {
          setFacultyCount(null);
          setFacultyCountError(true);
        }
      }
    }

    loadFacultyCount();

    return () => {
      isMounted = false;
    };
  }, []);

  const facultyStatusText = facultyCountError || facultyCount === null ? '—' : `${facultyCount} Faculty`;

  return (
    <div className="admin-dashboard-shell">
      <div className="admin-page-header">
        <div>
          <p className="admin-section-kicker">ADMIN PORTAL</p>
          <h1 className="admin-page-title">Campus Administration</h1>
        </div>
        <div className="admin-header-highlight">
          <Building2 size={18} />
          <span>{currentUser?.name || 'Administrator'}</span>
        </div>
      </div>

      <div className="admin-overview-grid">
        {overviewCards.map(({ title, description, stat, icon: Icon, action, target }) => (
          <button
            type="button"
            key={title}
            className={`admin-overview-card ${activeView === target ? 'active' : ''}`}
            onClick={() => onNavigate(target)}
          >
            <div className="admin-card-top-row">
              <div className="admin-card-icon">
                <Icon size={20} />
              </div>
              <span className="admin-card-status">{title === 'Faculty Management' ? facultyStatusText : stat}</span>
            </div>

            <div className="admin-card-copy">
              <h3>{title}</h3>
              <p>{description}</p>
            </div>

            <div className="admin-card-action-row">
              <span>{action}</span>
              <ArrowRight size={16} />
            </div>
          </button>
        ))}
      </div>

      <div className="admin-panel-card admin-panel-card-wide">
        <div className="admin-panel-header">
          <h2>Administration Overview</h2>
        </div>
        <div className="admin-panel-body">
          <div className="admin-status-list">
            <div className="admin-status-row">
              <span className="admin-status-label">Current Session</span>
              <span className="admin-status-value">Active</span>
            </div>
            <div className="admin-status-row">
              <span className="admin-status-label">Faculty Records</span>
              <span className="admin-status-value">{facultyCountError || facultyCount === null ? '—' : facultyCount}</span>
            </div>
            <div className="admin-status-row">
              <span className="admin-status-label">Weekly Schedule Entries</span>
              <span className="admin-status-value">84</span>
            </div>
            <div className="admin-status-row">
              <span className="admin-status-label">Portal Status</span>
              <span className="admin-status-value neutral">Operational</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
