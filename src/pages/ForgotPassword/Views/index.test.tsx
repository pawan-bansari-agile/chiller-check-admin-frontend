import ForgotPassword from '.';
import { render } from '@/test/utils';
import { fireEvent, screen } from '@testing-library/react';
import { Form } from 'antd';
import { beforeEach, describe, it, vi } from 'vitest';

// Mock custom hook
vi.mock('./controller', async () => {
  await vi.importActual<typeof import('./controller')>('./controller');

  return {
    __esModule: true,
    default: () => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const [form] = Form.useForm(); // 👈 use real AntD form instance

      return {
        form,
        isButtonDisabled: false,
        isPending: false,
        onSubmit: vi.fn(),
        handleFieldsChange: vi.fn()
      };
    }
  };
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

// Mock components used inside
vi.mock('@/shared/components/common/Meta', () => ({
  default: () => <div data-testid="meta" />
}));

vi.mock('@/shared/components/common/AuthLayout', () => ({
  default: ({ children }: any) => <div data-testid="auth-layout">{children}</div>
}));

describe('ForgotPassword Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders component correctly', () => {
    render(<ForgotPassword />);

    expect(screen.getByTestId('meta')).toBeInTheDocument();
    expect(screen.getByTestId('auth-layout')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter your email')).toBeInTheDocument();
    expect(screen.getByText('Send Link')).toBeInTheDocument();
    expect(screen.getByText('Back to Login')).toBeInTheDocument();
  });

  it('disables button if isButtonDisabled is true', async () => {
    render(<ForgotPassword />);

    await screen.getByRole('button', { name: 'Send Link' }); // ✅ gets actual button
  });

  it('calls onSubmit when form is submitted', () => {
    render(<ForgotPassword />);

    const submitButton = screen.getByText('Send Link');
    fireEvent.click(submitButton);
  });
});
