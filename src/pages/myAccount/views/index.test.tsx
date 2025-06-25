import MyAccount from '.';
import { render } from '@/test/utils';
import { fireEvent, screen } from '@testing-library/react';
import { vi } from 'vitest';

import ThemeProvider from '@/styles/config';

// Mock hooks and data
const mockNavigate = vi.fn();

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate
  };
});

const mockUser = {
  _id: '123',
  firstName: 'john',
  lastName: 'doe',
  email: 'john@example.com',
  role: 'admin',
  phoneNumber: '9876543210',
  lastLoginTime: '2024-06-01T12:00:00Z',
  isActive: true,
  profileImage: 'profile.jpg'
};

vi.mock('@/services/profile', () => ({
  profileHooks: {
    useProfile: () => ({
      data: mockUser,
      isLoading: false
    })
  }
}));

vi.mock('@/store/auth', () => ({
  authStore: () => ({
    userData: { _id: '123' }
  })
}));

describe('MyAccount Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should show loader while loading', () => {
    render(
      <ThemeProvider>
        <MyAccount />
      </ThemeProvider>
    );
  });

  it('should render user details correctly', async () => {
    render(
      <ThemeProvider>
        <MyAccount />
      </ThemeProvider>
    );

    expect(await screen.findByText('User Details')).toBeInTheDocument();
  });

  it('should navigate to edit and change password pages', async () => {
    render(
      <ThemeProvider>
        <MyAccount />
      </ThemeProvider>
    );

    fireEvent.click(screen.getByText('Change Password'));
    expect(mockNavigate).toHaveBeenCalledWith('/change-password');

    fireEvent.click(screen.getByRole('button', { name: 'Edit' }));
    expect(mockNavigate).toHaveBeenCalledWith('/my-profile/edit');
  });
});
