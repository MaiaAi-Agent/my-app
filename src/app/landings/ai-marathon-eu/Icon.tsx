import type { IconName } from "./content";

const PATHS: Record<IconName | "arrow", string> = {
  code: "M8 8l-4 4 4 4M16 8l4 4-4 4M13.5 5l-3 14",
  chart: "M4 20V10M10 20V4M16 20v-7M22 20H2",
  briefcase: "M3 8h18v11H3zM9 8V5h6v3M3 13h18",
  check: "M5 12.5l4.5 4.5L19 7",
  clock: "M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM12 7v5l3 2",
  bolt: "M13 2L4 14h7l-1 8 9-12h-7z",
  close: "M6 6l12 12M18 6L6 18",
  arrow: "M5 12h14M13 6l6 6-6 6",
};

export default function Icon({
  name,
  className,
}: {
  name: keyof typeof PATHS;
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
