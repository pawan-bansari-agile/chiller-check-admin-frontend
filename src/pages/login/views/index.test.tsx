import Login from '.';
import { render } from '@/test/utils';
import { fireEvent, screen } from '@testing-library/react';
import { beforeEach, describe, it, vi } from 'vitest';

import ThemeProvider from '@/styles/config';

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

describe('Login Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders login form with all fields and button', () => {
    render(
      <ThemeProvider>
        <Login />
      </ThemeProvider>
    );

    expect(screen.getByLabelText(/Enter Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Enter Password/i)).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(screen.getByText(/Forgot Password\?/i)).toBeInTheDocument();
  });

  it('submits the form', async () => {
    render(
      <ThemeProvider>
        <Login />
      </ThemeProvider>
    );

    fireEvent.change(screen.getByLabelText(/Enter Email/i), {
      target: { value: 'test@example.com' }
    });

    fireEvent.change(screen.getByLabelText(/Enter Password/i), {
      target: { value: 'password123' }
    });

    fireEvent.click(screen.getByRole('button'));
  });
});
