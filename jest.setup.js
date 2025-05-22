require('@testing-library/jest-dom');

// Mock ResizeObserver for Recharts and other components
class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}
if (typeof window !== 'undefined') {
  window.ResizeObserver = ResizeObserver;
  global.ResizeObserver = ResizeObserver;
} else {
  global.ResizeObserver = ResizeObserver;
} 