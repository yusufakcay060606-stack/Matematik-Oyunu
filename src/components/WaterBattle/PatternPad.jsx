import React, { useEffect } from 'react';
import { PATTERN_SHAPES } from '../../utils/mathGenerator';
import { playPop } from '../../utils/soundEffects';

/**
 * PatternPad Bileşeni
 * Örüntü oyunu için 4 sabit şekil butonu (Yuvarlak, Yıldız, Kare, Üçgen)
 * ve cevap onaylama alanı.
 */
export default function PatternPad({
  value,
  onChange,
  onSubmit,
  disabled = false,
  team
}) {
  const selectedShape = PATTERN_SHAPES.find((s) => s.id === value);

  // Klavye Desteği: 1-4 tuşları şekilleri seçer, Enter cevaplar
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (disabled) return;
      if (e.key === '1') {
        onChange('circle');
        playPop();
      } else if (e.key === '2') {
        onChange('star');
        playPop();
      } else if (e.key === '3') {
        onChange('square');
        playPop();
      } else if (e.key === '4') {
        onChange('triangle');
        playPop();
      } else if (e.key === 'Enter' && value) {
        e.preventDefault();
        onSubmit();
      } else if (e.key === 'Backspace' || e.key === 'Escape') {
        onChange('');
        playPop();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [disabled, value, onChange, onSubmit]);

  const handleShapeClick = (shapeId) => {
    if (disabled) return;
    playPop();
    // Zaten seçiliyse tekrar basıldığında hızlıca cevapla, değilse seç
    if (value === shapeId) {
      onSubmit();
    } else {
      onChange(shapeId);
    }
  };

  const handleClear = () => {
    if (disabled) return;
    playPop();
    onChange('');
  };

  return (
    <div className={`numpad-container patternpad-container team-${team}`}>
      {/* Seçilen Şekil Görüntüleme Kutusu (Input Kutusu Yerine) */}
      <div className="answer-input-wrapper pattern-input-wrapper">
        <div className="pattern-input-display">
          {selectedShape ? (
            <div className="selected-shape-badge">
              <span className={`selected-shape-symbol ${selectedShape.id === 'triangle' ? 'scaled-triangle' : ''}`}>
                {selectedShape.symbol}
              </span>
            </div>
          ) : (
            <span className="pattern-input-placeholder">Şekil Seçiniz</span>
          )}
        </div>

        {value && !disabled && (
          <button
            type="button"
            className="input-clear-mini"
            onClick={handleClear}
            title="Temizle"
          >
            ✕
          </button>
        )}
      </div>

      {/* 4 Sabit Şekil Butonu (Sadece Şekiller) */}
      <div className="pattern-options-grid">
        {PATTERN_SHAPES.map((shape) => {
          const isSelected = value === shape.id;
          return (
            <button
              key={shape.id}
              type="button"
              className={`pattern-shape-btn shape-${shape.id} ${isSelected ? 'selected' : ''}`}
              onClick={() => handleShapeClick(shape.id)}
              disabled={disabled}
              title={shape.name}
            >
              <span className={`shape-btn-icon ${shape.id === 'triangle' ? 'scaled-triangle' : ''}`}>
                {shape.symbol}
              </span>
            </button>
          );
        })}
      </div>

      {/* CEVAPLA Butonu */}
      <button
        type="button"
        className="submit-answer-btn pattern-submit-btn"
        onClick={onSubmit}
        disabled={disabled || !value}
      >
        <span className="submit-text">CEVAPLA</span>
      </button>
    </div>
  );
}
