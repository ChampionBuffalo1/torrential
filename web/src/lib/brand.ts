import { useSyncExternalStore } from "react";
import { branding } from "../api";

const DEFAULT = "torrential";

let name = DEFAULT;
let page: string | null = null;
const listeners = new Set<() => void>();

/** Names the browser tab after `current`, followed by the app's name. */
export function setTitle(current: string | null): void {
  page = current;
  document.title = page ? `${page} · ${name}` : name;
}

export function useBrandName(): string {
  return useSyncExternalStore(
    (changed) => {
      listeners.add(changed);
      return () => listeners.delete(changed);
    },
    () => name,
  );
}

export function loadBrand(): void {
  branding().then(
    (brand) => {
      name = brand.name || DEFAULT;
      if (brand.favicon) document.querySelector<HTMLLinkElement>('link[rel="icon"]')!.href = brand.favicon;
      setTitle(page);
      listeners.forEach((changed) => changed());
    },
    () => {},
  );
}
