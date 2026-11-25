import { useSyncExternalStore } from "react";

const KEY = "torrential:incognito";
const listeners = new Set<() => void>();

function stored(): boolean {
  try {
    return localStorage.getItem(KEY) === "1";
  } catch {
    return false;
  }
}

let on = stored();

function changed(): void {
  listeners.forEach((listener) => listener());
}

addEventListener("storage", (event) => {
  if (event.key !== KEY) return;
  on = stored();
  changed();
});

/** While on, nothing this browser plays is kept in the watch history. */
export function isIncognito(): boolean {
  return on;
}

export function setIncognito(value: boolean): void {
  on = value;
  try {
    if (value) localStorage.setItem(KEY, "1");
    else localStorage.removeItem(KEY);
  } catch {
    // Without storage it lasts until the page reloads.
  }
  changed();
}

export function useIncognito(): boolean {
  return useSyncExternalStore(
    (listener) => {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
    () => on,
  );
}
