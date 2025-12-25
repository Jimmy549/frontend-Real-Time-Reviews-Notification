// Simple event-based loading service
const listeners = new Set();
let counter = 0;
let text = '';

export const loadingService = {
  start: (t = '') => {
    counter += 1;
    text = t;
    listeners.forEach(fn => fn({ isLoading: true, text }));
  },
  stop: () => {
    if (counter > 0) counter -= 1;
    if (counter === 0) text = '';
    listeners.forEach(fn => fn({ isLoading: counter > 0, text }));
  },
  subscribe: (fn) => {
    listeners.add(fn);
    // send current state
    fn({ isLoading: counter > 0, text });
    return () => listeners.delete(fn);
  }
};

export default loadingService;
