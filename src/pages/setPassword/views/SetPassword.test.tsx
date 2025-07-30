import SetPassword from '.';
import { render } from '@/test/utils';
import { screen, waitFor } from '@testing-library/react';
import { vi } from 'vitest';

// Mock the controller
vi.mock('../controller', () => ({
  __esModule: true,
  default: () => ({
    form: { getFieldsValue: vi.fn(), getFieldsError: vi.fn() },
    onSubmit: vi.fn(),
    handleFieldsChange: vi.fn(),
    isPending: false,
    isButtonDisabled: true,
    passwordValue: '',
    confirmPasswordValue: '',
    isPasswordValid: () => false
  })
}));

// Mock subcomponents and constants
vi.mock('@/shared/components/common/AuthLayout', () => ({
  default: ({ children }: { children: React.ReactNode }) => <div>{children}</div>
}));

vi.mock('@/shared/components/common/FormField', () => ({
  RenderPasswordInput: ({ formItemProps }: any) => (
    <input data-testid={`password-input-${formItemProps?.name}`} name={formItemProps?.name} />
  ),
  RenderCheckboxInput: ({ formItemProps }: any) => (
    <input data-testid={`checkbox-input-${formItemProps?.name}`} name={formItemProps?.name} />
  )
}));

vi.mock('@/shared/constants/routes', () => ({
  ROUTES: {
    LOGIN: '/login'
  }
}));

vi.mock('@/shared/components/common/Meta', () => ({
  default: () => null
}));

describe('SetPassword Component', () => {
  it('renders disabled button when isButtonDisabled is true', () => {
    render(<SetPassword />);

    const button = screen.getByRole('button', { name: 'Set Password' });
    expect(button).toBeDisabled();
  });

  it('enables button when isButtonDisabled is false', async () => {
    render(<SetPassword />);

    const button = screen.getByText('Set Password');

    // Wait for form validation to settle
    await waitFor(() => {
      expect(button).toBeEnabled();
    });
  });

  it('shows password requirement description when password is invalid', () => {
    render(<SetPassword />);

    const desc = screen.getByText(
      /Minimum 8 up to 64 characters including an upper case, a numeric and a special character/
    );

    expect(desc).toHaveClass('rest-description');
  });

  it('shows mismatch message when passwords do not match', () => {
    render(<SetPassword />);

    const mismatch = screen.getByText(
      /Should be exactly same as the password you just entered above/
    );

    expect(mismatch).toHaveClass('rest-description');
  });

  it('renders Back to Login link', () => {
    render(<SetPassword />);

    const link = screen.getByRole('link', { name: 'Back to Login' });
    expect(link).toHaveAttribute('href', '/login');
  });
});
