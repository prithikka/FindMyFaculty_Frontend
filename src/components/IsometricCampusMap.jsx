import React from 'react';

export default function IsometricCampusMap() {
  return (
    <div className="isometric-map-wrapper">
      <div className="iso-card-container">
        <svg
          viewBox="0 0 500 380"
          className="iso-svg-canvas"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* White/Cyan Glow Filter matching dark theme */}
            <filter id="whiteGlow" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>

            {/* Dotted path dash animation */}
            <style>{`
              .moving-dotted-path {
                stroke-dasharray: 6 8;
                animation: flowDots 1.5s linear infinite;
              }
              @keyframes flowDots {
                from { stroke-dashoffset: 28; }
                to { stroke-dashoffset: 0; }
              }
            `}</style>
          </defs>

          {/* Background Tilted Isometric Grid Plane */}
          <g transform="translate(0, 10)">
            {/* Main Diamond Plane Outline */}
            <polygon
              points="250,45 440,155 250,265 60,155"
              fill="rgba(20, 20, 20, 0.6)"
              stroke="#ffffff"
              strokeWidth="1.25"
              strokeOpacity="0.3"
            />

            {/* Faint Grid Lines */}
            <line x1="250" y1="45" x2="250" y2="265" stroke="#ffffff" strokeWidth="0.75" strokeOpacity="0.2" strokeDasharray="3 3" />
            <line x1="60" y1="155" x2="440" y2="155" stroke="#ffffff" strokeWidth="0.75" strokeOpacity="0.2" strokeDasharray="3 3" />
            <line x1="155" y1="100" x2="345" y2="210" stroke="#ffffff" strokeWidth="0.5" strokeOpacity="0.15" />
            <line x1="345" y1="100" x2="155" y2="210" stroke="#ffffff" strokeWidth="0.5" strokeOpacity="0.15" />

            {/* Top Grid Node Beacon Dot */}
            <circle cx="250" cy="45" r="3.5" fill="#ffffff" filter="url(#whiteGlow)" />

            {/* 2 Direction Arrows on Bottom Grid Line */}
            <g transform="translate(170, 222) rotate(-30)">
              <path d="M0,8 L4,0 L8,8 L4,6 Z" fill="#ffffff" fillOpacity="0.8" />
              <line x1="4" y1="6" x2="4" y2="12" stroke="#ffffff" strokeWidth="1" strokeOpacity="0.8" />
            </g>
            <g transform="translate(240, 252) rotate(-30)">
              <path d="M0,8 L4,0 L8,8 L4,6 Z" fill="#ffffff" fillOpacity="0.8" />
              <line x1="4" y1="6" x2="4" y2="12" stroke="#ffffff" strokeWidth="1" strokeOpacity="0.8" />
            </g>
          </g>

          {/* Building 1 (Left Building) */}
          <g>
            {/* Top Face */}
            <polygon points="105,150 155,125 205,150 155,175" fill="#1e1e1e" stroke="#ffffff" strokeWidth="1.5" />
            {/* Left Face */}
            <polygon points="105,150 155,175 155,225 105,200" fill="#141414" stroke="#ffffff" strokeWidth="1.5" />
            {/* Right Face */}
            <polygon points="155,175 205,150 205,200 155,225" fill="#1a1a1a" stroke="#ffffff" strokeWidth="1.5" />

            {/* Horizontal Window Details on Front Left Face */}
            <line x1="118" y1="172" x2="135" y2="180" stroke="#ffffff" strokeWidth="1" strokeOpacity="0.6" />
            <line x1="118" y1="182" x2="135" y2="190" stroke="#ffffff" strokeWidth="1" strokeOpacity="0.6" />

            {/* Roof Glowing Sphere Beacon */}
            <circle cx="155" cy="150" r="7" fill="#ffffff" filter="url(#whiteGlow)" />
            <circle cx="155" cy="150" r="3.5" fill="#000000" />
          </g>

          {/* Building 2 (Center Tall Tower) */}
          <g>
            {/* Top Face */}
            <polygon points="225,90 250,75 275,90 250,105" fill="#262626" stroke="#ffffff" strokeWidth="1.5" />
            {/* Left Face */}
            <polygon points="225,90 250,105 250,210 225,195" fill="#141414" stroke="#ffffff" strokeWidth="1.5" />
            {/* Right Face */}
            <polygon points="250,105 275,90 275,195 250,210" fill="#1a1a1a" stroke="#ffffff" strokeWidth="1.5" />

            {/* Circular Detail Window on Left Face */}
            <circle cx="237" cy="112" r="3" fill="none" stroke="#ffffff" strokeWidth="1" strokeOpacity="0.7" />
          </g>

          {/* Building 3 (Right Building) */}
          <g>
            {/* Top Face */}
            <polygon points="290,155 345,125 400,155 345,185" fill="#1e1e1e" stroke="#ffffff" strokeWidth="1.5" />
            {/* Left Face */}
            <polygon points="290,155 345,185 345,235 290,205" fill="#141414" stroke="#ffffff" strokeWidth="1.5" />
            {/* Right Face */}
            <polygon points="345,185 400,155 400,205 345,235" fill="#1a1a1a" stroke="#ffffff" strokeWidth="1.5" />

            {/* Flat Rectangular Panel on Roof Right */}
            <polygon points="350,150 375,136 388,143 363,157" fill="#262626" stroke="#ffffff" strokeWidth="1" strokeOpacity="0.5" />

            {/* Glowing Location Pin + User Silhouette floating on Right Roof */}
            <g transform="translate(345, 102)" filter="url(#whiteGlow)">
              <path
                d="M 0 -18 C -9.5 -18 -16 -11.5 -16 -2 C -16 8 0 20 0 20 C 0 20 16 8 16 -2 C 16 -11.5 9.5 -18 0 -18 Z"
                fill="rgba(20, 20, 20, 0.8)"
                stroke="#ffffff"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              {/* User Silhouette Head */}
              <circle cx="0" cy="-6" r="3.2" fill="#ffffff" />
              {/* User Silhouette Shoulders */}
              <path
                d="M -5.5 3 C -5.5 0 -3 -1 0 -1 C 3 -1 5.5 0 5.5 3"
                fill="none"
                stroke="#ffffff"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </g>
          </g>

          {/* Moving Dotted Arc Navigation Path */}
          <path
            d="M 155 188 Q 250 242 345 190"
            fill="none"
            stroke="#ffffff"
            strokeWidth="3.5"
            className="moving-dotted-path"
            filter="url(#whiteGlow)"
          />
        </svg>
      </div>
    </div>
  );
}
