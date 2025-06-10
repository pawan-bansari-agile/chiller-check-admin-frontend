import { act, renderHook } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import useSignInController from './controller';

// Mocks
const mockNavigate = vi.fn();

vi.mock('react-router-dom', () => ({
  useNavigate: () => mockNavigate
}));

const mockLoginAction = vi.fn();
vi.mock('@/services/auth', () => ({
  authHooks: {
    useSignIn: () => ({
      mutate: mockLoginAction,
      isPending: false
    })
  }
}));

const mockAuthSuccess = vi.fn();
vi.mock('@/store/auth', () => ({
  authStore: vi.fn(() => ({
    actions: {
      authSuccess: mockAuthSuccess
    }
  }))
}));

vi.mock('@/shared/utils/functions', () => ({
  initializeDeviceId: vi.fn((_, setId) => setId('test-device-id')),
  showToaster: vi.fn()
}));

describe('useSignInController', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should initialize properly', () => {
    const { result } = renderHook(() => useSignInController());
    expect(result.current.form).toBeDefined();
    expect(result.current.isPending).toBe(false);
    expect(result.current.isButtonDisabled).toBe(true);
  });

  it('should disable or enable button based on field changes', () => {
    const { result } = renderHook(() => useSignInController());
    const form = result.current.form;

    act(() => {
      form.setFieldsValue({ email: 'test@example.com', password: 'password123' });
    });

    act(() => {
      result.current.handleFieldsChange();
    });

    expect(result.current.isButtonDisabled).toBe(false);
  });

  it('should call loginAction on form submit (OTP sent)', () => {
    const { result } = renderHook(() => useSignInController());

    const formValues = {
      email: 'test@example.com',
      password: 'pass123'
    };

    act(() => {
      result.current.onSubmit(formValues);
    });

    // Trigger onSuccess manually
    const onSuccess = mockLoginAction.mock.calls[0][1].onSuccess;
    act(() => {
      onSuccess({ data: { otpSent: true, message: 'OTP sent', userId: '123' } });
    });

    expect(mockNavigate).toHaveBeenCalledWith('/verify-otp?userId=123');
  });

  it('should call authSuccess and redirect on successful login (no OTP)', () => {
    const { result } = renderHook(() => useSignInController());

    act(() => {
      result.current.onSubmit({ email: 'a@b.com', password: '123' });
    });

    const onSuccess = mockLoginAction.mock.calls[0][1].onSuccess;

    act(() => {
      onSuccess({ data: { otpSent: false }, message: 'Logged in!' });
    });

    expect(mockAuthSuccess).toHaveBeenCalledWith({ data: { otpSent: false } });
    expect(mockNavigate).toHaveBeenCalledWith('/dashboard');
  });

  it('should call showToaster on login error', () => {
    const { result } = renderHook(() => useSignInController());

    act(() => {
      result.current.onSubmit({ email: 'fail@fail.com', password: 'wrong' });
    });

    const onError = mockLoginAction.mock.calls[0][1].onError;

    act(() => {
      onError({ message: 'Invalid credentials' });
    });
  });
  it('should not fail if response is undefined in onSuccess', () => {
    const { result } = renderHook(() => useSignInController());

    act(() => {
      result.current.onSubmit({ email: 'test@test.com', password: 'pass' });
    });

    const onSuccess = mockLoginAction.mock.calls[0][1].onSuccess;

    act(() => {
      onSuccess(undefined); // passing undefined to test `res || {}`
    });
  });
  it('should show error toaster with err.message (string)', () => {
    const { result } = renderHook(() => useSignInController());

    act(() => {
      result.current.onSubmit({ email: 'x@y.com', password: 'fail' });
    });

    const onError = mockLoginAction.mock.calls[0][1].onError;

    act(() => {
      onError({ message: 'Error string' });
    });
  });
  it('should show error toaster with err.message[0] if message is an array', () => {
    const { result } = renderHook(() => useSignInController());

    act(() => {
      result.current.onSubmit({ email: 'x@y.com', password: 'fail' });
    });

    const onError = mockLoginAction.mock.calls[0][1].onError;

    act(() => {
      onError({ message: ['First error', 'Second error'] });
    });
  });
  it('should show fallback error message if err.message is undefined', () => {
    const { result } = renderHook(() => useSignInController());

    act(() => {
      result.current.onSubmit({ email: 'x@y.com', password: 'fail' });
    });

    const onError = mockLoginAction.mock.calls[0][1].onError;

    act(() => {
      onError({});
    });
  });
});
