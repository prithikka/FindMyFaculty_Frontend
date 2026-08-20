import React from 'react';
import { BookOpen, LogOut } from 'lucide-react';

export default function Navbar({ onGoHome, onLogout }) {
  return (
    <header className="navbar">
      <div className="navbar-inner">
        <div className="navbar-brand" onClick={onGoHome} role="button" tabIndex={0}>
          <div className="brand-icon">
            <BookOpen size={20} />
          </div>
          <h1 className="brand-title">
            FindMy<span>Faculty</span>
          </h1>
        </div>

        <button
          type="button"
          className="logout-button"
          onClick={onLogout || (() => alert('Logged out successfully'))}
          aria-label="Log out"
        >
          <LogOut size={15} />
          <span>Log Out</span>
        </button>
      </div>
    </header>
  );
}
