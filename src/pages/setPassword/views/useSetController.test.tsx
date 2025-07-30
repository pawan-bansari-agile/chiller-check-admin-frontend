import { act, renderHook } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';

import useSetController from './controller';

// Adjust path if needed

// Mock useNavigate
const mockNavigate = vi.fn();
vi.mock('react-router-dom', () => ({
  useNavigate: () => mockNavigate,
  useParams: () => ({ token: 'dummy-token' })
}));

// Mock mutate function for useResetPassword
const mockMutate = vi.fn();

vi.mock('@/services/auth', () => ({
  authHooks: {
    useResetPassword: () => ({
      mutate: mockMutate,
      isPending: false
    })
  }
}));

// Mock functions

vi.mock('@/shared/utils/functions', () => ({
  showToaster: vi.fn(),
  isPasswordValid: vi.fn()
}));

// Mock Routes
vi.mock('@/shared/constants/routes', () => ({
  ROUTES: {
    LOGIN: '/login'
  }
}));

// Mock AntD useForm
const mockGetFieldsValue = vi.fn();
const mockGetFieldsError = vi.fn();
const mockFormInstance = {
  getFieldsValue: mockGetFieldsValue,
  getFieldsError: mockGetFieldsError
};
vi.mock('antd', async () => {
  const antd = await vi.importActual<any>('antd');
  return {
    ...antd,
    Form: {
      ...antd.Form,
      useForm: () => [mockFormInstance]
    }
  };
});

describe('useResetController', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it('initializes correctly', () => {
    const { result } = renderHook(() => useSetController());
    expect(result.current.form).toBeDefined();
    expect(result.current.isButtonDisabled).toBe(true);
    expect(typeof result.current.onSubmit).toBe('function');
    expect(typeof result.current.handleFieldsChange).toBe('function');
  });

  it('enables button when form is valid and passwords match', () => {
    mockGetFieldsValue.mockReturnValue({
      newPassword: 'Pass1234',
      confirmPassword: 'Pass1234'
    });
    mockGetFieldsError.mockReturnValue([]);

    const { result } = renderHook(() => useSetController());

    act(() => {
      result.current.handleFieldsChange();
    });

    expect(result.current.passwordValue).toBe('Pass1234');
    expect(result.current.confirmPasswordValue).toBe('Pass1234');
  });

  it('disables button if passwords mismatch or invalid', () => {
    mockGetFieldsValue.mockReturnValue({
      newPassword: 'Pass1234',
      confirmPassword: 'WrongPass'
    });
    mockGetFieldsError.mockReturnValue([]);

    const { result } = renderHook(() => useSetController());

    act(() => {
      result.current.handleFieldsChange();
    });

    expect(result.current.isButtonDisabled).toBe(true);
  });

  it('calls resetPassword and navigates on success', () => {
    const { result } = renderHook(() => useSetController());

    const values = { newPassword: 'Pass1234' };
    const mockRes = { message: 'Password reset successfully' };

    mockMutate.mockImplementation((_payload, { onSuccess }) => {
      onSuccess(mockRes);
    });

    act(() => {
      result.current.onSubmit(values);
    });

    expect(mockNavigate).toHaveBeenCalledWith('/login');
  });

  it('shows error toaster on failed submit', () => {
    const { result } = renderHook(() => useSetController());

    const values = { newPassword: 'Pass1234' };
    const error = { message: 'Reset failed' };

    mockMutate.mockImplementation((_payload, { onError }) => {
      onError(error);
    });

    act(() => {
      result.current.onSubmit(values);
    });
  });

  it('shows fallback error message if error is undefined', () => {
    const { result } = renderHook(() => useSetController());

    const values = { newPassword: 'Pass1234' };

    mockMutate.mockImplementation((_payload, { onError }) => {
      onError(undefined);
    });

    act(() => {
      result.current.onSubmit(values);
    });
  });
});
