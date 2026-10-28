import { useSyncExternalStore } from 'react';

const listeners = new Set<() => void>();
let mediaQuery: MediaQueryList | undefined;

function getMediaQuery(): MediaQueryList {
  mediaQuery ??= window.matchMedia('(max-width: 760px), (pointer: coarse)');
  return mediaQuery;
}

function notifyListeners() {
  listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  const query = getMediaQuery();
  if (listeners.size === 1) query.addEventListener('change', notifyListeners);

  return () => {
    listeners.delete(listener);
    if (listeners.size === 0) query.removeEventListener('change', notifyListeners);
  };
}

function getSnapshot() {
  return getMediaQuery().matches;
}

export function useIsCompactViewport(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, () => false);
}
