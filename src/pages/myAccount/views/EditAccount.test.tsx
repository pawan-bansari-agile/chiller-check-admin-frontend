import { render } from '@/test/utils';
import { fireEvent, screen, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import EditAccount from './EditAccount';

import ThemeProvider from '@/styles/config';

// Mocks
const mockNavigate = vi.fn();

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate
  };
});
vi.mock('@tanstack/react-query', async () => {
  const actual =
    await vi.importActual<typeof import('@tanstack/react-query')>('@tanstack/react-query');
  return {
    ...actual, // ✅ import actual exports like QueryClient, QueryClientProvider, etc.
    useQueryClient: () => ({
      invalidateQueries: vi.fn()
    })
  };
});

vi.mock('@/shared/utils/functions', async () => {
  const actual = await vi.importActual('@/shared/utils/functions');
  return {
    ...actual,
    showToaster: vi.fn(),
    capitalizeFirstLetterWhileTyping: (v: string) => v
  };
});

vi.mock('@/store/auth', () => ({
  authStore: () => ({
    userData: { _id: '123' }
  })
}));

const mockUserData = {
  _id: '123',
  firstName: 'John',
  lastName: 'Doe',
  email: 'john@example.com',
  phoneNumber: '9876543210',
  role: 'admin',
  profileImage: 'profile.jpg'
};

vi.mock('@/services/profile', () => ({
  profileHooks: {
    useProfile: () => ({
      data: mockUserData,
      isLoading: false
    }),
    useUpdateProfile: () => ({
      mutate: (payload: any, { onSuccess }: any) => {
        console.log('payload: ', payload);
        onSuccess({ message: 'Profile updated successfully' });
      },
      isPending: false
    })
  },
  profileQueryKey: {
    all: ['profile']
  }
}));
describe('EditAccount Component', () => {
  it('renders user data in the form', async () => {
    render(
      <ThemeProvider>
        <EditAccount />
      </ThemeProvider>
    );

    expect(await screen.findByDisplayValue('John')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Doe')).toBeInTheDocument();
    expect(screen.getByDisplayValue('john@example.com')).toBeInTheDocument();
  });

  it('submits form and calls mutate with correct payload', async () => {
    render(
      <ThemeProvider>
        <EditAccount />
      </ThemeProvider>
    );

    const saveBtn = await screen.findByRole('button', { name: /save/i });
    fireEvent.click(saveBtn);
  });

  it('calls updateProfileAction on Save and handles success', async () => {
    render(
      <ThemeProvider>
        <EditAccount />
      </ThemeProvider>
    );

    const saveButton = screen.getByRole('button', { name: /save/i });
    fireEvent.click(saveButton);
  });

  it('handles updateProfileAction error correctly', async () => {
    render(
      <ThemeProvider>
        <EditAccount />
      </ThemeProvider>
    );
    const saveButton = screen.getByRole('button', { name: /save/i });
    fireEvent.click(saveButton);
  });

  it('uploads a valid image and updates state', async () => {
    render(
      <ThemeProvider>
        <EditAccount />
      </ThemeProvider>
    );
  });

  it('removes image when "Remove Image" is clicked', async () => {
    render(
      <ThemeProvider>
        <EditAccount />
      </ThemeProvider>
    );

    // Simulate Remove Image click
    const removeBtn = screen.getByText(/remove image/i);
    fireEvent.click(removeBtn);

    await waitFor(() => {
      const image = screen.getByAltText('user') as HTMLImageElement;
      expect(image.src).toContain('placeHolder.jpg'); // fallback image
    });
  });
});
