'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { Phone, PhoneOff } from 'lucide-react';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type ScreenId =
  | 'idle'
  | 'dialing'
  | 'main-menu'
  | 'consulta-id'
  | 'consulta-id-result'
  | 'certidao-nome'
  | 'certidao-confirm'
  | 'saude-menu'
  | 'saude-consulta'
  | 'saude-cartao'
  | 'educacao-menu'
  | 'educacao-notas'
  | 'educacao-matricula'
  | 'registo-teru'
  | 'registo-teru-confirm'
  | 'exit';

interface ScreenState {
  id: ScreenId;
  lines: string[];
  input: string;
  inputMode: boolean;
  inputLabel: string;
}

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const TYPING_DELAY_MS = 18;

const IDLE_LINES = [
  '',
  '',
  '     GOV-GB',
  '',
  '  *244#',
  '',
  '',
  'Primi CALL ba dial',
];

const MAIN_MENU_LINES = [
  'GOV-GB',
  'Bem-vindu na GOV-GB',
  '',
  '1. Konsulta ID',
  '2. Sertidun Nasimentu',
  '3. Saudi',
  '4. Edukasun',
  '5. Registu Teru',
  '0. Sai',
];

const SAUDE_MENU_LINES = [
  'GOV-GB > Saudi',
  '',
  '1. Konsulta Mediku',
  '2. Kartun Vasinasun',
  '3. Volta',
];

const EDUCACAO_MENU_LINES = [
  'GOV-GB > Edukasun',
  '',
  '1. Konsulta Notas',
  '2. Matrikula Online',
  '3. Volta',
];

const CITIZEN_RESULT_LINES = [
  '--- Rezultadu ---',
  '',
  'Simenti ID:',
  '  GOV-GB-2026-00001',
  'Nomi: Mamadu Balde',
  'Rejiun: Gabu',
  'Nasimentu: 15/03/1985',
  'Status: ATIVU \u2713',
  '',
  '0. Volta',
];

const CERTIDAO_CONFIRM_LINES = [
  '--- Konfirmasun ---',
  '',
  'Pedidu registadu!',
  '',
  'Tracking:',
  '  SN-2026-04-00347',
  '',
  'Bai buska iha',
  'Konservatoriu Gabu',
  'dentro di 5 dia.',
  '',
  '0. Volta',
];

const SAUDE_CONSULTA_LINES = [
  'GOV-GB > Konsulta',
  '',
  'Prosimu Konsulta:',
  '  Dr. Amidata Djaló',
  '  Hospital Simão',
  '  Mendes, Bissau',
  '  Data: 20/02/2026',
  '  Ora: 09:30',
  '',
  '0. Volta',
];

const SAUDE_CARTAO_LINES = [
  'GOV-GB > Vasinasun',
  '',
  'Kartun Vasinasun:',
  '  BCG      - OK \u2713',
  '  Polio    - OK \u2713',
  '  Sarampu  - OK \u2713',
  '  Hepatiti - OK \u2713',
  '  COVID-19 - Dose 2 \u2713',
  '',
  '0. Volta',
];

const EDUCACAO_NOTAS_LINES = [
  'GOV-GB > Notas',
  '',
  'Alunu: Mamadu Balde',
  'Klasi: 10a Klasi',
  '',
  'Matematika:  14/20',
  'Portuges:    16/20',
  'Siensia:     13/20',
  'Historia:    15/20',
  '',
  '0. Volta',
];

const EDUCACAO_MATRICULA_LINES = [
  'GOV-GB > Matrikula',
  '',
  'Matrikula 2026/27',
  'registadu ku susesu!',
  '',
  'Eskola: Liséu Kwame',
  '  Nkrumah, Bissau',
  'Klasi: 11a Klasi',
  'Ref: MAT-2026-01182',
  '',
  '0. Volta',
];

const REGISTO_TERU_CONFIRM_LINES = [
  '--- Registu Teru ---',
  '',
  'Rejistu konfirmadu!',
  '',
  'Parsela:',
  '  TER-GABU-0042',
  'Area: 2.5 ha',
  'Titular: Mamadu Balde',
  'Status: REJISTADU \u2713',
  '',
  '0. Volta',
];

const EXIT_LINES = [
  '',
  '',
  '  Obrigadu!',
  '',
  '  Servisu GOV-GB',
  '  pa povu',
  '  di Gine-Bisau.',
  '',
  '',
];

// ---------------------------------------------------------------------------
// Helper: Signal strength bars SVG
// ---------------------------------------------------------------------------
function SignalBars() {
  return (
    <svg width="16" height="10" viewBox="0 0 16 10" className="inline-block">
      <rect x="0" y="7" width="3" height="3" fill="#2a3a1a" />
      <rect x="4" y="5" width="3" height="5" fill="#2a3a1a" />
      <rect x="8" y="3" width="3" height="7" fill="#2a3a1a" />
      <rect x="12" y="0" width="3" height="10" fill="#2a3a1a" opacity="0.3" />
    </svg>
  );
}

// ---------------------------------------------------------------------------
// Helper: Battery icon SVG
// ---------------------------------------------------------------------------
function BatteryIcon() {
  return (
    <svg width="20" height="10" viewBox="0 0 20 10" className="inline-block">
      <rect x="0" y="1" width="17" height="8" rx="1" fill="none" stroke="#2a3a1a" strokeWidth="1" />
      <rect x="17" y="3" width="2" height="4" rx="0.5" fill="#2a3a1a" />
      <rect x="2" y="3" width="4" height="4" fill="#2a3a1a" />
      <rect x="7" y="3" width="4" height="4" fill="#2a3a1a" />
      <rect x="12" y="3" width="3" height="4" fill="#2a3a1a" opacity="0.3" />
    </svg>
  );
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function PhoneSimulator() {
  // ---- State ---------------------------------------------------------------
  const [screen, setScreen] = useState<ScreenState>({
    id: 'idle',
    lines: IDLE_LINES,
    input: '',
    inputMode: false,
    inputLabel: '',
  });

  const [displayedLines, setDisplayedLines] = useState<string[]>([]);
  const [isAnimating, setIsAnimating] = useState(false);
  const [cursorVisible, setCursorVisible] = useState(true);
  const [keyPressed, setKeyPressed] = useState<string | null>(null);
  const animationRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const screenRef = useRef<HTMLDivElement>(null);

  // ---- Cursor blink --------------------------------------------------------
  useEffect(() => {
    const interval = setInterval(() => setCursorVisible((v) => !v), 530);
    return () => clearInterval(interval);
  }, []);

  // ---- Auto-scroll screen to bottom ----------------------------------------
  useEffect(() => {
    if (screenRef.current) {
      screenRef.current.scrollTop = screenRef.current.scrollHeight;
    }
  }, [displayedLines]);

  // ---- Typing animation ----------------------------------------------------
  const animateLines = useCallback((lines: string[]) => {
    setIsAnimating(true);
    setDisplayedLines([]);
    let lineIdx = 0;
    let charIdx = 0;

    function tick() {
      if (lineIdx >= lines.length) {
        setIsAnimating(false);
        return;
      }
      const currentLine = lines[lineIdx];
      if (charIdx <= currentLine.length) {
        setDisplayedLines((prev) => {
          const next = [...prev];
          next[lineIdx] = currentLine.slice(0, charIdx);
          return next;
        });
        charIdx++;
        animationRef.current = setTimeout(tick, TYPING_DELAY_MS);
      } else {
        lineIdx++;
        charIdx = 0;
        animationRef.current = setTimeout(tick, TYPING_DELAY_MS * 2);
      }
    }

    tick();
  }, []);

  // Cancel animation on unmount
  useEffect(() => {
    return () => {
      if (animationRef.current) clearTimeout(animationRef.current);
    };
  }, []);

  // ---- Navigate to screen --------------------------------------------------
  const goTo = useCallback(
    (
      id: ScreenId,
      lines: string[],
      opts?: { inputMode?: boolean; inputLabel?: string },
    ) => {
      if (animationRef.current) clearTimeout(animationRef.current);
      setScreen({
        id,
        lines,
        input: '',
        inputMode: opts?.inputMode ?? false,
        inputLabel: opts?.inputLabel ?? '',
      });
      animateLines(lines);
    },
    [animateLines],
  );

  // Initial idle render
  useEffect(() => {
    animateLines(IDLE_LINES);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ---- Key press haptic feedback -------------------------------------------
  const flash = (key: string) => {
    setKeyPressed(key);
    setTimeout(() => setKeyPressed(null), 120);
  };

  // ---- Handle digit press --------------------------------------------------
  const handleDigit = (digit: string) => {
    flash(digit);
    if (isAnimating) return;

    // If we are in input mode, append to input buffer
    if (screen.inputMode) {
      setScreen((s) => ({ ...s, input: s.input + digit }));
      return;
    }

    // Menu navigation by digit
    switch (screen.id) {
      case 'main-menu':
        handleMainMenuSelect(digit);
        break;
      case 'saude-menu':
        handleSaudeMenuSelect(digit);
        break;
      case 'educacao-menu':
        handleEducacaoMenuSelect(digit);
        break;
      case 'consulta-id-result':
      case 'certidao-confirm':
      case 'saude-consulta':
      case 'saude-cartao':
      case 'educacao-notas':
      case 'educacao-matricula':
      case 'registo-teru-confirm':
        if (digit === '0') goTo('main-menu', MAIN_MENU_LINES);
        break;
      case 'exit':
        goTo('idle', IDLE_LINES);
        break;
      default:
        break;
    }
  };

  // ---- Main menu selection -------------------------------------------------
  const handleMainMenuSelect = (digit: string) => {
    switch (digit) {
      case '1':
        goTo(
          'consulta-id',
          ['GOV-GB > Konsulta ID', '', 'Introduzi nomeru', 'Simenti ID:'],
          { inputMode: true, inputLabel: 'ID' },
        );
        break;
      case '2':
        goTo(
          'certidao-nome',
          ['GOV-GB > Sertidun', '', 'Introduzi nomi', 'kompletu:'],
          { inputMode: true, inputLabel: 'Nomi' },
        );
        break;
      case '3':
        goTo('saude-menu', SAUDE_MENU_LINES);
        break;
      case '4':
        goTo('educacao-menu', EDUCACAO_MENU_LINES);
        break;
      case '5':
        goTo(
          'registo-teru',
          ['GOV-GB > Registu Teru', '', 'Introduzi nomeru', 'di parsela:'],
          { inputMode: true, inputLabel: 'Parsela' },
        );
        break;
      case '0':
        goTo('exit', EXIT_LINES);
        break;
    }
  };

  // ---- Saude sub-menu ------------------------------------------------------
  const handleSaudeMenuSelect = (digit: string) => {
    switch (digit) {
      case '1':
        goTo('saude-consulta', SAUDE_CONSULTA_LINES);
        break;
      case '2':
        goTo('saude-cartao', SAUDE_CARTAO_LINES);
        break;
      case '3':
        goTo('main-menu', MAIN_MENU_LINES);
        break;
    }
  };

  // ---- Educacao sub-menu ---------------------------------------------------
  const handleEducacaoMenuSelect = (digit: string) => {
    switch (digit) {
      case '1':
        goTo('educacao-notas', EDUCACAO_NOTAS_LINES);
        break;
      case '2':
        goTo('educacao-matricula', EDUCACAO_MATRICULA_LINES);
        break;
      case '3':
        goTo('main-menu', MAIN_MENU_LINES);
        break;
    }
  };

  // ---- Handle OK / Send (confirm input) ------------------------------------
  const handleOk = () => {
    flash('OK');
    if (isAnimating) return;

    if (screen.inputMode && screen.input.length > 0) {
      switch (screen.id) {
        case 'consulta-id':
          goTo('consulta-id-result', CITIZEN_RESULT_LINES);
          break;
        case 'certidao-nome':
          goTo('certidao-confirm', CERTIDAO_CONFIRM_LINES);
          break;
        case 'registo-teru':
          goTo('registo-teru-confirm', REGISTO_TERU_CONFIRM_LINES);
          break;
      }
    }
  };

  // ---- Handle Call button ---------------------------------------------------
  const handleCall = () => {
    flash('CALL');
    if (isAnimating) return;

    if (screen.id === 'idle') {
      // Simulate dialing animation then show main menu
      if (animationRef.current) clearTimeout(animationRef.current);
      setScreen({
        id: 'dialing',
        lines: ['', '', '  A liga...', '  *244#', '', ''],
        input: '',
        inputMode: false,
        inputLabel: '',
      });
      animateLines(['', '', '  A liga...', '  *244#', '', '']);
      setTimeout(() => {
        goTo('main-menu', MAIN_MENU_LINES);
      }, 1400);
    }
  };

  // ---- Handle End button ----------------------------------------------------
  const handleEnd = () => {
    flash('END');
    if (animationRef.current) clearTimeout(animationRef.current);
    setIsAnimating(false);
    goTo('idle', IDLE_LINES);
  };

  // ---- Handle Backspace (navigation left or star key) -----------------------
  const handleBackspace = () => {
    if (screen.inputMode) {
      setScreen((s) => ({ ...s, input: s.input.slice(0, -1) }));
    }
  };

  // ---- Handle Star and Hash -------------------------------------------------
  const handleStar = () => {
    flash('*');
    // In input mode treat as backspace
    if (screen.inputMode) {
      handleBackspace();
    }
  };

  const handleHash = () => {
    flash('#');
    // Could be used to confirm in some flows; for now no-op or same as OK
    handleOk();
  };

  // ---- Handle navigation arrows ---------------------------------------------
  const handleUp = () => {
    flash('UP');
    if (screenRef.current) {
      screenRef.current.scrollTop -= 24;
    }
  };

  const handleDown = () => {
    flash('DOWN');
    if (screenRef.current) {
      screenRef.current.scrollTop += 24;
    }
  };

  const handleLeft = () => {
    flash('LEFT');
    handleBackspace();
  };

  const handleRight = () => {
    flash('RIGHT');
  };

  // ---- Build screen text with input -----------------------------------------
  const renderScreenContent = () => {
    const lines = [...displayedLines];

    if (screen.inputMode) {
      const cursor = cursorVisible ? '\u2588' : ' ';
      lines.push('');
      lines.push('> ' + screen.input + cursor);
      if (screen.input.length === 0) {
        lines.push('');
        lines.push('Primi OK ba konfirma');
      }
    }

    return lines;
  };

  // ---- Key style helper -----------------------------------------------------
  const keyClass = (key: string, extra = '') =>
    `select-none flex items-center justify-center rounded-md text-white font-bold
     transition-all duration-75 cursor-pointer
     ${keyPressed === key ? 'scale-90 brightness-75' : 'active:scale-90 active:brightness-75'}
     ${extra}`;

  // ---- Render ---------------------------------------------------------------
  return (
    <div className="flex items-center justify-center">
      {/* ===== Phone body ===== */}
      <div
        className="
          relative flex flex-col items-center
          w-[300px] min-h-[580px]
          bg-gradient-to-b from-gray-700 via-gray-800 to-gray-900
          rounded-[2.5rem] shadow-2xl
          border-2 border-gray-600
          pt-5 pb-6 px-4
        "
        style={{
          boxShadow:
            '0 25px 60px -12px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.08)',
        }}
      >
        {/* ---- Speaker grille ---- */}
        <div className="flex gap-[3px] mb-3">
          {Array.from({ length: 7 }).map((_, i) => (
            <div
              key={i}
              className="w-[3px] h-[3px] rounded-full bg-gray-600"
            />
          ))}
        </div>

        {/* ---- Brand ---- */}
        <div
          className="text-gray-400 text-sm tracking-[0.4em] font-semibold mb-3 uppercase"
          style={{ fontFamily: 'Arial, Helvetica, sans-serif' }}
        >
          NOKIA
        </div>

        {/* ===== Screen ===== */}
        <div
          className="
            w-full rounded-lg overflow-hidden mb-4
            border border-gray-900
          "
          style={{
            boxShadow:
              'inset 0 2px 8px rgba(0,0,0,0.5), inset 0 0 0 1px rgba(0,0,0,0.3)',
          }}
        >
          {/* Screen status bar */}
          <div
            className="flex items-center justify-between px-2 py-[3px]"
            style={{
              background: '#b0c890',
              fontFamily: '"Courier New", Courier, monospace',
            }}
          >
            <SignalBars />
            <span
              className="text-[9px] font-bold tracking-wider"
              style={{ color: '#2a3a1a' }}
            >
              GOV-GB
            </span>
            <BatteryIcon />
          </div>

          {/* Screen content */}
          <div
            ref={screenRef}
            className="overflow-y-auto px-3 py-2"
            style={{
              background:
                'linear-gradient(180deg, #c5d8a0 0%, #b8cc90 50%, #c0d498 100%)',
              fontFamily: '"Courier New", Courier, monospace',
              fontSize: '12px',
              lineHeight: '1.45',
              color: '#1a2a0a',
              height: '180px',
              imageRendering: 'pixelated',
            }}
          >
            {renderScreenContent().map((line, i) => (
              <div key={i} className="whitespace-pre min-h-[17px]">
                {line}
              </div>
            ))}
          </div>

          {/* Screen bottom bezel */}
          <div
            className="flex items-center justify-between px-3 py-[3px]"
            style={{
              background: '#b0c890',
              fontFamily: '"Courier New", Courier, monospace',
              fontSize: '9px',
              color: '#2a3a1a',
            }}
          >
            <span className="font-bold">
              {screen.inputMode ? 'Klaru' : 'Menu'}
            </span>
            <span className="font-bold">
              {screen.inputMode ? 'OK' : 'Nomi'}
            </span>
          </div>
        </div>

        {/* ===== Soft keys row ===== */}
        <div className="flex justify-between w-full px-2 mb-2">
          <button
            onClick={screen.inputMode ? handleBackspace : undefined}
            className={keyClass(
              'SOFT_L',
              'w-16 h-7 bg-gray-600 hover:bg-gray-500 text-[10px] rounded-full',
            )}
          >
            {screen.inputMode ? 'Klaru' : ''}
          </button>
          <button
            onClick={handleOk}
            className={keyClass(
              'SOFT_R',
              'w-16 h-7 bg-gray-600 hover:bg-gray-500 text-[10px] rounded-full',
            )}
          >
            {screen.inputMode ? 'OK' : ''}
          </button>
        </div>

        {/* ===== Navigation pad ===== */}
        <div className="relative w-[140px] h-[140px] mb-3">
          {/* Outer ring */}
          <div
            className="
              absolute inset-0 rounded-full
              bg-gradient-to-b from-gray-600 to-gray-700
              border-2 border-gray-500
            "
            style={{
              boxShadow:
                '0 2px 8px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.1)',
            }}
          />

          {/* Up */}
          <button
            onClick={handleUp}
            className="
              absolute top-[2px] left-1/2 -translate-x-1/2
              w-12 h-10 flex items-center justify-center
              text-gray-300 hover:text-white z-10
              rounded-t-full
              active:scale-95
            "
            aria-label="Up"
          >
            <svg width="14" height="8" viewBox="0 0 14 8" fill="currentColor">
              <path d="M7 0L14 8H0z" />
            </svg>
          </button>

          {/* Down */}
          <button
            onClick={handleDown}
            className="
              absolute bottom-[2px] left-1/2 -translate-x-1/2
              w-12 h-10 flex items-center justify-center
              text-gray-300 hover:text-white z-10
              rounded-b-full
              active:scale-95
            "
            aria-label="Down"
          >
            <svg width="14" height="8" viewBox="0 0 14 8" fill="currentColor">
              <path d="M7 8L0 0h14z" />
            </svg>
          </button>

          {/* Left */}
          <button
            onClick={handleLeft}
            className="
              absolute left-[2px] top-1/2 -translate-y-1/2
              w-10 h-12 flex items-center justify-center
              text-gray-300 hover:text-white z-10
              rounded-l-full
              active:scale-95
            "
            aria-label="Left"
          >
            <svg width="8" height="14" viewBox="0 0 8 14" fill="currentColor">
              <path d="M0 7L8 0v14z" />
            </svg>
          </button>

          {/* Right */}
          <button
            onClick={handleRight}
            className="
              absolute right-[2px] top-1/2 -translate-y-1/2
              w-10 h-12 flex items-center justify-center
              text-gray-300 hover:text-white z-10
              rounded-r-full
              active:scale-95
            "
            aria-label="Right"
          >
            <svg width="8" height="14" viewBox="0 0 8 14" fill="currentColor">
              <path d="M8 7L0 14V0z" />
            </svg>
          </button>

          {/* Center OK button */}
          <button
            onClick={handleOk}
            className="
              absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
              w-14 h-14 rounded-full z-20
              bg-gradient-to-b from-gray-500 to-gray-600
              border-2 border-gray-400
              flex items-center justify-center
              text-white text-xs font-bold tracking-wider
              hover:from-gray-400 hover:to-gray-500
              active:scale-95 active:from-gray-600 active:to-gray-700
              transition-all duration-75
            "
            style={{
              boxShadow:
                '0 2px 6px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.15)',
            }}
          >
            OK
          </button>
        </div>

        {/* ===== Call / End buttons ===== */}
        <div className="flex justify-between w-full px-6 mb-3">
          <button
            onClick={handleCall}
            className={keyClass(
              'CALL',
              'w-14 h-10 bg-green-700 hover:bg-green-600 rounded-full shadow-md',
            )}
            aria-label="Call"
          >
            <Phone className="w-4 h-4" />
          </button>
          <button
            onClick={handleEnd}
            className={keyClass(
              'END',
              'w-14 h-10 bg-red-700 hover:bg-red-600 rounded-full shadow-md',
            )}
            aria-label="End call"
          >
            <PhoneOff className="w-4 h-4" />
          </button>
        </div>

        {/* ===== Numeric keypad ===== */}
        <div className="grid grid-cols-3 gap-[6px] w-full px-3">
          {[
            { label: '1', sub: '' },
            { label: '2', sub: 'ABC' },
            { label: '3', sub: 'DEF' },
            { label: '4', sub: 'GHI' },
            { label: '5', sub: 'JKL' },
            { label: '6', sub: 'MNO' },
            { label: '7', sub: 'PQRS' },
            { label: '8', sub: 'TUV' },
            { label: '9', sub: 'WXYZ' },
            { label: '*', sub: '' },
            { label: '0', sub: '+' },
            { label: '#', sub: '' },
          ].map(({ label, sub }) => (
            <button
              key={label}
              onClick={() => {
                if (label === '*') handleStar();
                else if (label === '#') handleHash();
                else handleDigit(label);
              }}
              className={keyClass(
                label,
                `
                  h-11
                  bg-gradient-to-b from-gray-600 to-gray-700
                  hover:from-gray-500 hover:to-gray-600
                  border border-gray-500
                  rounded-lg
                  shadow-sm
                `,
              )}
              style={{
                boxShadow:
                  '0 2px 3px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.08)',
              }}
            >
              <div className="flex flex-col items-center leading-none">
                <span className="text-[16px]">{label}</span>
                {sub && (
                  <span className="text-[7px] text-gray-400 mt-[1px] tracking-wider">
                    {sub}
                  </span>
                )}
              </div>
            </button>
          ))}
        </div>

        {/* ---- Bottom microphone grille ---- */}
        <div className="flex gap-[3px] mt-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="w-[3px] h-[3px] rounded-full bg-gray-600"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
