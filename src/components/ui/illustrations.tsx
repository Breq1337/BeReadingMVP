// Custom premium SVG illustrations for BeReading
// Hand-crafted, not generic — literary + warm aesthetic

export function BookStackIllustration({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 200" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      {/* Book stack */}
      <rect x="40" y="120" width="120" height="20" rx="3" fill="oklch(0.75 0.12 55)" opacity="0.9" />
      <rect x="35" y="100" width="130" height="20" rx="3" fill="oklch(0.25 0.04 260)" opacity="0.9" />
      <rect x="45" y="80" width="110" height="20" rx="3" fill="oklch(0.78 0.14 75)" opacity="0.8" />
      <rect x="38" y="60" width="124" height="20" rx="3" fill="oklch(0.65 0.17 155)" opacity="0.8" />
      {/* Open book on top */}
      <path d="M65 55 Q100 45 100 55 L100 30 Q100 20 65 30 Z" fill="oklch(0.985 0.005 80)" stroke="oklch(0.25 0.04 260)" strokeWidth="1.5" />
      <path d="M135 55 Q100 45 100 55 L100 30 Q100 20 135 30 Z" fill="oklch(0.985 0.005 80)" stroke="oklch(0.25 0.04 260)" strokeWidth="1.5" />
      {/* Page lines */}
      <line x1="75" y1="38" x2="95" y2="35" stroke="oklch(0.75 0.12 55)" strokeWidth="1" opacity="0.5" />
      <line x1="75" y1="44" x2="95" y2="41" stroke="oklch(0.75 0.12 55)" strokeWidth="1" opacity="0.5" />
      <line x1="105" y1="35" x2="125" y2="38" stroke="oklch(0.75 0.12 55)" strokeWidth="1" opacity="0.5" />
      <line x1="105" y1="41" x2="125" y2="44" stroke="oklch(0.75 0.12 55)" strokeWidth="1" opacity="0.5" />
      {/* Sparkles */}
      <circle cx="150" cy="40" r="3" fill="oklch(0.78 0.14 75)" opacity="0.7" />
      <circle cx="160" cy="55" r="2" fill="oklch(0.75 0.12 55)" opacity="0.5" />
      <circle cx="45" cy="45" r="2.5" fill="oklch(0.78 0.14 75)" opacity="0.6" />
    </svg>
  );
}

export function ReadingPersonIllustration({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 200" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      {/* Person silhouette reading */}
      <circle cx="100" cy="60" r="20" fill="oklch(0.25 0.04 260)" opacity="0.15" />
      <path d="M75 85 Q75 75 100 75 Q125 75 125 85 L130 140 Q130 150 100 150 Q70 150 70 140 Z" fill="oklch(0.25 0.04 260)" opacity="0.1" />
      {/* Book in hands */}
      <rect x="78" y="100" width="44" height="30" rx="3" fill="oklch(0.75 0.12 55)" opacity="0.8" />
      <line x1="100" y1="103" x2="100" y2="127" stroke="oklch(0.985 0.005 80)" strokeWidth="1" />
      {/* Floating elements */}
      <circle cx="145" cy="50" r="4" fill="oklch(0.78 0.14 75)" opacity="0.6" />
      <circle cx="55" cy="55" r="3" fill="oklch(0.65 0.17 155)" opacity="0.5" />
      <circle cx="150" cy="80" r="2.5" fill="oklch(0.75 0.12 55)" opacity="0.4" />
      {/* Stars */}
      <path d="M160 35 l2 5 5 0 -4 3 2 5 -5-3 -5 3 2-5 -4-3 5 0z" fill="oklch(0.78 0.14 75)" opacity="0.5" />
      <path d="M42 70 l1.5 3.5 3.5 0 -3 2.5 1.5 3.5 -3.5-2.5 -3.5 2.5 1.5-3.5 -3-2.5 3.5 0z" fill="oklch(0.75 0.12 55)" opacity="0.4" />
    </svg>
  );
}

export function GrowthChartIllustration({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 160" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      {/* Chart bars */}
      <rect x="30" y="100" width="20" height="40" rx="4" fill="oklch(0.75 0.12 55)" opacity="0.4" />
      <rect x="60" y="80" width="20" height="60" rx="4" fill="oklch(0.75 0.12 55)" opacity="0.55" />
      <rect x="90" y="55" width="20" height="85" rx="4" fill="oklch(0.75 0.12 55)" opacity="0.7" />
      <rect x="120" y="35" width="20" height="105" rx="4" fill="oklch(0.78 0.14 75)" opacity="0.85" />
      <rect x="150" y="15" width="20" height="125" rx="4" fill="oklch(0.65 0.17 155)" opacity="0.9" />
      {/* Trend line */}
      <path d="M40 95 L70 75 L100 50 L130 30 L160 10" stroke="oklch(0.25 0.04 260)" strokeWidth="2" strokeDasharray="4 4" opacity="0.3" />
      {/* Star at peak */}
      <circle cx="160" cy="10" r="5" fill="oklch(0.78 0.14 75)" opacity="0.8" />
    </svg>
  );
}

export function ConnectionIllustration({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 160" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      {/* Three connected circles — teacher, student, family */}
      <circle cx="100" cy="45" r="22" fill="oklch(0.25 0.04 260)" opacity="0.12" />
      <circle cx="60" cy="110" r="22" fill="oklch(0.75 0.12 55)" opacity="0.15" />
      <circle cx="140" cy="110" r="22" fill="oklch(0.65 0.17 155)" opacity="0.12" />
      {/* Connection lines */}
      <line x1="90" y1="63" x2="70" y2="92" stroke="oklch(0.75 0.12 55)" strokeWidth="1.5" opacity="0.3" />
      <line x1="110" y1="63" x2="130" y2="92" stroke="oklch(0.65 0.17 155)" strokeWidth="1.5" opacity="0.3" />
      <line x1="80" y1="110" x2="120" y2="110" stroke="oklch(0.78 0.14 75)" strokeWidth="1.5" opacity="0.3" />
      {/* Icons inside */}
      <text x="94" y="50" fontSize="16" textAnchor="middle">📚</text>
      <text x="54" y="115" fontSize="16" textAnchor="middle">👨‍🏫</text>
      <text x="134" y="115" fontSize="16" textAnchor="middle">👨‍👩‍👧</text>
      {/* Center heart */}
      <circle cx="100" cy="85" r="8" fill="oklch(0.75 0.12 55)" opacity="0.2" />
      <text x="96" y="89" fontSize="10">❤️</text>
    </svg>
  );
}
