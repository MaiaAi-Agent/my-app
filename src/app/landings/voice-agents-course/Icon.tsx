import type { IconName } from "./content";

const PATHS: Record<IconName, string> = {
  laptop: "M4 6h16v10H4zM2 19h20",
  chart: "M4 20V10M10 20V4M16 20v-7M22 20H2",
  store: "M3 9l2-5h14l2 5M3 9h18v11H3zM9 20v-6h6v6",
  wave: "M3 12h2M7 8v8M11 5v14M15 8v8M19 10v4M21 12h0",
  gear: "M12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6zM12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M4.9 19.1L7 17M17 7l2.1-2.1",
  coins:
    "M9 7c3.9 0 7-1.3 7-3S12.9 1 9 1 2 2.3 2 4s3.1 3 7 3zM2 4v5c0 1.7 3.1 3 7 3M2 9v5c0 1.7 3.1 3 7 3M15 11c3.9 0 7 1.3 7 3s-3.1 3-7 3-7-1.3-7-3 3.1-3 7-3zM8 14v5c0 1.7 3.1 3 7 3s7-1.3 7-3v-5",
  flag: "M5 21V4M5 4h11l-2 4 2 4H5",
  target:
    "M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10zM12 11a1 1 0 1 0 0 2 1 1 0 0 0 0-2z",
  arrow: "M5 12h14M13 6l6 6-6 6",
  check: "M5 12.5l4.5 4.5L19 7",
};

export default function Icon({
  name,
  className,
}: {
  name: IconName;
  className?: string;
}) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      width="24"
      height="24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={PATHS[name]} />
    </svg>
  );
}
