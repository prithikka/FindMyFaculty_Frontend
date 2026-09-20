import React, { useMemo, useState } from 'react';
import { Edit3, Plus, Search, Trash2, UserRoundPlus } from 'lucide-react';

const emptyFacultyForm = {
  id: '',
  name: '',
  cabin: '',
  cabin_directions: '',
  image_url: ''
};

export default function AdminFacultyManagement({ facultyList, onAddFaculty, onUpdateFaculty, onDeleteFaculty }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [draft, setDraft] = useState(emptyFacultyForm);
  const [editingId, setEditingId] = useState(null);

  const filteredFaculty = useMemo(() => {
    if (!searchQuery.trim()) return facultyList;
    const q = searchQuery.toLowerCase();
    return facultyList.filter((faculty) =>
      faculty.name.toLowerCase().includes(q) ||
      faculty.cabin.toLowerCase().includes(q) ||
      faculty.id.toLowerCase().includes(q)
    );
  }, [facultyList, searchQuery]);

  const handleSubmit = (event) => {
    event.preventDefault();

    const payload = {
      ...draft,
      name: draft.name.trim(),
      cabin: draft.cabin.trim(),
      cabin_directions: draft.cabin_directions.trim(),
      image_url: draft.image_url.trim()
    };

    if (!payload.name || !payload.cabin) return;

    if (editingId) {
      onUpdateFaculty(editingId, payload);
      setEditingId(null);
    } else {
      onAddFaculty(payload);
    }

    setDraft(emptyFacultyForm);
  };

  const startEdit = (faculty) => {
    setEditingId(faculty.id);
    setDraft({
      id: faculty.id,
      name: faculty.name,
      cabin: faculty.cabin,
      cabin_directions: faculty.cabin_directions || '',
      image_url: faculty.image_url || ''
    });
  };

  const resetForm = () => {
    setEditingId(null);
    setDraft(emptyFacultyForm);
  };

  return (
    <div className="admin-management-layout">
      <section className="admin-panel-card admin-panel-card-large">
        <div className="admin-panel-header">
          <h2>Faculty Directory</h2>
          <div className="admin-search-box">
            <Search size={16} />
            <input
              type="text"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder="Search faculty"
            />
          </div>
        </div>

        <div className="admin-table-wrapper">
          <table className="admin-data-table">
            <thead>
              <tr>
                <th>Faculty</th>
                <th>ID</th>
                <th>Cabin</th>
                <th>Directions</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredFaculty.map((faculty) => (
                <tr key={faculty.id}>
                  <td>
                    <div className="admin-table-identity">
                      <div className="admin-table-avatar">
                        {faculty.name.charAt(0).toUpperCase()}
                      </div>
                      <span>{faculty.name}</span>
                    </div>
                  </td>
                  <td>{faculty.id}</td>
                  <td>{faculty.cabin}</td>
                  <td>{faculty.cabin_directions || '—'}</td>
                  <td>
                    <div className="admin-action-group">
                      <button type="button" className="table-icon-button" onClick={() => startEdit(faculty)}>
                        <Edit3 size={14} />
                      </button>
                      <button type="button" className="table-icon-button danger" onClick={() => onDeleteFaculty(faculty.id)}>
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <aside className="admin-panel-card form-card">
        <div className="admin-panel-header">
          <h2>{editingId ? 'Edit Faculty' : 'Add Faculty'}</h2>
        </div>

        <form onSubmit={handleSubmit} className="admin-form">
          <div className="form-group">
            <label className="form-label" htmlFor="faculty-name">Faculty Name</label>
            <input
              id="faculty-name"
              className="form-input"
              value={draft.name}
              onChange={(event) => setDraft({ ...draft, name: event.target.value })}
              placeholder="e.g. Dr. Sarah Jenkins"
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="faculty-id">Faculty ID</label>
            <input
              id="faculty-id"
              className="form-input"
              value={draft.id}
              onChange={(event) => setDraft({ ...draft, id: event.target.value })}
              placeholder="F01"
              disabled={Boolean(editingId)}
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="faculty-cabin">Cabin</label>
            <input
              id="faculty-cabin"
              className="form-input"
              value={draft.cabin}
              onChange={(event) => setDraft({ ...draft, cabin: event.target.value })}
              placeholder="Cabin 401"
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="faculty-directions">Directions</label>
            <textarea
              id="faculty-directions"
              className="form-input form-textarea"
              value={draft.cabin_directions}
              onChange={(event) => setDraft({ ...draft, cabin_directions: event.target.value })}
              placeholder="Describe the route to this faculty cabin"
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="faculty-image">Image URL</label>
            <input
              id="faculty-image"
              className="form-input"
              value={draft.image_url}
              onChange={(event) => setDraft({ ...draft, image_url: event.target.value })}
              placeholder="https://example.com/faculty.jpg"
            />
          </div>

          <div className="admin-form-actions">
            <button type="submit" className="admin-primary-btn">
              <Plus size={16} />
              <span>{editingId ? 'Save changes' : 'Add faculty'}</span>
            </button>

            {editingId && (
              <button type="button" className="admin-secondary-btn" onClick={resetForm}>
                Cancel
              </button>
            )}
          </div>
        </form>
      </aside>
    </div>
  );
}
