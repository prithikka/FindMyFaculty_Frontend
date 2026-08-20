import React from 'react';
import { SearchX } from 'lucide-react';

export default function EmptyState({ onReset }) {
  return (
    <div className="empty-state">
      <div className="empty-icon">
        <SearchX size={24} />
      </div>
      <h3 className="empty-title">No faculty found</h3>
      <p className="empty-subtitle">No faculty members match your search criteria.</p>
      {onReset && (
        <button type="button" className="reset-search-btn" onClick={onReset}>
          Clear Search
        </button>
      )}
    </div>
  );
}
