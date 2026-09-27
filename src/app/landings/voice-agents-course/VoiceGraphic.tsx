/** Decorative hero illustration: a mic node emitting a voice waveform into an agent. */
const BARS = [18, 34, 56, 40, 72, 96, 64, 44, 84, 58, 30, 48, 22];

export default function VoiceGraphic({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 360 280"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <radialGradient id="vg-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0" stopColor="#f7a91c" stopOpacity="0.3" />
          <stop offset="1" stopColor="#f7a91c" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="vg-bar" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0" stopColor="#f7a91c" />
          <stop offset="1" stopColor="#ffcf3f" />
        </linearGradient>
        <linearGradient id="vg-face" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#2c2a27" />
          <stop offset="1" stopColor="#121212" />
        </linearGradient>
      </defs>

      <circle cx="180" cy="140" r="150" fill="url(#vg-glow)" />

      {/* mic node */}
      <rect
        x="14"
        y="104"
        width="72"
        height="72"
        rx="18"
        fill="url(#vg-face)"
        stroke="#3a3733"
        strokeWidth="2"
      />
      <g
        stroke="#ffcf3f"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="42" y="120" width="16" height="26" rx="8" />
        <path d="M34 140a16 16 0 0 0 32 0M50 156v8" />
      </g>

      {/* waveform */}
      {BARS.map((h, i) => (
        <rect
          // biome-ignore lint/suspicious/noArrayIndexKey: static decorative list
          key={i}
          x={104 + i * 12}
          y={140 - h / 2}
          width="6"
          height={h}
          rx="3"
          fill="url(#vg-bar)"
          opacity={0.55 + (h / 96) * 0.45}
        />
      ))}

      {/* agent */}
      <rect
        x="266"
        y="92"
        width="88"
        height="96"
        rx="22"
        fill="#f7a91c"
        opacity="0.18"
      />
      <rect
        x="274"
        y="100"
        width="72"
        height="80"
        rx="18"
        fill="url(#vg-face)"
        stroke="#3a3733"
        strokeWidth="2"
      />
      <rect x="292" y="126" width="10" height="24" rx="5" fill="#ffcf3f" />
      <rect x="318" y="126" width="10" height="24" rx="5" fill="#ffcf3f" />
    </svg>
  );
}
