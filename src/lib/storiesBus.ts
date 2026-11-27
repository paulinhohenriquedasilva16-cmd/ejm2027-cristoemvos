// Lets the hero open the Stories viewer even before the lazy gallery chunk has mounted.
const EVENT = "ejm-open-stories";
let pending = false;

export function requestOpenStories(): void {
  pending = true;
  window.dispatchEvent(new Event(EVENT));
}

export function consumePendingStories(): boolean {
  const was = pending;
  pending = false;
  return was;
}

export function onOpenStories(handler: () => void): () => void {
  const wrapped = () => {
    pending = false;
    handler();
  };
  window.addEventListener(EVENT, wrapped);
  return () => window.removeEventListener(EVENT, wrapped);
}
