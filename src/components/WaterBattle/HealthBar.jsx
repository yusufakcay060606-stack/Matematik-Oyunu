import React from 'react';

/**
 * HealthBar Bileşeni
 * Karakterin tam üstünde yer alan, sayısız, sadece görsel bar.
 * Can azaldıkça kırmızıya döner.
 */
export default function HealthBar({ currentHealth, maxHealth = 10, team }) {
  const percentage = Math.max(0, Math.min(100, (currentHealth / maxHealth) * 100));

  // Can azaldıkça yeşilden sarıya, sarıdan kırmızıya dönüş
  const getBarColor = () => {
    if (percentage > 60) return '#22c55e'; // Yeşil
    if (percentage > 30) return '#f59e0b'; // Sarı / Turuncu
    return '#ef4444'; // Kırmızı (azalınca kırmızı)
  };

  return (
    <div className={`character-health-bar-wrapper team-${team}`}>
      <div className="char-health-track">
        {/* Dolum Barı */}
        <div
          className="char-health-fill"
          style={{
            width: `${percentage}%`,
            backgroundColor: getBarColor(),
          }}
        />
      </div>
    </div>
  );
}
