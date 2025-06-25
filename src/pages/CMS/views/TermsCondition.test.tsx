import { render } from '@/test/utils';
import { screen, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

// Update path accordingly
import { cmsHooks } from '@/services/cms';

import { authStore } from '@/store/auth';

import { USER_ROLES } from '@/shared/constants';
import { ROUTES } from '@/shared/constants/routes';

import TermsCondition from './TermsCondition';

import ThemeProvider from '@/styles/config';

const mockNavigate = vi.fn();

// Mock the CMS hook
vi.mock('@/services/cms', () => ({
  cmsHooks: {
    useCmsList: vi.fn()
  }
}));

// Mock the auth store
vi.mock('@/store/auth', async () => {
  const actual = await vi.importActual<typeof import('@/store/auth')>('@/store/auth');
  return {
    ...actual,
    authStore: vi.fn()
  };
});

// Mock navigate from react-router
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => vi.fn()
  };
});

vi.mock('@/shared/components/common/Loader', () => ({
  Loader: () => <div data-testid="loader">Mocked Loader</div>
}));

describe('Terms Condition component', () => {
  const mockDescription = '<p>This is the terms condition</p>';

  beforeEach(() => {
    // Set default return values
    (cmsHooks.useCmsList as any).mockReturnValue({
      data: { description: mockDescription },
      isLoading: false
    });

    (authStore as any).mockReturnValue({
      userData: { role: USER_ROLES.ADMIN }
    });
    vi.clearAllMocks();
  });

  it('renders the title and content', async () => {
    render(
      <ThemeProvider>
        <TermsCondition />
      </ThemeProvider>
    );

    expect(screen.getByText('Terms & Conditions')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /edit/i })).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.getByText('This is the terms condition')).toBeInTheDocument();
    });
  });

  it('shows loader when loading', () => {
    (cmsHooks.useCmsList as any).mockReturnValue({
      data: null,
      isLoading: true
    });

    render(
      <ThemeProvider>
        <TermsCondition />
      </ThemeProvider>
    );
    expect(screen.getByTestId('loader')).toBeInTheDocument(); // Ensure your Loader has `data-testid="loader"`
  });

  it('does not show Edit button for non-admin users', () => {
    (authStore as any).mockReturnValue({
      userData: { role: 'USER' } // 👈 force a non-admin role
    });

    render(
      <ThemeProvider>
        <TermsCondition />
      </ThemeProvider>
    );

    expect(screen.getByText('Terms & Conditions')).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /edit/i })).toBeNull();
  });

  it('navigates to edit page when Edit button is clicked by admin', async () => {
    (authStore as any).mockReturnValue({
      userData: { role: 'admin' }
    });

    (cmsHooks.useCmsList as any).mockReturnValue({
      data: { description: '<p>Test terms</p>' },
      isLoading: false
    });

    render(
      <ThemeProvider>
        <TermsCondition />
      </ThemeProvider>
    );

    const editButton = await screen.findByRole('button', { name: /edit/i });
    editButton.click();
    waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith(ROUTES.EDIT_TERMS_CONDITION);
    });
  });
});
