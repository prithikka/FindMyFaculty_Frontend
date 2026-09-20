import React, { useMemo, useState } from 'react';
import { Edit3, Plus, Search, Trash2, UserRoundPlus } from 'lucide-react';

const emptyFacultyForm = {
  name: '',
  cabin: '',
  cabin_directions: ''
};

export default function AdminFacultyManagement({ facultyList, onAddFaculty, onUpdateFaculty, onDeleteFaculty }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [draft, setDraft] = useState(emptyFacultyForm);
  const [editingId, setEditingId] = useState(null);
  const [editingFacultyName, setEditingFacultyName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState('');
  const [formSuccess, setFormSuccess] = useState('');

  const filteredFaculty = useMemo(() => {
    if (!searchQuery.trim()) return facultyList;
    const q = searchQuery.toLowerCase();
    return facultyList.filter((faculty) =>
      faculty.name.toLowerCase().includes(q) ||
      faculty.cabin.toLowerCase().includes(q) ||
      faculty.id.toLowerCase().includes(q)
    );
  }, [facultyList, searchQuery]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setFormError('');
    setFormSuccess('');

    const payload = {
      ...draft,
      name: draft.name.trim(),
      cabin: draft.cabin.trim(),
      cabin_directions: draft.cabin_directions.trim()
    };

    if (!payload.name || !payload.cabin) {
      setFormError('Faculty name and cabin are required.');
      return;
    }

    try {
      setIsSubmitting(true);

      if (editingFacultyName) {
        await onUpdateFaculty(editingFacultyName, payload);
        setFormSuccess('Faculty updated successfully.');
        setEditingId(null);
        setEditingFacultyName('');
      } else {
        await onAddFaculty(payload);
        setFormSuccess('Faculty created successfully.');
      }

      setDraft(emptyFacultyForm);
    } catch (err) {
      setFormError(err.message || 'Unable to save faculty.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const startEdit = (faculty) => {
    setEditingId(faculty.id);
    setEditingFacultyName(faculty.name);
    setDraft({
      name: faculty.name,
      cabin: faculty.cabin,
      cabin_directions: faculty.cabin_directions || ''
    });
  };

  const resetForm = () => {
    setEditingId(null);
    setEditingFacultyName('');
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
                      <button type="button" className="table-icon-button danger" onClick={() => onDeleteFaculty(faculty.name)}>
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
          {formError && (
            <div className="login-error-alert" role="alert">
              <span>{formError}</span>
            </div>
          )}

          {formSuccess && (
            <div className="login-success-alert" role="status">
              <span>{formSuccess}</span>
            </div>
          )}

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

          <div className="admin-form-actions">
            <button type="submit" className="admin-primary-btn" disabled={isSubmitting}>
              <Plus size={16} />
              <span>{isSubmitting ? (editingFacultyName ? 'Saving...' : 'Adding...') : editingFacultyName ? 'Save changes' : 'Add faculty'}</span>
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
