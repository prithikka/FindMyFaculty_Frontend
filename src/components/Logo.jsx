import React from 'react';

export default function Logo({ size = 'md', className = '' }) {
  const pixelSize = size === 'lg' ? 28 : size === 'sm' ? 18 : 22;

  return (
    <div className={`brand-logo-component logo-size-${size} ${className}`}>
      <div className="logo-mark-wrapper">
        <svg
          width={pixelSize}
          height={pixelSize}
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="logo-mark-svg"
        >
          {/* Location Pin Outer Frame */}
          <path
            d="M12 2C7.58 2 4 5.58 4 10C4 15.25 12 22 12 22C12 22 20 15.25 20 10C20 5.58 16.42 2 12 2Z"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* User Silhouette Head */}
          <circle cx="12" cy="8.5" r="2.2" fill="currentColor" />
          {/* User Silhouette Shoulders */}
          <path
            d="M8.5 14C8.5 12.3 10 11.2 12 11.2C14 11.2 15.5 12.3 15.5 14"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        </svg>
      </div>
      <div className="logo-text-wrapper">
        <h1 className="logo-brand-title">
          FindMy<span className="logo-accent">Faculty</span>
        </h1>
      </div>
    </div>
  );
}
