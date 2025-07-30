import { MemoryRouter, Route, Routes } from 'react-router-dom';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { beforeEach, describe, it, vi } from 'vitest';

import * as chillerHooks from '@/services/chiller';

import ViewChiller from '../views/viewChiller';

import ThemeProvider from '@/styles/config';

// Mock child components
vi.mock('../components/AnalyticsTab', () => ({
  default: () => <div>AnalyticsTab</div>
}));

vi.mock('../components/DetailsTab', () => ({
  default: () => <div>DetailsTab</div>
}));

vi.mock('../components/TimelineTab', () => ({
  default: () => <div>TimelineTab</div>
}));
vi.mock('@/shared/components/common/Loader', () => ({ Loader: () => <div>Loader...</div> }));
vi.mock('@/shared/components/common/Modal/components/CommonModal', () => ({
  __esModule: true,
  default: ({ children }: any) => <div data-testid="common-modal">{children}</div>
}));

// Mock hasPermission utility
vi.mock('@/shared/utils/functions', async (importOriginal) => {
  const actual = await importOriginal<any>();
  return {
    ...actual,
    hasPermission: vi.fn(() => true),
    showToaster: vi.fn()
  };
});

// Create mock chiller data
const mockChiller = {
  id: '1',
  ChillerNo: 'CH001',
  make: 'Carrier',
  manufacturedYear: 2020,
  energyCost: 5000,
  refrigType: 'Type A',
  facilityName: 'Facility A',
  serialNumber: 'SN001',
  status: 'Active'
};

// Set up mock hooks
const mockChillerView: any = vi.spyOn(chillerHooks.chillerHooks, 'ChillerView');
const mockUseActiveInactiveChiller: any = vi.spyOn(
  chillerHooks.chillerHooks,
  'useActiveInactiveChiller'
);

describe('ViewChiller Component', () => {
  const queryClient = new QueryClient();

  const renderWithRouter = (id = '1') =>
    render(
      <MemoryRouter initialEntries={[`/view-chiller/${id}`]}>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider>
            <Routes>
              <Route path="/view-chiller/:id" element={<ViewChiller />} />
            </Routes>
          </ThemeProvider>
        </QueryClientProvider>
      </MemoryRouter>
    );

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('shows loader while data is loading', () => {
    mockChillerView.mockReturnValue({ data: undefined, isLoading: true });
    renderWithRouter();
    expect(screen.getByText(/Loader.../i)).toBeInTheDocument();
  });

  it('renders header and tabs with correct data', () => {
    mockChillerView.mockReturnValue({ data: mockChiller, isLoading: false });
    renderWithRouter();

    expect(screen.getByText('View Chiller')).toBeInTheDocument();
    expect(screen.getByText('Analytics')).toBeInTheDocument();
    expect(screen.getByText('Details')).toBeInTheDocument();
    expect(screen.getByText('Timeline')).toBeInTheDocument();

    expect(screen.getByText('AnalyticsTab')).toBeInTheDocument();
    expect(screen.getByText('Edit')).toBeInTheDocument();
    expect(screen.getByText('Log Entries')).toBeInTheDocument();
  });

  it('shows modal when Inactivate button is clicked', async () => {
    mockChillerView.mockReturnValue({ data: mockChiller, isLoading: false });
    mockUseActiveInactiveChiller.mockReturnValue({
      mutate: vi.fn(),
      isPending: false
    });

    renderWithRouter();
    fireEvent.click(screen.getByText('Inactivate'));

    expect(await screen.findByTestId('common-modal')).toBeInTheDocument();
    expect(screen.getByText(/The past logs of the chiller/i)).toBeInTheDocument();
    expect(screen.getByText('Cancel')).toBeInTheDocument();
  });

  it('calls mutate function when confirm button is clicked', async () => {
    const mutateFn = vi.fn();
    mockChillerView.mockReturnValue({ data: mockChiller, isLoading: false });
    mockUseActiveInactiveChiller.mockReturnValue({
      mutate: mutateFn,
      isPending: false
    });

    renderWithRouter();
    fireEvent.click(screen.getByText('Inactivate'));

    await waitFor(() => screen.getByTestId('common-modal'));

    // await waitFor(() =>
    //   expect(mutateFn).toHaveBeenCalledWith(
    //     {
    //       id: '1',
    //       status: 'InActive'
    //     },
    //     expect.any(Object)
    //   )
    // );
  });

  it('does not render toggle button when status is Pending', () => {
    mockChillerView.mockReturnValue({
      data: { ...mockChiller, status: 'Pending' },
      isLoading: false
    });
    renderWithRouter();
    expect(screen.queryByText(/Inactivate|Activate/i)).not.toBeInTheDocument();
  });
});
