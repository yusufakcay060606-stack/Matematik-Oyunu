import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { playVictory, stopVictory, playPop } from '../utils/soundEffects';

/**
 * GameResult Bileşeni
 * Can 0 olduğunda beliren eğlenceli ve coşkulu zafer ekranı
 */
export default function GameResult({ winnerTeam, onPlayAgain, onGoHome }) {
  useEffect(() => {
    // Zafer müziği çal
    playVictory();

    // Renkli konfeti patlaması
    const end = Date.now() + 2.5 * 1000;
    const isDraw = winnerTeam === 'draw' || winnerTeam === 0;
    const colors = isDraw
      ? ['#0284c7', '#e11d48', '#fbbf24', '#38bdf8', '#fb7185', '#8b5cf6']
      : winnerTeam === 1
        ? ['#0284c7', '#38bdf8', '#fbbf24', '#ffffff']
        : ['#e11d48', '#fb7185', '#f59e0b', '#ffffff'];

    (function frame() {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: colors,
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: colors,
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();

    return () => {
      stopVictory();
    };
  }, [winnerTeam]);

  const isDraw = winnerTeam === 'draw' || winnerTeam === 0;
  const isTeam1 = winnerTeam === 1;

  return (
    <div className="game-result-modal-overlay">
      <div className={`game-result-card winner-team-${isDraw ? 'draw' : winnerTeam}`}>
        {/* Taç / Kupa / Beraberlik animasyonu */}
        <div className="trophy-badge-container">
          <span className="trophy-emoji">{isDraw ? '🤝' : '🏆'}</span>
          <span className="sparkle-emoji s1">✨</span>
          <span className="sparkle-emoji s2">🎉</span>
        </div>

        <h1 className="result-headline">
          {isDraw ? 'BERABERE!' : isTeam1 ? 'TAKIM 1 KAZANDI!' : 'TAKIM 2 KAZANDI!'}
        </h1>

        {/* Butonlar */}
        <div className="result-actions-row">
          <button
            type="button"
            className="result-btn play-again-btn"
            onClick={() => {
              playPop();
              onPlayAgain();
            }}
          >
            <span className="btn-icon">🔄</span>
            <span className="btn-text">TEKRAR OYNA</span>
          </button>

          <button
            type="button"
            className="result-btn home-nav-btn"
            onClick={() => {
              playPop();
              onGoHome();
            }}
          >
            <span className="btn-icon">🏠</span>
            <span className="btn-text">ANA SAYFAYA DÖN</span>
          </button>
        </div>
      </div>
    </div>
  );
}
