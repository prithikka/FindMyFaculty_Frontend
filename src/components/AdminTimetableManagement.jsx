import React, { useMemo, useState } from 'react';
import { CalendarDays, Plus, Search, Upload } from 'lucide-react';

const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const defaultPeriods = [1, 2, 3, 4, 5, 6, 7, 8];

export default function AdminTimetableManagement({ facultyList, timetableEntries, onUploadTimetable, onAssignSlot }) {
  const [query, setQuery] = useState('');
  const [selectedFacultyId, setSelectedFacultyId] = useState(facultyList[0]?.id || '');

  const visibleFaculty = useMemo(() => {
    if (!query.trim()) return facultyList;
    const q = query.toLowerCase();
    return facultyList.filter((faculty) => faculty.name.toLowerCase().includes(q));
  }, [facultyList, query]);

  const selectedFaculty = facultyList.find((faculty) => faculty.id === selectedFacultyId) || facultyList[0];

  const entriesByFaculty = useMemo(() => {
    const grouped = {};
    timetableEntries.forEach((slot) => {
      if (!grouped[slot.facultyId]) grouped[slot.facultyId] = [];
      grouped[slot.facultyId].push(slot);
    });
    return grouped;
  }, [timetableEntries]);

  const rows = defaultPeriods.map((periodNo) => {
    const cells = days.map((day) => {
      const match = (entriesByFaculty[selectedFaculty?.id] || []).find(
        (entry) => entry.day === day && Number(entry.periodNo) === periodNo
      );

      return {
        day,
        room: match?.room || '—',
        subject: match?.subject || 'Open slot'
      };
    });

    return { periodNo, cells };
  });

  const handleQuickAssign = () => {
    onAssignSlot({
      facultyId: selectedFaculty?.id,
      day: 'Mon',
      periodNo: 1,
      room: 'Room A-101',
      subject: 'Faculty Meeting'
    });
  };

  return (
    <div className="admin-management-layout timetable-layout">
      <section className="admin-panel-card admin-panel-card-large">
        <div className="admin-panel-header">
          <h2>Timetable Control</h2>
          <button type="button" className="admin-secondary-btn" onClick={onUploadTimetable}>
            <Upload size={16} />
            <span>Upload timetable</span>
          </button>
        </div>

        <div className="admin-timetable-toolbar">
          <div className="admin-search-box wide">
            <Search size={16} />
            <input
              type="text"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search faculty"
            />
          </div>

          <select
            className="admin-select"
            value={selectedFacultyId}
            onChange={(event) => setSelectedFacultyId(event.target.value)}
          >
            {visibleFaculty.map((faculty) => (
              <option key={faculty.id} value={faculty.id}>{faculty.name}</option>
            ))}
          </select>
        </div>

        <div className="admin-timetable-grid-wrap">
          <table className="admin-timetable-table">
            <thead>
              <tr>
                <th>Period</th>
                {days.map((day) => (
                  <th key={day}>{day}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.periodNo}>
                  <td className="timetable-period-label">P{row.periodNo}</td>
                  {row.cells.map((cell, index) => (
                    <td key={`${row.periodNo}-${cell.day}-${index}`}>
                      <div className="timetable-cell">
                        <strong>{cell.subject}</strong>
                        <span>{cell.room}</span>
                      </div>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <aside className="admin-panel-card form-card">
        <div className="admin-panel-header">
          <h2>Faculty Schedule</h2>
        </div>

        <div className="admin-side-panel">
          <div className="admin-mini-card">
            <CalendarDays size={18} />
            <div>
              <span className="mini-label">Selected faculty</span>
              <strong>{selectedFaculty?.name || 'No faculty selected'}</strong>
            </div>
          </div>

          <div className="admin-slot-list">
            {(entriesByFaculty[selectedFaculty?.id] || []).map((slot) => (
              <div key={`${slot.facultyId}-${slot.day}-${slot.periodNo}`} className="admin-slot-item">
                <span>{slot.day} • P{slot.periodNo}</span>
                <strong>{slot.subject}</strong>
                <small>{slot.room}</small>
              </div>
            ))}
          </div>

          <button type="button" className="admin-primary-btn" onClick={handleQuickAssign}>
            <Plus size={16} />
            <span>Assign quick slot</span>
          </button>
        </div>
      </aside>
    </div>
  );
}
