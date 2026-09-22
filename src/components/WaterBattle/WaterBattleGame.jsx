import React, { useState, useEffect, useRef, useCallback } from 'react';
import TeamSide from './TeamSide';
import WaterStream from './WaterStream';
import GameResult from '../GameResult';
import {
  generateQuestion,
  generateEasyQuestion,
  generateAddSubQuestion,
  generateExponentQuestion,
  generateEasyExponentQuestion,
  generateEquationQuestion,
  generatePatternQuestion,
} from '../../utils/mathGenerator';
import {
  playWaterSquirt,
  playWaterHit,
  playCorrect,
  playWrong,
  playPop,
  startGameMusic,
  stopGameMusic,
  toggleMusic,
  isMusicPlaying,
} from '../../utils/soundEffects';

const MAX_HEALTH = 10;

/**
 * Su Tabancası Savaşı Ana Oyun Sahnesi (Toplama/Çıkarma, 4 İşlem Kolay, 4 İşlem Orta, Örüntüler, Üslü Sayılar Kolay/Orta veya Eşitlik ve Denklem)
 */
export default function WaterBattleGame({ onGoHome, gameType = 'operations' }) {
  const [musicActive, setMusicActive] = useState(() => isMusicPlaying());

  const handleToggleMusic = () => {
    playPop();
    const nextState = toggleMusic();
    setMusicActive(nextState);
  };
  const isExponentMode = gameType === 'exponents';
  const isExponentEasyMode = gameType === 'exponents-easy';
  const isEquationMode = gameType === 'equations';
  const isPatternMode = gameType === 'patterns';
  const isEasyMode = gameType === 'operations-easy';
  const isAddSubMode = gameType === 'add-sub';

  const getQuestion = useCallback(
    (excludeText = '') => {
      if (isPatternMode) return generatePatternQuestion(excludeText);
      if (isEquationMode) return generateEquationQuestion(excludeText);
      if (isExponentEasyMode) return generateEasyExponentQuestion(excludeText);
      if (isExponentMode) return generateExponentQuestion(excludeText);
      if (isEasyMode) return generateEasyQuestion(excludeText);
      if (isAddSubMode) return generateAddSubQuestion(excludeText);
      return generateQuestion(excludeText);
    },
    [isPatternMode, isEquationMode, isExponentEasyMode, isExponentMode, isEasyMode, isAddSubMode]
  );

  // Karakter DOM Referansları (Piksel hassasiyetinde kafa vuruşu için)
  const team1CharRef = useRef(null);
  const team2CharRef = useRef(null);

  // Takım 1 Durumu
  const [t1Health, setT1Health] = useState(MAX_HEALTH);
  const [t1Question, setT1Question] = useState(() => getQuestion());
  const [t1Input, setT1Input] = useState('');
  const [t1Feedback, setT1Feedback] = useState(null);
  const [t1CharState, setT1CharState] = useState('idle');
  const [t1Locked, setT1Locked] = useState(false);

  // Takım 2 Durumu
  const [t2Health, setT2Health] = useState(MAX_HEALTH);
  const [t2Question, setT2Question] = useState(() => getQuestion(t1Question.text));
  const [t2Input, setT2Input] = useState('');
  const [t2Feedback, setT2Feedback] = useState(null);
  const [t2CharState, setT2CharState] = useState('idle');
  const [t2Locked, setT2Locked] = useState(false);

  // Bağımsız Su Jeti Mermileri (İki taraf aynı anda bilirse mermiler birbirini KESMEZ)
  const [t1Projectile, setT1Projectile] = useState(null);
  const [t2Projectile, setT2Projectile] = useState(null);

  // Kazanan Takım: 1 | 2 | 'draw' | null
  const [winnerTeam, setWinnerTeam] = useState(null);

  // Ref'ler: Milisaniyelik buton basma zamanları, anlık can takibi ve yarış durumu yönetimi
  const t1HealthRef = useRef(MAX_HEALTH);
  const t2HealthRef = useRef(MAX_HEALTH);
  const t1SubmitTimeRef = useRef(0);
  const t2SubmitTimeRef = useRef(0);
  const winnerDeterminedRef = useRef(false);
  const isGameOverRef = useRef(false);

  // Eşzamanlılık eşiği: Saniye saniyesine aynı anda basma toleransı (150ms)
  const SIMULTANEOUS_THRESHOLD_MS = 150;

  // Zamanlayıcı referansları temizliği
  const timersRef = useRef([]);
  const addTimer = useCallback((fn, delay) => {
    const t = setTimeout(fn, delay);
    timersRef.current.push(t);
    return t;
  }, []);

  // Oyun başladığında hafif kısık sesle döngüsel arka plan müziğini çal
  useEffect(() => {
    startGameMusic();
    return () => {
      stopGameMusic();
      timersRef.current.forEach(clearTimeout);
      timersRef.current = [];
    };
  }, []);

  // Biri kazandığında veya berabere bittiğinde oyun müziğini durdur
  useEffect(() => {
    if (winnerTeam) {
      stopGameMusic();
    }
  }, [winnerTeam]);

  // Oyunu sıfırla / yeniden başlat
  const handleResetGame = useCallback(() => {
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
    isGameOverRef.current = false;
    winnerDeterminedRef.current = false;
    t1SubmitTimeRef.current = 0;
    t2SubmitTimeRef.current = 0;

    const q1 = getQuestion();
    const q2 = getQuestion(q1.text);

    t1HealthRef.current = MAX_HEALTH;
    t2HealthRef.current = MAX_HEALTH;

    setT1Health(MAX_HEALTH);
    setT1Question(q1);
    setT1Input('');
    setT1Feedback(null);
    setT1CharState('idle');
    setT1Locked(false);

    setT2Health(MAX_HEALTH);
    setT2Question(q2);
    setT2Input('');
    setT2Feedback(null);
    setT2CharState('idle');
    setT2Locked(false);

    setT1Projectile(null);
    setT2Projectile(null);
    setWinnerTeam(null);
    startGameMusic();
  }, [getQuestion]);

  // Takım 1 Cevap Gönderdiğinde
  const handleSubmitTeam1 = useCallback(() => {
    if (t1Locked || winnerTeam || isGameOverRef.current || !t1Input.trim()) return;

    let isCorrect;
    if (isPatternMode) {
      isCorrect = t1Input === t1Question.answer;
    } else {
      const userNum = parseInt(t1Input, 10);
      if (isNaN(userNum)) return;
      isCorrect = userNum === t1Question.answer;
    }

    if (isCorrect) {
      const submitTime = performance.now();
      t1SubmitTimeRef.current = submitTime;

      setT1Locked(true);
      setT1CharState('shooting');
      setT1Feedback({ type: 'correct' });

      // Tam ekran dahil her boyutta hedefin tam kafasını hesapla
      if (team1CharRef.current && team2CharRef.current) {
        const r1 = team1CharRef.current.getBoundingClientRect();
        const r2 = team2CharRef.current.getBoundingClientRect();
        const coords = {
          startX: r1.left + r1.width * 0.86,
          startY: r1.top + r1.height * 0.58,
          targetX: r2.left + r2.width * 0.48,
          targetY: r2.top + r2.height * 0.30, // Tel Ali'nin tam kafa hizası!
        };
        const pId = Date.now() + Math.random();
        setT1Projectile({ id: pId, coords });
        // Animasyon bitene kadar göster, sonra kaldır (1350ms)
        addTimer(() => {
          setT1Projectile((cur) => (cur?.id === pId ? null : cur));
        }, 1350);
      }

      playWaterSquirt();
      playCorrect();

      // Su damlası hedefin tam kafasına ulaşır (~850ms)
      addTimer(() => {
        playWaterHit();

        // Eğer kazanan belirlenmişse ve bu taraf daha önce öldüyse hasar vermez
        if (winnerDeterminedRef.current) {
          setT2CharState('hit');
          addTimer(() => {
            setT2CharState((cur) => (cur === 'hit' ? 'idle' : cur));
          }, 400);
          return;
        }

        setT2CharState('hit');
        const nextT2 = Math.max(0, t2HealthRef.current - 1);
        t2HealthRef.current = nextT2;
        setT2Health(nextT2);

        if (nextT2 === 0) {
          // Takım 2 ölümcül hasar aldı!
          // Kontrol: Takım 2 de ölümcül atış yapmış mıydı ve butonlara "saniye saniyesine aynı anda" mı bastılar?
          const timeDiff = Math.abs(t1SubmitTimeRef.current - t2SubmitTimeRef.current);
          const isT2AlsoFatal = t1HealthRef.current === 1 && t2SubmitTimeRef.current > 0;
          const isSimultaneous = isT2AlsoFatal && timeDiff <= SIMULTANEOUS_THRESHOLD_MS;

          winnerDeterminedRef.current = true;
          isGameOverRef.current = true;
          stopGameMusic();
          setT1Locked(true);
          setT2Locked(true);
          setT2CharState('defeated');

          if (isSimultaneous) {
            // Tam aynı anda öldürdüler -> BERABERE!
            t1HealthRef.current = 0;
            setT1Health(0);
            setT1CharState('defeated');
            addTimer(() => {
              setWinnerTeam('draw');
            }, 3000);
          } else {
            // Takım 1 İLK ÖLDÜREN oldu ve kazandı!
            addTimer(() => {
              setWinnerTeam(1);
            }, 3000);
          }
        }
      }, 850);

      // Karakter durumlarını normale döndür ve yeni soru üret (Ölmediyse)
      addTimer(() => {
        if (isGameOverRef.current || winnerDeterminedRef.current) return;
        setT1CharState((cur) => (cur === 'shooting' ? 'idle' : cur));
        setT2CharState((cur) => (cur === 'hit' ? 'idle' : cur));
        setT1Feedback(null);
        setT1Input('');
        setT1Question(getQuestion(t2Question.text));
        setT1Locked(false);
      }, 1650);
    } else {
      // Yanlış cevap!
      playWrong();
      setT1Locked(true);
      setT1Feedback({ type: 'wrong' });

      addTimer(() => {
        setT1Feedback(null);
        setT1Input('');
        setT1Question(getQuestion(t2Question.text));
        setT1Locked(false);
      }, 700);
    }
  }, [t1Locked, winnerTeam, t1Input, t1Question, t2Question, addTimer, isPatternMode, getQuestion]);

  // Takım 2 Cevap Gönderdiğinde
  const handleSubmitTeam2 = useCallback(() => {
    if (t2Locked || winnerTeam || isGameOverRef.current || !t2Input.trim()) return;

    let isCorrect;
    if (isPatternMode) {
      isCorrect = t2Input === t2Question.answer;
    } else {
      const userNum = parseInt(t2Input, 10);
      if (isNaN(userNum)) return;
      isCorrect = userNum === t2Question.answer;
    }

    if (isCorrect) {
      const submitTime = performance.now();
      t2SubmitTimeRef.current = submitTime;

      setT2Locked(true);
      setT2CharState('shooting');
      setT2Feedback({ type: 'correct' });

      // Tam ekran dahil her boyutta hedefin tam kafasını hesapla
      if (team1CharRef.current && team2CharRef.current) {
        const r1 = team1CharRef.current.getBoundingClientRect();
        const r2 = team2CharRef.current.getBoundingClientRect();
        const coords = {
          startX: r2.left + r2.width * 0.14,
          startY: r2.top + r2.height * 0.58,
          targetX: r1.left + r1.width * 0.52,
          targetY: r1.top + r1.height * 0.30, // Tel Ali'nin tam kafa hizası!
        };
        const pId = Date.now() + Math.random();
        setT2Projectile({ id: pId, coords });
        // Animasyon bitene kadar göster, sonra kaldır (1350ms)
        addTimer(() => {
          setT2Projectile((cur) => (cur?.id === pId ? null : cur));
        }, 1350);
      }

      playWaterSquirt();
      playCorrect();

      // Su damlası hedefin tam kafasına ulaşır (~850ms)
      addTimer(() => {
        playWaterHit();

        // Eğer kazanan belirlenmişse ve bu taraf daha önce öldüyse hasar vermez
        if (winnerDeterminedRef.current) {
          setT1CharState('hit');
          addTimer(() => {
            setT1CharState((cur) => (cur === 'hit' ? 'idle' : cur));
          }, 400);
          return;
        }

        setT1CharState('hit');
        const nextT1 = Math.max(0, t1HealthRef.current - 1);
        t1HealthRef.current = nextT1;
        setT1Health(nextT1);

        if (nextT1 === 0) {
          // Takım 1 ölümcül hasar aldı!
          // Kontrol: Takım 1 de ölümcül atış yapmış mıydı ve butonlara "saniye saniyesine aynı anda" mı bastılar?
          const timeDiff = Math.abs(t2SubmitTimeRef.current - t1SubmitTimeRef.current);
          const isT1AlsoFatal = t2HealthRef.current === 1 && t1SubmitTimeRef.current > 0;
          const isSimultaneous = isT1AlsoFatal && timeDiff <= SIMULTANEOUS_THRESHOLD_MS;

          winnerDeterminedRef.current = true;
          isGameOverRef.current = true;
          stopGameMusic();
          setT1Locked(true);
          setT2Locked(true);
          setT1CharState('defeated');

          if (isSimultaneous) {
            // Tam aynı anda öldürdüler -> BERABERE!
            t2HealthRef.current = 0;
            setT2Health(0);
            setT2CharState('defeated');
            addTimer(() => {
              setWinnerTeam('draw');
            }, 3000);
          } else {
            // Takım 2 İLK ÖLDÜREN oldu ve kazandı!
            addTimer(() => {
              setWinnerTeam(2);
            }, 3000);
          }
        }
      }, 850);

      // Karakter durumlarını normale döndür ve yeni soru üret (Ölmediyse)
      addTimer(() => {
        if (isGameOverRef.current || winnerDeterminedRef.current) return;
        setT2CharState((cur) => (cur === 'shooting' ? 'idle' : cur));
        setT1CharState((cur) => (cur === 'hit' ? 'idle' : cur));
        setT2Feedback(null);
        setT2Input('');
        setT2Question(getQuestion(t1Question.text));
        setT2Locked(false);
      }, 1650);
    } else {
      // Yanlış cevap!
      playWrong();
      setT2Locked(true);
      setT2Feedback({ type: 'wrong' });

      addTimer(() => {
        setT2Feedback(null);
        setT2Input('');
        setT2Question(getQuestion(t1Question.text));
        setT2Locked(false);
      }, 700);
    }
  }, [t2Locked, winnerTeam, t2Input, t2Question, t1Question, addTimer, isPatternMode, getQuestion]);

  return (
    <div className="water-battle-arena">
      {/* Sol Üst Ana Menü Butonu (Navbar yok) */}
      <button
        type="button"
        className="floating-back-menu-btn"
        onClick={() => {
          playPop();
          stopGameMusic();
          onGoHome();
        }}
        title="Ana Menüye Dön"
      >
        ← Ana Menü
      </button>

      {/* Sağ Üst Müzik Aç / Kapat Butonu */}
      <button
        type="button"
        className={`floating-music-btn ${musicActive ? 'music-active' : 'music-muted'}`}
        onClick={handleToggleMusic}
        title={musicActive ? 'Müziği Kapat' : 'Müziği Aç'}
        aria-label={musicActive ? 'Müziği Kapat' : 'Müziği Aç'}
      >
        <div className="music-icon-wrapper">
          <span className="music-note-icon">🎵</span>
          {!musicActive && (
            <svg className="music-slash-svg" viewBox="0 0 32 32" aria-hidden="true">
              <line x1="5" y1="27" x2="27" y2="5" stroke="#ffffff" strokeWidth="5" strokeLinecap="round" />
              <line x1="5" y1="27" x2="27" y2="5" stroke="#dc2626" strokeWidth="3.2" strokeLinecap="round" />
            </svg>
          )}
        </div>
      </button>

      {/* İki Takımlı Split Arena */}
      <main className="arena-split-container">
        {/* SOL TARAF: TAKIM 1 */}
        <TeamSide
          team={1}
          health={t1Health}
          maxHealth={MAX_HEALTH}
          question={t1Question}
          feedback={t1Feedback}
          characterState={t1CharState}
          inputValue={t1Input}
          onInputChange={setT1Input}
          onSubmitAnswer={handleSubmitTeam1}
          isInputDisabled={t1Locked || !!winnerTeam}
          characterRef={team1CharRef}
          allowNegative={isExponentMode || isEquationMode}
          isPatternMode={isPatternMode}
        />

        {/* ORTA AYIRICI ÇİZGİ & VS ROZETİ */}
        <div className="arena-center-divider">
          <div className="divider-line top-line" />
          <div className="vs-badge">
            <span className="vs-text">VS</span>
            <span className="water-emojis">💦</span>
          </div>
          <div className="divider-line bottom-line" />
        </div>

        {/* SAĞ TARAF: TAKIM 2 */}
        <TeamSide
          team={2}
          health={t2Health}
          maxHealth={MAX_HEALTH}
          question={t2Question}
          feedback={t2Feedback}
          characterState={t2CharState}
          inputValue={t2Input}
          onInputChange={setT2Input}
          onSubmitAnswer={handleSubmitTeam2}
          isInputDisabled={t2Locked || !!winnerTeam}
          characterRef={team2CharRef}
          allowNegative={isExponentMode || isEquationMode}
          isPatternMode={isPatternMode}
        />

        {/* Ekranda Uçuşan Su Jeti Animasyonları (Bağımsız - Birbirini Kesmez) */}
        {t1Projectile && (
          <WaterStream key={`p1-${t1Projectile.id}`} shooter={1} coords={t1Projectile.coords} />
        )}
        {t2Projectile && (
          <WaterStream key={`p2-${t2Projectile.id}`} shooter={2} coords={t2Projectile.coords} />
        )}
      </main>

      {/* Oyun Sonu / Zafer Ekranı Modalı (Ölümden 3 saniye sonra çıkar) */}
      {winnerTeam && (
        <GameResult
          winnerTeam={winnerTeam}
          onPlayAgain={handleResetGame}
          onGoHome={onGoHome}
        />
      )}
    </div>
  );
}
