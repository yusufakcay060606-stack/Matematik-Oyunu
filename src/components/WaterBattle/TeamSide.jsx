import React, { useRef } from 'react';
import CharacterTelAli from './CharacterTelAli';
import HealthBar from './HealthBar';
import MathQuestion from './MathQuestion';
import NumberPad from './NumberPad';
import PatternPad from './PatternPad';

/**
 * TeamSide Bileşeni
 * Sol (Takım 1) veya Sağ (Takım 2) tarafın tam oyun istasyonu
 */
export default function TeamSide({
  team,
  health,
  maxHealth,
  question,
  feedback,
  characterState,
  inputValue,
  onInputChange,
  onSubmitAnswer,
  isInputDisabled,
  characterRef,
  allowNegative = false,
  isPatternMode = false,
}) {
  const inputRef = useRef(null);
  const isTeam1 = team === 1;

  return (
    <section className={`team-side-section team-${team}-zone`}>
      {/* Üst Alan: Takım Başlığı */}
      <div className="team-status-header">
        <div className="team-title-banner">
          <span className="team-icon">{isTeam1 ? '🛡️' : '⚡'}</span>
          <h2 className="team-name">{isTeam1 ? 'TAKIM 1' : 'TAKIM 2'}</h2>
        </div>
      </div>

      {/* Orta Alan: Can Barı ve Tel Ali Karakteri */}
      <div className="character-stage-wrapper">
        <div className="character-with-health">
          <HealthBar
            currentHealth={health}
            maxHealth={maxHealth}
            team={team}
          />
          <CharacterTelAli
            ref={characterRef}
            team={team}
            state={characterState}
          />
        </div>
      </div>

      {/* Matematik Soru Kartı */}
      <div className="team-question-area">
        <MathQuestion
          question={question}
          feedback={feedback}
          team={team}
        />
      </div>

      {/* Dokunmatik Tuş Takımı / Şekil Seçim Alanı */}
      <div className="team-control-area">
        {isPatternMode ? (
          <PatternPad
            value={inputValue}
            onChange={onInputChange}
            onSubmit={onSubmitAnswer}
            disabled={isInputDisabled}
            team={team}
          />
        ) : (
          <NumberPad
            value={inputValue}
            onChange={onInputChange}
            onSubmit={onSubmitAnswer}
            disabled={isInputDisabled}
            team={team}
            inputRef={inputRef}
            allowNegative={allowNegative}
          />
        )}
      </div>
    </section>
  );
}
