import { setIncognito, useIncognito } from "../lib/incognito";

function IncognitoIcon({ filled }: { filled: boolean }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-5.5 shrink-0"
    >
      <path d="M3 11h18" />
      <path d="M6.5 11 8 5.5c.2-.6.8-.9 1.4-.7L12 5.6l2.6-.8c.6-.2 1.2.1 1.4.7L17.5 11Z" fill={filled ? "currentColor" : "none"} />
      <circle cx="7.5" cy="16.5" r="2.75" />
      <circle cx="16.5" cy="16.5" r="2.75" />
      <path d="M10.25 16.5c1.1-.8 2.4-.8 3.5 0" />
    </svg>
  );
}

export function IncognitoButton() {
  const on = useIncognito();
  return (
    <button
      type="button"
      aria-pressed={on}
      aria-label={on ? "Turn off incognito" : "Turn on incognito"}
      title={on ? "Incognito is on: nothing you watch is kept" : "Incognito: don't keep what you watch"}
      onClick={() => setIncognito(!on)}
      className={`grid size-9 cursor-pointer place-items-center rounded-lg hover:bg-white/5 pointer-coarse:size-11 ${on ? "text-incognito" : "text-soft hover:text-ink"}`}
    >
      <IncognitoIcon filled={on} />
    </button>
  );
}
