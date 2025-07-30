// src/pages/companyManagement/test/ViewCompany.test.tsx
import { MemoryRouter, Route, Routes } from 'react-router-dom';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { companyHooks } from '@/services/company';

import ViewCompany from '../viewCompany';

import ThemeProvider from '@/styles/config';

vi.mock('@/services/company', () => ({
  companyHooks: {
    CompanyView: vi.fn(),
    useActiveInactiveCompany: () => ({
      mutate: vi.fn(),
      isPending: false
    })
  }
}));

vi.mock('@/store/auth', () => ({
  authStore: () => ({
    userData: { role: 'admin' }
  })
}));

vi.mock('@/shared/utils/functions', async (importOriginal) => {
  const original: any = await importOriginal();
  return {
    ...original,
    hasPermission: () => true,
    showToaster: vi.fn()
  };
});

vi.mock('@/shared/components/common/Loader', () => ({
  Loader: () => <div data-testid="loader">Mocked Loader</div>
}));

const mockCompanyData = {
  name: 'Test Company',
  status: 'active',
  website: 'testcompany.com',
  totalFacilities: 2,
  totalChiller: 5,
  totalOperators: 3,
  address: '123 Main St',
  facilities: [],
  chillers: []
};

const queryClient = new QueryClient();

describe('ViewCompany Component', () => {
  beforeEach(() => {
    (companyHooks.CompanyView as any).mockReturnValue({
      data: mockCompanyData,
      isLoading: false
    });
  });

  const renderComponent = () =>
    render(
      <MemoryRouter initialEntries={[`/company-management/view/123`]}>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider>
            <Routes>
              <Route path="/company-management/view/:id" element={<ViewCompany />} />
            </Routes>
          </ThemeProvider>
        </QueryClientProvider>
      </MemoryRouter>
    );

  it('renders company details correctly', async () => {
    renderComponent();
    expect(screen.getByText('View Company')).toBeInTheDocument();
    expect(screen.getByText('Test Company')).toBeInTheDocument();
    expect(screen.getByText('123 Main St')).toBeInTheDocument();
    expect(screen.getAllByText('Facilities')).toHaveLength(2);
    expect(screen.getAllByText('Chillers')).toHaveLength(2);
  });

  it('opens and closes modal on button click', async () => {
    renderComponent();

    const toggleButton = screen.getByText('Inactivate');
    fireEvent.click(toggleButton);

    expect(screen.getByText('Inactivate Company', { exact: false })).toBeInTheDocument();

    const cancelButton = screen.getByText('Cancel');
    fireEvent.click(cancelButton);

    await waitFor(() => {
      expect(screen.queryByText('Inactivate Company', { exact: false })).not.toBeInTheDocument();
    });
  });

  it('shows loader when loading', () => {
    (companyHooks.CompanyView as any).mockReturnValue({
      data: undefined,
      isLoading: true
    });

    renderComponent();

    expect(screen.getByTestId('loader')).toBeInTheDocument();
  });
});
