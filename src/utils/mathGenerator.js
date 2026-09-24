/**
 * 4 İşlem Matematik Soru Üreteci
 * Akıllı tahta ve hızlı zihinsel işlem için optimize edilmiş,
 * her zaman tam sayılı sonuç veren soru algoritması.
 */

const OPERATORS = ['+', '-', '×', '÷'];

/**
 * Rastgele tam sayı üretir [min, max]
 */
function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Tek bir soru üretir.
 * @param {string} excludeText - Diğer takımdaki soru ile çakışmayı önlemek için metin
 * @returns {{ id: string, num1: number, operator: string, num2: number, answer: number, text: string }}
 */
export function generateQuestion(excludeText = '') {
  let attempts = 0;
  while (attempts < 20) {
    attempts++;
    const op = OPERATORS[Math.floor(Math.random() * OPERATORS.length)];
    let num1, num2, answer;

    switch (op) {
      case '+': {
        // Toplama: 5-45 arası toplam, akıldan hızlıca toplanabilir
        num1 = randomInt(4, 30);
        num2 = randomInt(3, 25);
        answer = num1 + num2;
        break;
      }
      case '-': {
        // Çıkarma: Sonuç pozitif (1-30 arası)
        num1 = randomInt(8, 40);
        num2 = randomInt(2, num1 - 1);
        answer = num1 - num2;
        break;
      }
      case '×': {
        // Çarpma: Çarpım tablosu (2-9 arası)
        num1 = randomInt(2, 9);
        num2 = randomInt(2, 9);
        answer = num1 * num2;
        break;
      }
      case '÷': {
        // Bölme: Her zaman kalansız ve tam sayı sonuç
        // bölen 2-9, bölüm 2-10, bölünen = bölen * bölüm
        const divisor = randomInt(2, 9);
        answer = randomInt(2, 10);
        num1 = divisor * answer;
        num2 = divisor;
        break;
      }
      default:
        num1 = 5;
        num2 = 5;
        answer = 10;
    }

    const text = `${num1} ${op} ${num2}`;

    // Diğer takımla aynı soru olmasın
    if (text !== excludeText) {
      return {
        id: Math.random().toString(36).substring(2, 9),
        num1,
        operator: op,
        num2,
        answer,
        text
      };
    }
  }

  // Güvenli fallback
  const fallbackNum1 = randomInt(3, 9);
  const fallbackNum2 = randomInt(3, 9);
  return {
    id: Math.random().toString(36).substring(2, 9),
    num1: fallbackNum1,
    operator: '×',
    num2: fallbackNum2,
    answer: fallbackNum1 * fallbackNum2,
    text: `${fallbackNum1} × ${fallbackNum2}`
  };
}

/**
 * Kolay Seviye 4 İşlem Matematik Soru Üreteci
 * Küçük rakamlar ve zihinden anında çözülebilir kolay işlemler.
 * - Toplama: 1..9 + 1..9 (toplam 2..18)
 * - Çıkarma: 3..15 - 1..9 (küçük pozitif sonuç)
 * - Çarpma: 1..5 × 1..5 (kolay çarpım tablosu)
 * - Bölme: bölen 2..5, bölüm 1..5 (kalansız, tam sayı)
 */
export function generateEasyQuestion(excludeText = '') {
  let attempts = 0;
  while (attempts < 20) {
    attempts++;
    const op = OPERATORS[Math.floor(Math.random() * OPERATORS.length)];
    let num1, num2, answer;

    switch (op) {
      case '+': {
        num1 = randomInt(1, 9);
        num2 = randomInt(1, 9);
        answer = num1 + num2;
        break;
      }
      case '-': {
        num1 = randomInt(4, 15);
        num2 = randomInt(1, Math.min(num1 - 1, 9));
        answer = num1 - num2;
        break;
      }
      case '×': {
        num1 = randomInt(1, 5);
        num2 = randomInt(1, 5);
        answer = num1 * num2;
        break;
      }
      case '÷': {
        const divisor = randomInt(2, 5);
        answer = randomInt(1, 5);
        num1 = divisor * answer;
        num2 = divisor;
        break;
      }
      default:
        num1 = 3;
        num2 = 2;
        answer = 5;
    }

    const text = `${num1} ${op} ${num2}`;

    if (text !== excludeText) {
      return {
        id: Math.random().toString(36).substring(2, 9),
        num1,
        operator: op,
        num2,
        answer,
        text
      };
    }
  }

  // Güvenli fallback
  return {
    id: Math.random().toString(36).substring(2, 9),
    num1: 3,
    operator: '+',
    num2: 4,
    answer: 7,
    text: '3 + 4'
  };
}

/**
 * Toplama Ve Çıkarma Su Tabancası Savaşı Soru Üreteci
 * - Sadece Toplama (+) ve Çıkarma (-) işlemleri (Çarpma ve bölme kesinlikle yoktur)
 * - Toplama: 1..9 + 1..9 (toplam 2..18)
 * - Çıkarma: 4..15 - 1..9 (küçük pozitif sonuç)
 */
export function generateAddSubQuestion(excludeText = '') {
  let attempts = 0;
  const ADD_SUB_OPS = ['+', '-'];
  while (attempts < 20) {
    attempts++;
    const op = ADD_SUB_OPS[Math.floor(Math.random() * ADD_SUB_OPS.length)];
    let num1, num2, answer;

    if (op === '+') {
      num1 = randomInt(1, 9);
      num2 = randomInt(1, 9);
      answer = num1 + num2;
    } else {
      num1 = randomInt(4, 15);
      num2 = randomInt(1, Math.min(num1 - 1, 9));
      answer = num1 - num2;
    }

    const text = `${num1} ${op} ${num2}`;

    if (text !== excludeText) {
      return {
        id: Math.random().toString(36).substring(2, 9),
        num1,
        operator: op,
        num2,
        answer,
        text
      };
    }
  }

  // Güvenli fallback
  return {
    id: Math.random().toString(36).substring(2, 9),
    num1: 4,
    operator: '+',
    num2: 5,
    answer: 9,
    text: '4 + 5'
  };
}

/**
 * Üslü Sayılar Soru Üreteci (Ortaokul Seviyesi)
 * - Taban: -9 ile 9 arası rastgele tam sayı (0-9 gelme ihtimali %75)
 * - Üs: 0, 1, 2, 3 gibi basit sayılar
 * - 0^0 belirsizliği önlenir (taban 0 ise üs 1, 2, 3 olur).
 * - Negatif tabanlar parantezli gösterilir: örn. (-3)^2 = 9, (-4)^3 = -64
 */
export function generateExponentQuestion(excludeText = '') {
  let attempts = 0;
  while (attempts < 25) {
    attempts++;

    // Taban: %75 ihtimalle 0..9, %25 ihtimalle -9..-1
    let base;
    if (Math.random() < 0.75) {
      base = randomInt(0, 9);
    } else {
      base = randomInt(-9, -1);
    }

    // Üs: 0, 1, 2, 3 (Taban 0 ise 0^0 belirsiz olduğundan üs 1..3 olur)
    let exponent;
    if (base === 0) {
      exponent = randomInt(1, 3);
    } else {
      exponent = randomInt(0, 3);
    }

    // Doğru cevap hesaplama: (-3)^2 = 9, (-2)^3 = -8, (-5)^0 = 1, 0^2 = 0
    const answer = Math.pow(base, exponent);

    // Tabanın gösterim şekli (negatif sayılar ortaokul standardında parantezli yazılır)
    const baseDisplay = base < 0 ? `(${base})` : `${base}`;
    const text = `${baseDisplay}^${exponent}`;

    if (text !== excludeText) {
      return {
        id: Math.random().toString(36).substring(2, 9),
        isExponent: true,
        base,
        exponent,
        baseDisplay,
        answer,
        text
      };
    }
  }

  // Güvenli Fallback
  return {
    id: Math.random().toString(36).substring(2, 9),
    isExponent: true,
    base: 3,
    exponent: 2,
    baseDisplay: '3',
    answer: 9,
    text: '3^2'
  };
}

/**
 * Kolay Seviye Üslü Sayılar Soru Üreteci
 * - Sadece pozitif tabanlar (0-10 arası, kesinlikle negatif sayı yok!)
 * - Küçük ve basit üsler (0, 1, 2, 3)
 * - Cevaplar büyük sayılar olmaz (maksimum 100)
 */
export function generateEasyExponentQuestion(excludeText = '') {
  let attempts = 0;
  while (attempts < 25) {
    attempts++;

    let base, exponent;
    const type = randomInt(1, 6);

    switch (type) {
      case 1: {
        // 0. Kuvvet kuralı: a^0 = 1 (1^0, 2^0, 3^0, 5^0, 7^0, 9^0)
        base = randomInt(1, 9);
        exponent = 0;
        break;
      }
      case 2: {
        // 1. Kuvvet kuralı: a^1 = a (1^1 .. 10^1)
        base = randomInt(1, 10);
        exponent = 1;
        break;
      }
      case 3: {
        // Küçük Kareler (2^2 .. 9^2 veya 10^2) -> 4, 9, 16, 25, 36, 49, 64, 81, 100
        base = randomInt(2, 10);
        exponent = 2;
        break;
      }
      case 4: {
        // Küçük Küpler (1^3 .. 4^3) -> 1, 8, 27, 64
        base = randomInt(1, 4);
        exponent = 3;
        break;
      }
      case 5: {
        // 2'nin küçük kuvvetleri: 2^2, 2^3, 2^4, 2^5 -> 4, 8, 16, 32
        base = 2;
        exponent = randomInt(2, 5);
        break;
      }
      case 6: {
        // 10'un veya 3'ün küçük kuvvetleri: 10^2 = 100 veya 3^3 = 27
        if (Math.random() < 0.5) {
          base = 10;
          exponent = 2;
        } else {
          base = 3;
          exponent = randomInt(2, 3);
        }
        break;
      }
      default:
        base = 2;
        exponent = 3;
    }

    const answer = Math.pow(base, exponent);
    // Güvenlik: kesinlikle negatif yok ve en fazla 100
    if (answer < 0 || answer > 100) continue;

    const baseDisplay = `${base}`;
    const text = `${baseDisplay}^${exponent}`;

    if (text !== excludeText) {
      return {
        id: Math.random().toString(36).substring(2, 9),
        isExponent: true,
        base,
        exponent,
        baseDisplay,
        answer,
        text
      };
    }
  }

  // Güvenli Fallback
  return {
    id: Math.random().toString(36).substring(2, 9),
    isExponent: true,
    base: 2,
    exponent: 3,
    baseDisplay: '2',
    answer: 8,
    text: '2^3'
  };
}

/**
 * Eşitlik ve Denklem Soru Üreteci (Ortaokul Seviyesi)
 * - 1. Dereceden 1 Bilinmeyenli Basit Denklemler (3x + 7 = 10 gibi)
 * - Çözüm (x) her zaman tam sayı çıkar.
 * - Akıldan zihinsel işlemle hızlıca çözülebilir.
 */
export function generateEquationQuestion(excludeText = '') {
  let attempts = 0;
  while (attempts < 30) {
    attempts++;

    // Hedef x (Cevap) seçimi: %70 pozitif (1..9), %20 negatif (-5..-1), %10 sıfır (0)
    let x;
    const rType = Math.random();
    if (rType < 0.70) {
      x = randomInt(1, 9);
    } else if (rType < 0.90) {
      x = randomInt(-5, -1);
    } else {
      x = 0;
    }

    // Denklem kalıbı seçimi
    const form = randomInt(1, 5);
    let equationDisplay = '';
    let a, b, c;

    switch (form) {
      case 1: {
        // ax + b = c (örn: 3x + 7 = 10, 2x + 8 = 14)
        a = randomInt(2, 5);
        b = randomInt(1, 15);
        c = a * x + b;
        equationDisplay = `${a}x + ${b} = ${c}`;
        break;
      }
      case 2: {
        // ax - b = c (örn: 4x - 5 = 11, 2x - 3 = 7)
        a = randomInt(2, 5);
        b = randomInt(1, 15);
        c = a * x - b;
        equationDisplay = `${a}x - ${b} = ${c}`;
        break;
      }
      case 3: {
        // b + ax = c (örn: 6 + 2x = 16)
        a = randomInt(2, 4);
        b = randomInt(2, 12);
        c = b + a * x;
        equationDisplay = `${b} + ${a}x = ${c}`;
        break;
      }
      case 4: {
        // x + b = c veya x - b = c (katsayısı 1 olan denklem)
        b = randomInt(2, 15);
        if (Math.random() < 0.5) {
          c = x + b;
          equationDisplay = `x + ${b} = ${c}`;
        } else {
          c = x - b;
          equationDisplay = `x - ${b} = ${c}`;
        }
        break;
      }
      case 5: {
        // ax = c (örn: 5x = 35)
        a = randomInt(2, 8);
        c = a * x;
        equationDisplay = `${a}x = ${c}`;
        break;
      }
      default: {
        a = 2;
        b = 4;
        c = a * x + b;
        equationDisplay = `${a}x + ${b} = ${c}`;
      }
    }

    const text = equationDisplay;

    if (text !== excludeText) {
      return {
        id: Math.random().toString(36).substring(2, 9),
        isEquation: true,
        equationDisplay,
        answer: x,
        text
      };
    }
  }

  // Güvenli Fallback
  return {
    id: Math.random().toString(36).substring(2, 9),
    isEquation: true,
    equationDisplay: '3x + 7 = 10',
    answer: 1,
    text: '3x + 7 = 10'
  };
}

/**
 * 4 Sabit Örüntü Şekli
 * - Yuvarlak (Daire): 🔵
 * - Yıldız: ⭐
 * - Kare: 🟩
 * - Üçgen: 🔺
 */
export const PATTERN_SHAPES = [
  { id: 'circle', symbol: '🔵', name: 'Yuvarlak', color: '#0284c7' },
  { id: 'star', symbol: '⭐', name: 'Yıldız', color: '#f59e0b' },
  { id: 'square', symbol: '🟩', name: 'Kare', color: '#16a34a' },
  { id: 'triangle', symbol: '🔺', name: 'Üçgen', color: '#dc2626' }
];

/**
 * Şekil Örüntüleri Soru Üreteci (İlkokul Seviyesi)
 * - Tekrar sıklığı kesinlikle 4 DEĞİLDİR (Sadece 2 ve 3 elemanlı temel kalıplar: AB, AAB, ABB, ABC).
 * - İlkokul öğrencileri için sade, anlaşılır ve kafa karıştırmayan periyotlar.
 * - Örnekler:
 *   - AB: 🔵 ⭐ 🔵 ⭐ 🔵 ? -> ⭐
 *   - AAB: ⭐ ⭐ 🔺 ⭐ ⭐ ? -> 🔺
 *   - ABB: 🟩 🔵 🔵 🟩 🔵 ? -> 🔵
 *   - ABC: 🔵 🟩 🔺 🔵 🟩 ? -> 🔺
 * - 4 seçenek sabit kalır (Yuvarlak, Yıldız, Kare, Üçgen).
 */
export function generatePatternQuestion(excludeText = '') {
  let attempts = 0;
  while (attempts < 30) {
    attempts++;

    // Şekilleri karıştırarak A, B, C rollerine ata
    const shuffled = [...PATTERN_SHAPES].sort(() => Math.random() - 0.5);
    const A = shuffled[0];
    const B = shuffled[1];
    const C = shuffled[2];

    // Sadece 1-4 arası basit kalıplar (Asla 4 elemanlı periyot yok: periyotlar sadece 2 veya 3)
    const patternType = randomInt(1, 4);
    let fullSequence = [];

    switch (patternType) {
      case 1: {
        // AB kalıbı (Periyot: 2) -> Örn: 🔵 🟩 🔵 🟩 🔵 ? (🟩) veya 🔵 🟩 🔵 🟩 🔵 🟩 ? (🔵)
        const unit = [A, B];
        if (Math.random() < 0.5) {
          fullSequence = [...unit, ...unit, A, B]; // 6 eleman (son eleman B)
        } else {
          fullSequence = [...unit, ...unit, ...unit, A]; // 7 eleman (son eleman A)
        }
        break;
      }
      case 2: {
        // AAB kalıbı (Periyot: 3) -> Örn: ⭐ ⭐ 🔺 ⭐ ⭐ ? (🔺) veya ⭐ ⭐ 🔺 ⭐ ⭐ 🔺 ? (⭐)
        const unit = [A, A, B];
        if (Math.random() < 0.5) {
          fullSequence = [...unit, A, A, B]; // 6 eleman (son eleman B)
        } else {
          fullSequence = [...unit, ...unit, A]; // 7 eleman (son eleman A)
        }
        break;
      }
      case 3: {
        // ABB kalıbı (Periyot: 3) -> Örn: 🟩 🔵 🔵 🟩 🔵 ? (🔵) veya 🟩 🔵 🔵 🟩 🔵 🔵 ? (🟩)
        const unit = [A, B, B];
        if (Math.random() < 0.5) {
          fullSequence = [...unit, A, B, B]; // 6 eleman (son eleman B)
        } else {
          fullSequence = [...unit, ...unit, A]; // 7 eleman (son eleman A)
        }
        break;
      }
      case 4: {
        // ABC kalıbı (Periyot: 3) -> Örn: 🔵 🟩 🔺 🔵 🟩 ? (🔺) veya 🔵 🟩 🔺 🔵 🟩 🔺 ? (🔵)
        const unit = [A, B, C];
        if (Math.random() < 0.5) {
          fullSequence = [...unit, A, B, C]; // 6 eleman (son eleman C)
        } else {
          fullSequence = [...unit, ...unit, A]; // 7 eleman (son eleman A)
        }
        break;
      }
      default: {
        const unit = [A, B];
        fullSequence = [...unit, ...unit, A, B];
      }
    }

    // Son eleman soru işareti '?' yerine gelecek cevaptır
    const answerShape = fullSequence[fullSequence.length - 1];
    const sequence = fullSequence.slice(0, fullSequence.length - 1);

    const text = sequence.map((s) => s.symbol).join(' ') + ' ?';

    if (text !== excludeText) {
      return {
        id: Math.random().toString(36).substring(2, 9),
        isPattern: true,
        sequence, // [{ id, symbol, name, color }, ...]
        answer: answerShape.id,
        answerSymbol: answerShape.symbol,
        answerName: answerShape.name,
        text
      };
    }
  }

  // Güvenli Fallback (Kare, Yuvarlak, Yuvarlak, Kare, Yuvarlak, Yuvarlak, ?)
  const circle = PATTERN_SHAPES.find((s) => s.id === 'circle');
  const square = PATTERN_SHAPES.find((s) => s.id === 'square');
  return {
    id: Math.random().toString(36).substring(2, 9),
    isPattern: true,
    sequence: [square, circle, circle, square, circle, circle],
    answer: square.id,
    answerSymbol: square.symbol,
    answerName: square.name,
    text: '🟩 🔵 🔵 🟩 🔵 🔵 ?'
  };
}

