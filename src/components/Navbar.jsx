import React from 'react';
import { LogOut } from 'lucide-react';
import Logo from './Logo';

export default function Navbar({ onGoHome, onLogout, currentUser }) {
  return (
    <header className="navbar">
      <div className="navbar-inner">
        <div className="navbar-brand" onClick={onGoHome} role="button" tabIndex={0}>
          <Logo size="md" />
        </div>

        <div className="navbar-actions">
          {currentUser && (
            <span className="user-welcome-tag">
              {currentUser.name || currentUser.rollNumber || currentUser.adminId}
            </span>
          )}
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
      </div>
    </header>
  );
}
