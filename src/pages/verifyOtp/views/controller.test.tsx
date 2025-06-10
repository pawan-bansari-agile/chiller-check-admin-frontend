import { act, renderHook } from '@testing-library/react';
import { vi } from 'vitest';

import { DEVICE_TYPE } from '@/shared/constants';

import useVerifyOtpController from './controller';

// MOCK: useNavigate
const mockNavigate = vi.fn();
const mockResendMutate = vi.fn();
vi.mock('react-router-dom', () => ({
  ...vi.importActual('react-router-dom'),
  useNavigate: () => mockNavigate,
  useSearchParams: () => [
    {
      get: (key: string) => {
        if (key === 'userId') return 'test-user-id';
        return '';
      }
    }
  ]
}));

// MOCK: authStore
const mockAuthSuccess = vi.fn();
vi.mock('@/store/auth', () => ({
  authStore: () => ({
    actions: {
      authSuccess: mockAuthSuccess
    }
  })
}));

vi.mock('@/shared/utils/functions', () => ({
  ...vi.importActual('@/shared/utils/functions'),
  initializeDeviceId: (id: string, setter: (id: string) => void) => {
    console.log('id: ', id);
    return setter('device-123');
  },
  showToaster: vi.fn()
}));

// MOCK: useVerifyOtp mutation
const mockMutate = vi.fn();
vi.mock('@/services/auth', () => ({
  authHooks: {
    useVerifyOtp: () => ({
      mutate: mockMutate,
      isPending: false
    }),
    useResendOtp: () => ({
      mutate: mockResendMutate
    })
  }
}));

describe('useVerifyOtpController', () => {
  it('returns default values and sets OTP correctly', () => {
    const { result } = renderHook(() => useVerifyOtpController());

    expect(result.current.otp).toBe('');
    act(() => {
      result.current.setOtp('123456');
    });
    expect(result.current.otp).toBe('123456');
  });

  it('calls verifyOtpAction with correct payload and handles success', () => {
    const { result } = renderHook(() => useVerifyOtpController());

    act(() => {
      result.current.setOtp('654321');
    });

    const fakeResponse = {
      data: { token: 'abc123' },
      message: 'Login successful'
    };

    // Simulate onSubmit call
    act(() => {
      result.current.onSubmit();
    });

    // Extract the payload and callbacks from the mutate call
    expect(mockMutate).toHaveBeenCalledWith(
      {
        otp: '654321',
        userId: 'test-user-id',
        deviceId: 'device-123',
        fcmToken: '',
        deviceType: DEVICE_TYPE.WEB
      },
      expect.objectContaining({
        onSuccess: expect.any(Function),
        onError: expect.any(Function)
      })
    );

    // Simulate success response
    const { onSuccess } = mockMutate.mock.calls[0][1];

    act(() => {
      onSuccess(fakeResponse);
    });

    expect(mockAuthSuccess).toHaveBeenCalledWith({ data: fakeResponse.data });
    expect(mockNavigate).toHaveBeenCalledWith('/dashboard');
  });

  it('handles error in onSubmit', () => {
    const { result } = renderHook(() => useVerifyOtpController());

    act(() => {
      result.current.setOtp('654321');
    });

    act(() => {
      result.current.onSubmit();
    });

    const { onError } = mockMutate.mock.calls[0][1];
    act(() => {
      onError({ message: 'Invalid OTP' });
    });
  });

  it('calls resendOtp and handles success', () => {
    const { result } = renderHook(() => useVerifyOtpController());

    const mockResendResponse = {
      message: 'OTP resent successfully'
    };

    act(() => {
      result.current.resendOtp();
    });

    expect(mockResendMutate).toHaveBeenCalledWith(
      { userId: 'test-user-id' },
      expect.objectContaining({
        onSuccess: expect.any(Function),
        onError: expect.any(Function)
      })
    );

    const { onSuccess } = mockResendMutate.mock.calls[0][1];

    act(() => {
      onSuccess(mockResendResponse);
    });
  });

  it('handles error in resendOtp', () => {
    const { result } = renderHook(() => useVerifyOtpController());

    act(() => {
      result.current.resendOtp();
    });

    const { onError } = mockResendMutate.mock.calls[0][1];

    act(() => {
      onError({ message: 'Failed to resend OTP' });
    });
  });
});
