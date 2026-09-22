import React from 'react';

/**
 * WaterStream Bileşeni
 * Ateş eden takımdan rakibin tam KAFASINA / GÖVDESİNE uçan BÜYÜK SU DAMLASI
 * Tam ekran ve her çözünürlükte tam isabet için dinamik koordinat desteği.
 */
export default function WaterStream({ shooter, coords }) {
  if (!shooter) return null;

  const isLeftToRight = shooter === 1;

  // Dinamik koordinatlar yoksa fallback olarak ekran oranları
  const customStyles = coords
    ? {
        '--start-x': `${coords.startX}px`,
        '--start-y': `${coords.startY}px`,
        '--target-x': `${coords.targetX}px`,
        '--target-y': `${coords.targetY}px`,
      }
    : {};

  return (
    <div
      className={`water-stream-overlay ${isLeftToRight ? 'stream-left-to-right' : 'stream-right-to-left'} ${coords ? 'has-coords' : ''}`}
      style={customStyles}
    >
      {/* Uçan BÜYÜK SU DAMLASI */}
      <div className="flying-water-orb-container">
        <div className="flying-water-orb">
          <svg viewBox="0 0 80 80" className="water-orb-svg">
            <defs>
              <radialGradient id={`waterOrbGrad-${shooter}`} cx="35%" cy="35%" r="65%">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
                <stop offset="30%" stopColor={isLeftToRight ? '#38bdf8' : '#fb7185'} stopOpacity="0.9" />
                <stop offset="85%" stopColor={isLeftToRight ? '#0284c7' : '#e11d48'} stopOpacity="1" />
                <stop offset="100%" stopColor={isLeftToRight ? '#0369a1' : '#be123c'} stopOpacity="1" />
              </radialGradient>
              <filter id={`orbGlow-${shooter}`} x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="0" dy="2" stdDeviation="4" floodColor={isLeftToRight ? '#0284c7' : '#e11d48'} floodOpacity="0.5" />
              </filter>
            </defs>

            <circle cx="40" cy="40" r="32" fill={`url(#waterOrbGrad-${shooter})`} filter={`url(#orbGlow-${shooter})`} />
            <ellipse cx="28" cy="26" rx="10" ry="6" fill="#ffffff" opacity="0.8" transform="rotate(-30 28 26)" />
            <circle cx="22" cy="42" r="3" fill="#ffffff" opacity="0.6" />
          </svg>

          <div className="orb-trail-bubbles">
            <span className="trail-drop t1">💧</span>
            <span className="trail-drop t2">💦</span>
            <span className="trail-drop t3">🫧</span>
          </div>
        </div>
      </div>

      {/* Rakibin Kafasına Çarptığında Patlayan Su Sıçraması */}
      <div className="water-impact-splash">
        <span className="impact-burst-emoji">💥💦</span>
        <div className="splash-wave-ring" />
      </div>
    </div>
  );
}
