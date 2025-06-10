import Header from '.';
import { render } from '@/test/utils';
import { screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

// Mocks
vi.mock('@/services/auth', () => ({
  authApi: {
    logout: vi.fn(() => Promise.resolve({ message: 'Logged out successfully' }))
  }
}));

vi.mock('@/store/auth', () => ({
  authStore: () => ({
    actions: { authFail: vi.fn() }
  })
}));

vi.mock('@/shared/utils/functions', () => ({
  showToaster: vi.fn(),
  toAbsoluteUrl: (path: string) => path
}));

vi.mock('@/shared/constants/routes', () => ({
  ROUTES: {
    MY_ACCOUNT: '/my-account',
    CHANGE_PASSWORD: '/change-password'
  }
}));

vi.mock('@/shared/components/common/Modal/components/ConfirmModal', () => {
  return {
    default: ({ buttonProps, modalProps }: any) => (
      <button onClick={() => modalProps.onOk()}>{buttonProps.children}</button>
    )
  };
});

const renderHeader = () => render(<Header />);

describe('Header component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders the logo', () => {
    renderHeader();
    const logo = screen.getByAltText('header-logo');
    expect(logo).toBeInTheDocument();
  });
});
