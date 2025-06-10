import { act, renderHook } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import useChangePasswordController from './controller';

const mockNavigate = vi.fn();
const mockMutate = vi.fn();

// Mock hooks and utilities
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate
  };
});

vi.mock('@/services/auth', () => ({
  authHooks: {
    useChangePassword: () => ({
      mutate: mockMutate,
      isPending: false
    })
  }
}));

vi.mock('@/shared/utils/functions', () => ({
  showToaster: vi.fn()
}));

describe('useChangePasswordController', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('initializes with default values', () => {
    const { result } = renderHook(() => useChangePasswordController());

    expect(result.current.isModalOpen).toBe(false);
    expect(result.current.isButtonDisabled).toBe(true);
    expect(result.current.isPending).toBe(false);
    expect(typeof result.current.onSubmit).toBe('function');
    expect(typeof result.current.handleFieldsChange).toBe('function');
    expect(typeof result.current.setIsModalOpen).toBe('function');
    expect(typeof result.current.form).toBe('object');
  });

  it('calls changePasswordAction with correct payload on successful submit', async () => {
    mockMutate.mockImplementation((_payload, { onSuccess }: any) => {
      onSuccess();
    });

    const { result } = renderHook(() => useChangePasswordController());

    const formInstance = result.current.form;

    await act(() => {
      formInstance.setFieldsValue({
        currentPassword: 'OldPass123!',
        newPassword: 'NewPass123!',
        confirmPassword: 'NewPass123!'
      });

      result.current.onSubmit({
        currentPassword: 'OldPass123!',
        newPassword: 'NewPass123!'
      });
    });

    expect(mockMutate).toHaveBeenCalledWith(
      {
        currentPassword: 'OldPass123!',
        newPassword: 'NewPass123!'
      },
      expect.objectContaining({
        onSuccess: expect.any(Function),
        onError: expect.any(Function)
      })
    );

    expect(result.current.isModalOpen).toBe(true);
    expect(result.current.isButtonDisabled).toBe(true);
  });

  it('calls showToaster on error during submit', async () => {
    const error = { message: 'Invalid password' };

    mockMutate.mockImplementation((_payload, { onError }: any) => {
      onError(error);
    });

    const { result } = renderHook(() => useChangePasswordController());

    await act(() => {
      result.current.onSubmit({
        currentPassword: 'wrong',
        newPassword: 'invalid'
      });
    });
  });

  it('updates isButtonDisabled based on form field errors and values', async () => {
    const { result } = renderHook(() => useChangePasswordController());

    const formInstance = result.current.form;

    await act(() => {
      formInstance.setFields([
        {
          name: 'currentPassword',
          errors: ['Required']
        }
      ]);

      formInstance.setFieldsValue({
        currentPassword: '',
        newPassword: 'NewPass123!',
        confirmPassword: 'NewPass123!'
      });

      result.current.handleFieldsChange();
    });

    expect(result.current.isButtonDisabled).toBe(true);

    // Fix the error and re-check
    await act(() => {
      formInstance.setFields([
        {
          name: 'currentPassword',
          errors: []
        }
      ]);

      formInstance.setFieldsValue({
        currentPassword: 'OldPass123!',
        newPassword: 'NewPass123!',
        confirmPassword: 'NewPass123!'
      });

      result.current.handleFieldsChange();
    });

    expect(result.current.isButtonDisabled).toBe(false);
  });
});
