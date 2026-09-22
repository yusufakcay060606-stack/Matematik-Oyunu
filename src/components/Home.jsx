import React from 'react';
import { playPop } from '../utils/soundEffects';

/**
 * Home Bileşeni
 * Matematik Oyunları Karşılama ve Mod Seçim Ekranı
 */
export default function Home({ onSelectMode, soundEnabled, onToggleSound }) {
  const toggleFullScreen = () => {
    playPop();
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch((err) => {
        console.warn('Fullscreen error:', err);
      });
    } else {
      document.exitFullscreen().catch((err) => {
        console.warn('Exit fullscreen error:', err);
      });
    }
  };

  return (
    <div className="home-container">
      {/* Üst Araç Çubuğu (Ses ve Tam Ekran) */}
      <header className="home-top-bar">
        <div className="top-brand">
          <span className="brand-badge">🏫 Akıllı Tahta Uyumlu</span>
        </div>

        <div className="top-actions">
          <button
            type="button"
            className="action-icon-btn"
            onClick={toggleFullScreen}
            title="Tam Ekran Aç / Kapat"
          >
            ⛶ Tam Ekran
          </button>
        </div>
      </header>

      {/* Ana Başlık */}
      <main className="home-main-content">
        <div className="hero-section">
          <h1 className="home-title">
            Matematik Oyunları
          </h1>
        </div>

        {/* Oyun Modları Listesi (Dikey / Alt Alta Sıralı) */}
        <section className="game-modes-vertical-list">
          {/* 1. Oyun Modu: 4 İşlem Su Tabancası Savaşı */}
          <button
            type="button"
            className="mode-card-btn active-mode-btn"
            onClick={() => {
              playPop();
              onSelectMode('water-battle');
            }}
          >
            <div className="mode-btn-content">
              <div className="mode-btn-icon-wrapper">
                <img src="/img/4operations.png" alt="4 İşlem" className="mode-btn-img" />
              </div>

              <div className="mode-btn-text-block">
                <span className="mode-title-text">4 İşlem Su Tabancası Savaşı</span>
              </div>

              <div className="mode-play-arrow">
                <span className="arrow-text">OYNA</span>
                <span className="arrow-symbol">➔</span>
              </div>
            </div>
          </button>

          {/* 2. Oyun Modu: Örüntüler Su Tabancası Savaşı */}
          <button
            type="button"
            className="mode-card-btn active-mode-btn pattern-mode-card"
            onClick={() => {
              playPop();
              onSelectMode('pattern-battle');
            }}
          >
            <div className="mode-btn-content">
              <div className="mode-btn-icon-wrapper pattern-icon">
                <img src="/img/patterns.svg" alt="Örüntüler" className="mode-btn-img" />
              </div>

              <div className="mode-btn-text-block">
                <span className="mode-title-text">Örüntüler Su Tabancası Savaşı</span>
              </div>

              <div className="mode-play-arrow">
                <span className="arrow-text">OYNA</span>
                <span className="arrow-symbol">➔</span>
              </div>
            </div>
          </button>

          {/* 3. Oyun Modu: Üslü Sayılar Su Tabancası Savaşı */}
          <button
            type="button"
            className="mode-card-btn active-mode-btn exponent-mode-card"
            onClick={() => {
              playPop();
              onSelectMode('exponent-battle');
            }}
          >
            <div className="mode-btn-content">
              <div className="mode-btn-icon-wrapper exponent-icon">
                <img src="/img/exponents.png" alt="Üslü Sayılar" className="mode-btn-img" />
              </div>

              <div className="mode-btn-text-block">
                <span className="mode-title-text">Üslü Sayılar Su Tabancası Savaşı</span>
              </div>

              <div className="mode-play-arrow">
                <span className="arrow-text">OYNA</span>
                <span className="arrow-symbol">➔</span>
              </div>
            </div>
          </button>

          {/* 3. Oyun Modu: Eşitlik Ve Denklem Su Tabancası Savaşı */}
          <button
            type="button"
            className="mode-card-btn active-mode-btn equation-mode-card"
            onClick={() => {
              playPop();
              onSelectMode('equation-battle');
            }}
          >
            <div className="mode-btn-content">
              <div className="mode-btn-icon-wrapper equation-icon">
                <img src="/img/equations.svg" alt="Eşitlik Ve Denklem" className="mode-btn-img" />
              </div>

              <div className="mode-btn-text-block">
                <span className="mode-title-text">Eşitlik Ve Denklem Su Tabancası Savaşı</span>
              </div>

              <div className="mode-play-arrow">
                <span className="arrow-text">OYNA</span>
                <span className="arrow-symbol">➔</span>
              </div>
            </div>
          </button>
        </section>
      </main>
    </div>
  );
}
