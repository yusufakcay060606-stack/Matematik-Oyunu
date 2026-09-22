import React from 'react';
import { playPop } from '../utils/soundEffects';

/**
 * Home Bileşeni
 * Matematik Oyunları Karşılama ve Mod Seçim Ekranı
 */
export default function Home({ onSelectMode }) {
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
      {/* En Sağ Üst Sade Geliştirici Metni */}
      <span className="developer-credit-text">
        Yusuf Akçay tarafından geliştirildi
      </span>

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
          {/* 1. Oyun Modu: Toplama Ve Çıkarma */}
          <button
            type="button"
            className="mode-card-btn active-mode-btn add-sub-mode-card"
            onClick={() => {
              playPop();
              onSelectMode('add-sub-battle');
            }}
          >
            <span className="school-level-badge level-primary">İlkokul</span>
            <div className="mode-btn-content">
              <div className="mode-btn-icon-wrapper add-sub-icon">
                <img src="/img/add_sub.png" alt="Toplama Ve Çıkarma" className="mode-btn-img" />
              </div>

              <div className="mode-btn-text-block">
                <span className="mode-title-text">Toplama Ve Çıkarma</span>
              </div>

              <div className="mode-play-arrow">
                <span className="arrow-text">OYNA</span>
                <span className="arrow-symbol">➔</span>
              </div>
            </div>
          </button>

          {/* 2. Oyun Modu: 4 İşlem (Kolay Seviye) */}
          <button
            type="button"
            className="mode-card-btn active-mode-btn easy-mode-card"
            onClick={() => {
              playPop();
              onSelectMode('water-battle-easy');
            }}
          >
            <span className="school-level-badge level-primary">İlkokul</span>
            <div className="mode-btn-content">
              <div className="mode-btn-icon-wrapper easy-icon">
                <img src="/img/4operations.png" alt="4 İşlem (Kolay Seviye)" className="mode-btn-img" />
              </div>

              <div className="mode-btn-text-block">
                <span className="mode-title-text">4 İşlem (Kolay Seviye)</span>
              </div>

              <div className="mode-play-arrow">
                <span className="arrow-text">OYNA</span>
                <span className="arrow-symbol">➔</span>
              </div>
            </div>
          </button>

          {/* 3. Oyun Modu: 4 İşlem (Orta Seviye) */}
          <button
            type="button"
            className="mode-card-btn active-mode-btn medium-mode-card"
            onClick={() => {
              playPop();
              onSelectMode('water-battle');
            }}
          >
            <span className="school-level-badge level-primary">İlkokul</span>
            <div className="mode-btn-content">
              <div className="mode-btn-icon-wrapper medium-icon">
                <img src="/img/4operations.png" alt="4 İşlem (Orta Seviye)" className="mode-btn-img" />
              </div>

              <div className="mode-btn-text-block">
                <span className="mode-title-text">4 İşlem (Orta Seviye)</span>
              </div>

              <div className="mode-play-arrow">
                <span className="arrow-text">OYNA</span>
                <span className="arrow-symbol">➔</span>
              </div>
            </div>
          </button>

          {/* 4. Oyun Modu: Örüntüler */}
          <button
            type="button"
            className="mode-card-btn active-mode-btn pattern-mode-card"
            onClick={() => {
              playPop();
              onSelectMode('pattern-battle');
            }}
          >
            <span className="school-level-badge level-primary">İlkokul</span>
            <div className="mode-btn-content">
              <div className="mode-btn-icon-wrapper pattern-icon">
                <img src="/img/patterns.svg" alt="Örüntüler" className="mode-btn-img" />
              </div>

              <div className="mode-btn-text-block">
                <span className="mode-title-text">Örüntüler</span>
              </div>

              <div className="mode-play-arrow">
                <span className="arrow-text">OYNA</span>
                <span className="arrow-symbol">➔</span>
              </div>
            </div>
          </button>

          {/* 5. Oyun Modu: Üslü Sayılar (Kolay Seviye) */}
          <button
            type="button"
            className="mode-card-btn active-mode-btn exponent-easy-mode-card"
            onClick={() => {
              playPop();
              onSelectMode('exponent-battle-easy');
            }}
          >
            <span className="school-level-badge level-middle">Ortaokul</span>
            <div className="mode-btn-content">
              <div className="mode-btn-icon-wrapper exponent-easy-icon">
                <img src="/img/exponents.png" alt="Üslü Sayılar (Kolay Seviye)" className="mode-btn-img" />
              </div>

              <div className="mode-btn-text-block">
                <span className="mode-title-text">Üslü Sayılar (Kolay Seviye)</span>
              </div>

              <div className="mode-play-arrow">
                <span className="arrow-text">OYNA</span>
                <span className="arrow-symbol">➔</span>
              </div>
            </div>
          </button>

          {/* 6. Oyun Modu: Üslü Sayılar (Orta Seviye) */}
          <button
            type="button"
            className="mode-card-btn active-mode-btn exponent-mode-card"
            onClick={() => {
              playPop();
              onSelectMode('exponent-battle');
            }}
          >
            <span className="school-level-badge level-middle">Ortaokul</span>
            <div className="mode-btn-content">
              <div className="mode-btn-icon-wrapper exponent-icon">
                <img src="/img/exponents.png" alt="Üslü Sayılar (Orta Seviye)" className="mode-btn-img" />
              </div>

              <div className="mode-btn-text-block">
                <span className="mode-title-text">Üslü Sayılar (Orta Seviye)</span>
              </div>

              <div className="mode-play-arrow">
                <span className="arrow-text">OYNA</span>
                <span className="arrow-symbol">➔</span>
              </div>
            </div>
          </button>

          {/* 7. Oyun Modu: Eşitlik Ve Denklem */}
          <button
            type="button"
            className="mode-card-btn active-mode-btn equation-mode-card"
            onClick={() => {
              playPop();
              onSelectMode('equation-battle');
            }}
          >
            <span className="school-level-badge level-middle">Ortaokul</span>
            <div className="mode-btn-content">
              <div className="mode-btn-icon-wrapper equation-icon">
                <img src="/img/equations.svg" alt="Eşitlik Ve Denklem" className="mode-btn-img" />
              </div>

              <div className="mode-btn-text-block">
                <span className="mode-title-text">Eşitlik Ve Denklem</span>
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
