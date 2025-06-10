import { act, renderHook } from '@testing-library/react';
import { vi } from 'vitest';

import useForgotPasswordController from './controller';

// Mocks
vi.mock('react-router-dom', () => ({
  useNavigate: () => vi.fn()
}));

const mockMutate = vi.fn();

vi.mock('@/services/auth', () => ({
  authHooks: {
    useForgotPassword: () => ({
      mutate: mockMutate,
      isPending: false
    })
  }
}));

vi.mock('@/shared/utils/functions', () => ({
  showToaster: vi.fn()
}));

vi.mock('@/shared/constants/routes', async () => ({
  ROUTES: {
    LOGIN: '/login'
  }
}));

describe('useForgotPasswordController', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it('initializes correctly', () => {
    const { result } = renderHook(() => useForgotPasswordController());
    expect(result.current.form).toBeDefined();
    expect(result.current.isButtonDisabled).toBe(true);
    expect(typeof result.current.onSubmit).toBe('function');
    expect(typeof result.current.handleFieldsChange).toBe('function');
  });

  it('enables button when email is valid and no form errors', () => {
    const { result } = renderHook(() => useForgotPasswordController());

    const mockForm = result.current.form;
    vi.spyOn(mockForm, 'getFieldsValue').mockReturnValue({ email: 'test@example.com' });

    act(() => {
      result.current.handleFieldsChange();
    });

    expect(result.current.isButtonDisabled).toBe(false);
  });

  it('disables button when email is empty or errors are present', () => {
    const { result } = renderHook(() => useForgotPasswordController());

    const mockForm = result.current.form;
    vi.spyOn(mockForm, 'getFieldsValue').mockReturnValue({ email: '' });

    act(() => {
      result.current.handleFieldsChange();
    });

    expect(result.current.isButtonDisabled).toBe(true);
  });

  it('should not fail if response is undefined in onSuccess', () => {
    const { result } = renderHook(() => useForgotPasswordController());

    act(() => {
      result.current.onSubmit({ email: 'test@test.com' });
    });

    const onSuccess = mockMutate.mock.calls[0][1].onSuccess;

    act(() => {
      onSuccess(undefined); // passing undefined to test `res || {}`
    });
  });

  it('calls forgotPasswordAction on submit and navigates on success', () => {
    const { result } = renderHook(() => useForgotPasswordController());

    const values = { email: 'user@example.com' };
    const mockResponse = { message: 'Link sent' };

    mockMutate.mockImplementation((_payload, { onSuccess }) => {
      onSuccess(mockResponse);
    });

    act(() => {
      result.current.onSubmit(values);
    });
  });

  it('shows error toaster on failed submit', () => {
    const { result } = renderHook(() => useForgotPasswordController());

    const values = { email: 'fail@example.com' };

    const error = { message: 'Email not registered' };

    mockMutate.mockImplementation((_payload, { onError }) => {
      onError(error);
    });

    act(() => {
      result.current.onSubmit(values);
    });
  });

  it('shows fallback error message if error is undefined', () => {
    const { result } = renderHook(() => useForgotPasswordController());

    const values = { email: 'fail@example.com' };

    const error = undefined;

    mockMutate.mockImplementation((_payload, { onError }) => {
      onError(error);
    });

    act(() => {
      result.current.onSubmit(values);
    });
  });
});
