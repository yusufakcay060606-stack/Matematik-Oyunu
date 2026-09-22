import React from 'react';
import { playPop } from '../../utils/soundEffects';

/**
 * NumberPad Bileşeni
 * Akıllı tahta için büyük butonlu, dokunmatik uyumlu sayı tuş takımı ve cevap inputu
 */
export default function NumberPad({
  value,
  onChange,
  onSubmit,
  disabled = false,
  team,
  inputRef,
  allowNegative = false
}) {
  const handleDigitClick = (digit) => {
    if (disabled) return;
    playPop();
    // Max 5 basamak yeterlidir (-1234 gibi)
    if (value.length < 5) {
      onChange(value + digit);
    }
    if (inputRef && inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleMinusClick = () => {
    if (disabled) return;
    playPop();
    if (value.startsWith('-')) {
      onChange(value.slice(1));
    } else {
      onChange('-' + value);
    }
    if (inputRef && inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleBackspace = () => {
    if (disabled) return;
    playPop();
    onChange(value.slice(0, -1));
    if (inputRef && inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleClear = () => {
    if (disabled) return;
    playPop();
    onChange('');
    if (inputRef && inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      onSubmit();
    }
  };

  // 1-9 ve 0 tuş dizilimi
  const digits = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];

  return (
    <div className={`numpad-container team-${team}`}>
      {/* Cevap Giriş Alanı */}
      <div className="answer-input-wrapper">
        <input
          ref={inputRef}
          type="text"
          inputMode={allowNegative ? 'text' : 'numeric'}
          className="answer-input"
          value={value}
          onChange={(e) => {
            let clean;
            if (allowNegative) {
              clean = e.target.value.replace(/[^0-9-]/g, '').replace(/(?!^)-/g, '').slice(0, 5);
            } else {
              clean = e.target.value.replace(/\D/g, '').slice(0, 4);
            }
            onChange(clean);
          }}
          onKeyDown={handleKeyDown}
          placeholder="CEVAP"
          disabled={disabled}
          autoComplete="off"
        />
        {value.length > 0 && !disabled && (
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

      {/* Akıllı Tahta Sayı Butonları */}
      <div className="numpad-grid">
        {digits.map((d) => (
          <button
            key={d}
            type="button"
            className="numpad-digit-btn"
            onClick={() => handleDigitClick(d)}
            disabled={disabled}
          >
            {d}
          </button>
        ))}

        {/* Eksi / Silme / Temizle Butonları (Tam 12 Butonluk Sabit Izgara) */}
        {allowNegative ? (
          <>
            <button
              type="button"
              className="numpad-action-btn minus-btn"
              onClick={handleMinusClick}
              disabled={disabled}
              title="Eksi (−) ekle / kaldır"
            >
              −
            </button>
            <button
              type="button"
              className="numpad-action-btn backspace-btn"
              onClick={handleBackspace}
              disabled={disabled || value.length === 0}
              title="Bir basamak sil"
            >
              ⌫
            </button>
          </>
        ) : (
          <>
            <button
              type="button"
              className="numpad-action-btn backspace-btn"
              onClick={handleBackspace}
              disabled={disabled || value.length === 0}
              title="Bir basamak sil"
            >
              ⌫
            </button>
            <button
              type="button"
              className="numpad-action-btn clear-all-btn"
              onClick={handleClear}
              disabled={disabled || value.length === 0}
              title="Tümünü temizle"
            >
              C
            </button>
          </>
        )}
      </div>

      {/* CEVAPLA Butonu */}
      <button
        type="button"
        className="submit-answer-btn"
        onClick={onSubmit}
        disabled={disabled || value.trim() === ''}
      >
        <span className="submit-text">CEVAPLA</span>
      </button>
    </div>
  );
}
