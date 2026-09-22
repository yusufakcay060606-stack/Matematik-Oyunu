import React, { forwardRef } from 'react';

/**
 * Tel Ali Karakter Bileşeni
 * TRT Çocuk Tel Ali'nin ikonik kırmızı saç bandanası, gür kıvırcık saçları
 * ve su tabancasıyla daha büyük ve belirgin tasarımı.
 */
const CharacterTelAli = forwardRef(function CharacterTelAli(
  { team, state = 'idle', customImage = null },
  ref
) {
  const isTeam1 = team === 1;
  const tankWaterColor = isTeam1 ? '#38bdf8' : '#fb7185';
  const shirtColor = isTeam1 ? '#0284c7' : '#e11d48';

  if (customImage) {
    return (
      <div ref={ref} className={`character-container team-${team} state-${state}`}>
        <img src={customImage} alt={`Tel Ali Takım ${team}`} className="custom-character-img" />
      </div>
    );
  }

  return (
    <div ref={ref} className={`character-wrapper team-${team} state-${state}`}>
      {/* Vurulduğunda Su Sıçraması */}
      {state === 'hit' && (
        <div className="water-splash-overlay">
          <span className="splash-drop d1">💧</span>
          <span className="splash-drop d2">💦</span>
          <span className="splash-drop d3">💧</span>
          <span className="splash-drop d4">💦</span>
        </div>
      )}

      {/* Ölüm Anında Baş Dönmesi / Yıldızlar */}
      {(state === 'defeated' || state === 'dying') && (
        <div className="defeat-stars">
          <span className="star-item st1">💫</span>
          <span className="star-item st2">⭐</span>
          <span className="star-item st3">💫</span>
        </div>
      )}

      <svg
        viewBox="0 0 210 240"
        className="tel-ali-svg"
        style={{
          transform: isTeam1 ? 'scaleX(1)' : 'scaleX(-1)', // Takım 2 karşıya dönsün
        }}
      >
        <defs>
          <linearGradient id={`waterTankGrad-${team}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#e0f2fe" stopOpacity="0.85" />
            <stop offset="100%" stopColor={tankWaterColor} stopOpacity="0.95" />
          </linearGradient>
          <linearGradient id={`gunBodyGrad-${team}`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={isTeam1 ? '#0369a1' : '#be123c'} />
            <stop offset="100%" stopColor={isTeam1 ? '#38bdf8' : '#fb7185'} />
          </linearGradient>
          <filter id={`shadow-${team}`} x="-10%" y="-10%" width="130%" height="130%">
            <feDropShadow dx="0" dy="3" stdDeviation="2.5" floodOpacity="0.2" />
          </filter>
        </defs>

        {/* Gölgelik Zemin */}
        <ellipse cx="102" cy="230" rx="55" ry="9" fill="rgba(0,0,0,0.16)" />

        {/* --- BACAKLAR & AYAKKABILAR --- */}
        <path d="M78 185 L78 218" stroke="#fde047" strokeWidth="10" strokeLinecap="round" />
        <path d="M68 218 C68 208 94 208 94 218 C94 227 64 227 68 218 Z" fill="#1e293b" />

        <path d="M112 185 L116 218" stroke="#fde047" strokeWidth="10" strokeLinecap="round" />
        <path d="M106 218 C106 208 132 208 132 218 C132 227 102 227 106 218 Z" fill="#1e293b" />

        {/* --- PANTOLON --- */}
        <path d="M68 152 L128 152 L125 190 L104 190 L98 166 L92 190 L72 190 Z" fill="#1e3a8a" />
        <rect x="74" y="149" width="48" height="6" rx="2" fill="#eab308" />

        {/* --- GÖVDE & TİŞÖRT --- */}
        <rect x="70" y="98" width="56" height="56" rx="14" fill={shirtColor} filter={`url(#shadow-${team})`} />
        <path d="M70 114 L126 114" stroke="#ffffff" strokeWidth="5" strokeLinecap="round" />
        <path d="M70 132 L126 132" stroke="#ffffff" strokeWidth="5" strokeLinecap="round" />

        {/* --- TEL ALİ'NİN İKONİK KIVIRCIK SAÇLARI (ARKA TABAKA) --- */}
        <g fill="#3e1a05">
          <circle cx="56" cy="58" r="18" />
          <circle cx="68" cy="40" r="19" />
          <circle cx="88" cy="30" r="20" />
          <circle cx="110" cy="30" r="20" />
          <circle cx="130" cy="42" r="19" />
          <circle cx="142" cy="60" r="18" />
          <circle cx="62" cy="76" r="16" />
          <circle cx="136" cy="78" r="16" />
        </g>

        {/* Boyun */}
        <rect x="91" y="85" width="16" height="18" rx="4" fill="#fed7aa" />

        {/* Baş / Yüz */}
        <ellipse cx="99" cy="68" rx="29" ry="26" fill="#fed7aa" filter={`url(#shadow-${team})`} />

        {/* Kulaklar */}
        <ellipse cx="69" cy="70" rx="6.5" ry="8" fill="#fdba74" />
        <ellipse cx="129" cy="70" rx="6.5" ry="8" fill="#fdba74" />

        {/* --- TEL ALİ'NİN İKONİK KIRMIZI ALIN BANDI (HEADBAND) --- */}
        <path
          d="M68 56 Q99 64 130 56 L131 63 Q99 71 67 63 Z"
          fill="#dc2626"
          filter={`url(#shadow-${team})`}
        />
        {/* Bandana Düğümü / Çizgisi */}
        <circle cx="68" cy="60" r="4" fill="#b91c1c" />

        {/* --- TEL ALİ ÖN SAÇ BUKLELERİ (Bandana Üstünden Çıkan Kıvırcıklar) --- */}
        <g fill="#3e1a05">
          <circle cx="76" cy="46" r="11" />
          <circle cx="92" cy="42" r="12" />
          <circle cx="108" cy="43" r="12" />
          <circle cx="122" cy="48" r="10" />
          {/* Fırlayan sevimli bukleler */}
          <path d="M84 40 C80 26 96 24 97 38" stroke="#3e1a05" strokeWidth="5.5" strokeLinecap="round" fill="none" />
          <path d="M104 36 C108 22 122 26 117 38" stroke="#3e1a05" strokeWidth="5.5" strokeLinecap="round" fill="none" />
        </g>

        {/* Kaşlar */}
        <path d="M84 59 Q91 55 97 59" stroke="#3e1a05" strokeWidth="3.5" strokeLinecap="round" fill="none" />
        <path d="M103 59 Q109 55 116 59" stroke="#3e1a05" strokeWidth="3.5" strokeLinecap="round" fill="none" />

        {/* Gözler */}
        {state === 'hit' ? (
          <g>
            <path d="M84 66 L94 72 M94 66 L84 72" stroke="#1e293b" strokeWidth="3.5" strokeLinecap="round" />
            <path d="M104 66 L114 72 M114 66 L104 72" stroke="#1e293b" strokeWidth="3.5" strokeLinecap="round" />
          </g>
        ) : (state === 'defeated' || state === 'dying') ? (
          // Dönerek bayılan spiral X gözler
          <g>
            <circle cx="89" cy="68" r="7" fill="none" stroke="#dc2626" strokeWidth="2.5" strokeDasharray="3 2" />
            <circle cx="109" cy="68" r="7" fill="none" stroke="#dc2626" strokeWidth="2.5" strokeDasharray="3 2" />
          </g>
        ) : (
          <g>
            <ellipse cx="89" cy="67" rx="5.5" ry="6.5" fill="#ffffff" />
            <circle cx="90" cy="67" r="3.5" fill="#0f172a" />
            <circle cx="91.5" cy="65.5" r="1.3" fill="#ffffff" />

            <ellipse cx="109" cy="67" rx="5.5" ry="6.5" fill="#ffffff" />
            <circle cx="110" cy="67" r="3.5" fill="#0f172a" />
            <circle cx="111.5" cy="65.5" r="1.3" fill="#ffffff" />
          </g>
        )}

        {/* Karikatür Burun */}
        <ellipse cx="99" cy="73" rx="3.5" ry="2.8" fill="#fb923c" />

        {/* Ağız */}
        {state === 'hit' ? (
          <ellipse cx="99" cy="83" rx="5.5" ry="6.5" fill="#991b1b" />
        ) : (state === 'defeated' || state === 'dying') ? (
          <path d="M90 85 Q99 79 108 85" stroke="#991b1b" strokeWidth="3.5" strokeLinecap="round" fill="none" />
        ) : (
          <g>
            <path d="M87 77 Q99 91 111 77" stroke="#991b1b" strokeWidth="3.5" strokeLinecap="round" fill="#b91c1c" />
            <rect x="96" y="78" width="6" height="4" rx="1.5" fill="#ffffff" />
          </g>
        )}

        {/* Yanak Allıkları */}
        <circle cx="80" cy="74" r="5" fill="#f87171" opacity="0.5" />
        <circle cx="118" cy="74" r="5" fill="#f87171" opacity="0.5" />

        {/* --- SU TABANCASI VE KOLLAR --- */}
        <g className="water-gun-assembly" transform="translate(10, 0)">
          {/* Arka Kol */}
          <path d="M76 108 L60 125 L74 138" stroke="#fed7aa" strokeWidth="11" strokeLinecap="round" strokeLinejoin="round" fill="none" />

          {/* Tabanca */}
          <g className="gun-model" filter={`url(#shadow-${team})`}>
            {/* Su Tankı */}
            <rect x="85" y="112" width="48" height="20" rx="9" fill={`url(#waterTankGrad-${team})`} stroke="#38bdf8" strokeWidth="2" />
            <ellipse cx="96" cy="120" rx="2.5" ry="2.5" fill="#ffffff" opacity="0.8" />
            <ellipse cx="118" cy="122" rx="3" ry="3" fill="#ffffff" opacity="0.8" />
            <rect x="80" y="115" width="6" height="14" rx="2" fill="#f59e0b" />

            {/* Tabanca Gövdesi */}
            <path d="M92 130 L160 130 L158 144 L110 144 L100 156 L88 150 Z" fill={`url(#gunBodyGrad-${team})`} />

            {/* Namlu Ucu */}
            <rect x="159" y="132" width="14" height="9" rx="2" fill="#f59e0b" />
            <rect x="171" y="131" width="5" height="11" rx="1.5" fill="#d97706" />

            {/* Tetik */}
            <path d="M102 144 L96 160 L108 162 L114 144 Z" fill="#0f172a" />

            {/* Pompa Kolu */}
            <rect x="122" y="144" width="26" height="7" rx="3" fill="#10b981" />
          </g>

          {/* Ön Kol */}
          <path d="M110 116 L124 136 L112 150" stroke="#fed7aa" strokeWidth="11" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          <circle cx="110" cy="150" r="7" fill="#fdba74" />

          {/* Namlu Çıkışı Parıltısı */}
          {state === 'shooting' && (
            <g className="muzzle-spray" transform="translate(176, 136)">
              <circle cx="8" cy="0" r="7" fill="#38bdf8" opacity="0.9" />
              <circle cx="18" cy="-2" r="5" fill="#0284c7" />
              <line x1="0" y1="0" x2="24" y2="0" stroke="#38bdf8" strokeWidth="6" strokeLinecap="round" />
            </g>
          )}
        </g>
      </svg>
    </div>
  );
});

export default CharacterTelAli;
