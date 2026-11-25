import { useSyncExternalStore } from "react";
import { branding } from "../api";

const DEFAULT = "torrential";

let brand: { name: string; icon: string | null } = { name: DEFAULT, icon: null };
let page: string | null = null;
const listeners = new Set<() => void>();

/** Names the browser tab after `current`, followed by the app's name. */
export function setTitle(current: string | null): void {
  page = current;
  document.title = page ? `${page} · ${brand.name}` : brand.name;
}

export function useBrand(): typeof brand {
  return useSyncExternalStore(
    (changed) => {
      listeners.add(changed);
      return () => listeners.delete(changed);
    },
    () => brand,
  );
}

export function loadBrand(): void {
  branding().then(
    (loaded) => {
      brand = { name: loaded.name || DEFAULT, icon: loaded.icon };
      if (loaded.favicon) document.querySelector<HTMLLinkElement>('link[rel="icon"]')!.href = loaded.favicon;
      setTitle(page);
      listeners.forEach((changed) => changed());
    },
    () => {},
  );
}
