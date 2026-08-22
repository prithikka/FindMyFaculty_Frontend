import React, { useState } from 'react';
import { Search, X } from 'lucide-react';

export default function SearchBar({ searchQuery, setSearchQuery, resultCount }) {
  const [isFocused, setIsFocused] = useState(false);

  const handleClear = () => {
    setSearchQuery('');
  };

  return (
    <div className="search-section">
      <div className="search-bar-wrapper">
        <div className={`search-input-container ${isFocused ? 'focused' : ''}`}>
          <div className="search-icon">
            <Search size={18} />
          </div>
          <input
            type="text"
            className="search-input"
            placeholder="Search teachers..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            aria-label="Search teacher members"
          />
          {searchQuery && (
            <button
              type="button"
              className="clear-button"
              onClick={handleClear}
              title="Clear search"
              aria-label="Clear search query"
            >
              <X size={14} />
            </button>
          )}
        </div>
      </div>

      {searchQuery.trim() !== '' && (
        <div className="search-status-bar">
          Showing results for <span className="search-query-highlight">"{searchQuery}"</span> ({resultCount} found)
        </div>
      )}
    </div>
  );
}
