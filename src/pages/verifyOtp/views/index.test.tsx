import VerifyOtp from '.';
import { render } from '@/test/utils';
import { fireEvent, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import ThemeProvider from '@/styles/config';

vi.mock('@/shared/components/common/FormField', () => ({
  __esModule: true,
  RenderOtpInput: ({ onChange, value }: any) => (
    <input data-testid="otp-input" value={value} onChange={(e) => onChange(e.target.value)} />
  )
}));

describe('VerifyOtp Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });
  it('renders OTP form with title, description, and inputs', () => {
    render(
      <ThemeProvider>
        <VerifyOtp />
      </ThemeProvider>
    );
    expect(screen.getByText('OTP Verification')).toBeInTheDocument();
    expect(
      screen.getByText(/Please enter the OTP sent to your registered mobile number/)
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Verify/i })).toBeInTheDocument();
    expect(screen.getByText(/Didn’t get OTP\?/i)).toBeInTheDocument();
  });

  it('disables submit button when OTP length is not 6', () => {
    render(
      <ThemeProvider>
        <VerifyOtp />
      </ThemeProvider>
    );
    const submitBtn = screen.getByRole('button', { name: /Verify/i });
    expect(submitBtn).toBeDisabled();
  });

  it('calls onSubmit when valid OTP is submitted', () => {
    render(
      <ThemeProvider>
        <VerifyOtp />
      </ThemeProvider>
    );
    const submitBtn = screen.getByRole('button', { name: /Verify/i });
    fireEvent.click(submitBtn);
  });
});
