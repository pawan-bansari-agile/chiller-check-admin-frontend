import { BrowserRouter } from 'react-router-dom';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { cleanup, render } from '@testing-library/react';
import { afterEach, vi } from 'vitest';

afterEach(() => {
  cleanup();
});

beforeAll(async () => {
  vi.mock('dayjs', async () => ({ extends: vi.fn() }));
  vi.mock('dayjs/plugin/utc');
  vi.mock('dayjs/plugin/relativeTime');
  vi.mock('dayjs/plugin/calendar');
  vi.mock('@ckeditor/ckeditor5-watchdog');
});

beforeAll(async () => {
  vi.mock('dayjs', async () => {
    const actual = await vi.importActual('dayjs');
    return actual;
  });
  vi.mock('dayjs/plugin/utc', async () => {
    const actual = await vi.importActual('dayjs/plugin/utc');
    return actual;
  });
  vi.mock('dayjs/plugin/relativeTime', async () => {
    const actual = await vi.importActual('dayjs/plugin/relativeTime');
    return actual;
  });
  vi.mock('dayjs/plugin/calendar', async () => {
    const actual = await vi.importActual('dayjs/plugin/calendar');
    return actual;
  });
  vi.mock('@ckeditor/ckeditor5-watchdog', async () => {
    const actual = await vi.importActual('@ckeditor/ckeditor5-watchdog');
    return actual;
  });
  vi.mock('@ckeditor/ckeditor5-react', () => ({
    CKEditor: () => null
  }));

  // Mock the CKEditor build
  vi.mock('@ckeditor/ckeditor5-build-classic', () => ({
    default: {}
  }));

  // 🚨 Critical: mock the watchdog module too
  vi.mock('@ckeditor/ckeditor5-watchdog', () => ({
    default: {}
  }));
});

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      notifyOnChangeProps: 'all'
    }
  }
});

function customRender(ui: React.ReactElement, options = {}) {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: vi.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn()
    }))
  });

  return render(ui, {
    // wrap provider(s) here if needed
    wrapper: ({ children }) => (
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>{children}</BrowserRouter>
      </QueryClientProvider>
    ),
    ...options
  });
}

// override render export
export { customRender as render };
