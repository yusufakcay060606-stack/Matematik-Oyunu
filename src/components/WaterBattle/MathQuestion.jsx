import React from 'react';

/**
 * MathQuestion Bileşeni
 * Akıllı tahtada en arkadan bile rahatlıkla okunabilen yüksek kontrastlı soru kartı
 */
export default function MathQuestion({ question, feedback, team }) {
  return (
    <div className={`question-card team-${team} ${feedback ? `has-${feedback.type}` : ''}`}>

      {/* Soru İşlemi */}
      <div className="question-formula-box">
        {question?.isPattern ? (
          <div className="pattern-formula-wrapper">
            <div className="pattern-sequence-items">
              {question.sequence?.map((item, idx) => (
                <span key={`${item.id}-${idx}`} className="pattern-shape-badge" title={item.name}>
                  <span className={item.id === 'triangle' ? 'scaled-triangle' : ''}>
                    {item.symbol}
                  </span>
                </span>
              ))}
              <span className="pattern-shape-badge pattern-question-badge">
                ?
              </span>
            </div>
          </div>
        ) : question?.isEquation ? (
          <div className="equation-formula-wrapper">
            <span className="equation-formula-text">{question.equationDisplay}</span>
            <span className="equation-prompt-badge">x = ?</span>
          </div>
        ) : question?.isExponent ? (
          <>
            <span className="number-part base-part">{question.baseDisplay}</span>
            <sup className="exponent-number">{question.exponent}</sup>
            <span className="equals-symbol">=</span>
            <span className="question-mark">?</span>
          </>
        ) : (
          <>
            <span className="number-part">{question?.num1}</span>
            <span className="operator-symbol">{question?.operator}</span>
            <span className="number-part">{question?.num2}</span>
            <span className="equals-symbol">=</span>
            <span className="question-mark">?</span>
          </>
        )}
      </div>
    </div>
  );
}
