// Простые line-art иконки (без внешних зависимостей).
// stroke = currentColor, поэтому цвет задаётся через CSS (color: ...)

const common = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  viewBox: "0 0 24 24",
};

export function WaveSignature(props) {
  return (
    <svg viewBox="0 0 64 16" {...props}>
      <path
        d="M1 8c4-7 8-7 12 0s8 7 12 0 8-7 12 0 8 7 12 0 8-7 14 0"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function UserIcon(props) {
  return (
    <svg {...common} {...props}>
      <circle cx="12" cy="8" r="3.4" />
      <path d="M5 19c1.2-3.2 4-4.8 7-4.8s5.8 1.6 7 4.8" />
    </svg>
  );
}

export function MessageIcon(props) {
  return (
    <svg {...common} {...props}>
      <path d="M4 5.5h16v10H9.5L5 19v-3.5H4z" />
    </svg>
  );
}

export function MegaphoneIcon(props) {
  return (
    <svg {...common} {...props}>
      <path d="M3 11v2a2 2 0 0 0 2 2h1l1.4 4.2a1 1 0 0 0 1.9-.6L8.6 15H10l8 4V5l-8 4H5a2 2 0 0 0-2 2Z" />
    </svg>
  );
}

export function MapPinIcon(props) {
  return (
    <svg {...common} {...props}>
      <path d="M12 21s7-6.6 7-11.5A7 7 0 0 0 5 9.5C5 14.4 12 21 12 21Z" />
      <circle cx="12" cy="9.5" r="2.2" />
    </svg>
  );
}

export function FeatherIcon(props) {
  return (
    <svg {...common} {...props}>
      <path d="M20 4c-7 0-13 5-13 13v3h3c8 0 13-6 13-13V4Z" />
      <path d="M11 20 20 4" />
    </svg>
  );
}

export function CompassIcon(props) {
  return (
    <svg {...common} {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M15 9l-3.5 3-1 4 4-1 1-4z" />
    </svg>
  );
}

export function SparkleIcon(props) {
  return (
    <svg {...common} {...props}>
      <path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M18 6l-2.5 2.5M8.5 15.5 6 18" />
    </svg>
  );
}

export function SendIcon(props) {
  return (
    <svg {...common} {...props}>
      <path d="M21 3 3 10.5l7 2.5 2 7L21 3Z" />
      <path d="M10.5 13 21 3" />
    </svg>
  );
}

export function ArrowLeftIcon(props) {
  return (
    <svg {...common} {...props}>
      <path d="M19 12H5" />
      <path d="M11 18l-6-6 6-6" />
    </svg>
  );
}

export function BookIcon(props) {
  return (
    <svg {...common} {...props}>
      <path d="M12 6.5c-1.6-1.2-4-1.5-6.5-1V17c2.5-.5 4.9-.2 6.5 1 1.6-1.2 4-1.5 6.5-1V5.5c-2.5-.5-4.9-.2-6.5 1Z" />
      <path d="M12 6.5V18" />
    </svg>
  );
}
