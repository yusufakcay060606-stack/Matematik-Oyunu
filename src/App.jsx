import React, { useState } from 'react';
import Home from './components/Home';
import WaterBattleGame from './components/WaterBattle/WaterBattleGame';
import './styles/home.css';
import './styles/waterBattle.css';

const GAME_TYPE_MAP = {
  'add-sub-battle': 'add-sub',
  'water-battle-easy': 'operations-easy',
  'water-battle': 'operations',
  'pattern-battle': 'patterns',
  'exponent-battle-easy': 'exponents-easy',
  'exponent-battle': 'exponents',
  'equation-battle': 'equations',
};

/**
 * Matematik Oyunları Ana Uygulama
 */
export default function App() {
  const [currentMode, setCurrentMode] = useState('home');

  const handleGoHome = () => setCurrentMode('home');

  return (
    <div className="app-root">
      {currentMode === 'home' ? (
        <Home onSelectMode={setCurrentMode} />
      ) : (
        <WaterBattleGame
          gameType={GAME_TYPE_MAP[currentMode] || 'operations'}
          onGoHome={handleGoHome}
        />
      )}
    </div>
  );
}
