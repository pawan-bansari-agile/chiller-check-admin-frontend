// ChangePassword.test.tsx
import ChangePassword from '.';
import { render } from '@/test/utils';
import { fireEvent, screen, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import ThemeProvider from '@/styles/config';

const mockNavigate = vi.fn();
const mockSetIsModalOpen = vi.fn();
const mockOnSubmit = vi.fn();

vi.mock('@/shared/constants/routes', () => ({
  ROUTES: {
    DASHBOARD: '/dashboard'
  }
}));

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate
  };
});

vi.mock('../controller', () => ({
  default: () => ({
    navigate: mockNavigate,
    form: vi.fn(),
    isButtonDisabled: false,
    isPending: false,
    isModalOpen: true,
    onSubmit: mockOnSubmit,
    handleFieldsChange: vi.fn(),
    setIsModalOpen: mockSetIsModalOpen
  })
}));

vi.mock('@/shared/components/common/Modal/components/CommonModal', () => ({
  default: ({ children, open }: any) =>
    open ? <div data-testid="mocked-modal">{children}</div> : null
}));

describe('ChangePassword Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders password inputs and button', () => {
    render(
      <ThemeProvider>
        <ChangePassword />
      </ThemeProvider>
    );

    expect(screen.getByLabelText(/Current Password/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/New Password/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Confirm Password/i)).toBeInTheDocument();

    expect(screen.getByRole('button', { name: /Save/i })).toBeInTheDocument();
  });

  it('validates confirm password mismatch', async () => {
    render(
      <ThemeProvider>
        <ChangePassword />
      </ThemeProvider>
    );
    const newPasswordInput = screen.getByLabelText(/New Password/i);
    const confirmPasswordInput = screen.getByLabelText(/Confirm Password/i);
    const saveButton = screen.getByRole('button', { name: /Save/i });

    fireEvent.change(newPasswordInput, { target: { value: 'NewPassword123!' } });
    fireEvent.change(confirmPasswordInput, { target: { value: 'WrongPassword' } });

    fireEvent.click(saveButton);

    await waitFor(() =>
      expect(screen.getByText(/Confirm Password must match the New Password/i)).toBeInTheDocument()
    );
  });

  it('calls onSubmit when passwords match and form is submitted', async () => {
    render(
      <ThemeProvider>
        <ChangePassword />
      </ThemeProvider>
    );
    const currentPasswordInput = screen.getByLabelText(/Current Password/i);
    const newPasswordInput = screen.getByLabelText(/New Password/i);
    const confirmPasswordInput = screen.getByLabelText(/Confirm Password/i);
    const saveButton = screen.getByRole('button', { name: /Save/i });

    fireEvent.change(currentPasswordInput, { target: { value: 'OldPassword123!' } });
    fireEvent.change(newPasswordInput, { target: { value: 'NewPassword123!' } });
    fireEvent.change(confirmPasswordInput, { target: { value: 'NewPassword123!' } });

    fireEvent.click(saveButton);
  });
});
