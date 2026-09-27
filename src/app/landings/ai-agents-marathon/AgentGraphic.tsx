/** Decorative hero illustration: an agent wired to three tools. */
export default function AgentGraphic({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 360 280"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <radialGradient id="mg-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0" stopColor="#e4ff3a" stopOpacity="0.28" />
          <stop offset="1" stopColor="#e4ff3a" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="mg-face" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#2a2f31" />
          <stop offset="1" stopColor="#101314" />
        </linearGradient>
      </defs>

      <circle cx="150" cy="140" r="140" fill="url(#mg-glow)" />

      {/* wires */}
      <g stroke="#e4ff3a" strokeWidth="4" strokeLinecap="round" opacity="0.9">
        <path d="M168 120 H200 Q212 120 212 108 V70 Q212 58 224 58 H244" />
        <path d="M168 140 H244" />
        <path d="M168 160 H200 Q212 160 212 172 V210 Q212 222 224 222 H244" />
      </g>

      {/* agent */}
      <rect
        x="62"
        y="84"
        width="112"
        height="112"
        rx="26"
        fill="#e4ff3a"
        opacity="0.18"
      />
      <rect
        x="70"
        y="92"
        width="96"
        height="96"
        rx="22"
        fill="url(#mg-face)"
        stroke="#3a4144"
        strokeWidth="2"
      />
      <rect x="96" y="122" width="12" height="28" rx="6" fill="#e4ff3a" />
      <rect x="128" y="122" width="12" height="28" rx="6" fill="#e4ff3a" />

      {/* tools */}
      {[58, 140, 222].map((y) => (
        <rect
          key={y}
          x="244"
          y={y - 26}
          width="68"
          height="52"
          rx="12"
          fill="#15191a"
          stroke="#3a4144"
          strokeWidth="2"
        />
      ))}
      <g
        stroke="#f4f5f0"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* document */}
        <path d="M270 44h12l6 6v20h-18z M276 56h8 M276 62h8" />
        {/* gear */}
        <circle cx="278" cy="140" r="6" />
        <path d="M278 126v4M278 150v4M264 140h4M288 140h4M268 130l3 3M285 147l3 3M268 150l3-3M285 133l3-3" />
        {/* chart */}
        <path d="M268 234v-8M278 234v-16M288 234v-24" strokeWidth="5" />
      </g>
    </svg>
  );
}
