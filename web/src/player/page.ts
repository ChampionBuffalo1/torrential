import { useEffect } from "react";
import { setTitle } from "../lib/brand";
import { leaveOnBack } from "./keys";

/** What every player page does: names the browser tab after what plays, and goes back on Esc until the video plays. */
export function usePlayerPage(name: string | null, ready: boolean, back: () => void): void {
  useEffect(() => {
    setTitle(name);
    return () => setTitle(null);
  }, [name]);
  useEffect(() => {
    if (ready) return;
    const pressed = leaveOnBack(back);
    addEventListener("keydown", pressed);
    return () => removeEventListener("keydown", pressed);
  }, [ready, back]);
}
