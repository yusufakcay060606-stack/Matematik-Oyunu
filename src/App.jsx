import React, { useState } from 'react';
import Home from './components/Home';
import WaterBattleGame from './components/WaterBattle/WaterBattleGame';
import { toggleSound, isSoundEnabled } from './utils/soundEffects';
import './styles/home.css';
import './styles/waterBattle.css';

/**
 * Matematik Oyunları Ana Uygulama
 */
export default function App() {
  const [currentMode, setCurrentMode] = useState('home'); // 'home' | 'water-battle' | 'exponent-battle'
  const [soundActive, setSoundActive] = useState(() => isSoundEnabled());

  const handleToggleSound = () => {
    const newState = toggleSound();
    setSoundActive(newState);
  };

  return (
    <div className="app-root">
      {currentMode === 'home' && (
        <Home
          onSelectMode={(mode) => setCurrentMode(mode)}
          soundEnabled={soundActive}
          onToggleSound={handleToggleSound}
        />
      )}

      {currentMode === 'water-battle' && (
        <WaterBattleGame
          gameType="operations"
          onGoHome={() => setCurrentMode('home')}
          soundEnabled={soundActive}
          onToggleSound={handleToggleSound}
        />
      )}

      {currentMode === 'pattern-battle' && (
        <WaterBattleGame
          gameType="patterns"
          onGoHome={() => setCurrentMode('home')}
          soundEnabled={soundActive}
          onToggleSound={handleToggleSound}
        />
      )}

      {currentMode === 'exponent-battle' && (
        <WaterBattleGame
          gameType="exponents"
          onGoHome={() => setCurrentMode('home')}
          soundEnabled={soundActive}
          onToggleSound={handleToggleSound}
        />
      )}

      {currentMode === 'equation-battle' && (
        <WaterBattleGame
          gameType="equations"
          onGoHome={() => setCurrentMode('home')}
          soundEnabled={soundActive}
          onToggleSound={handleToggleSound}
        />
      )}
    </div>
  );
}
