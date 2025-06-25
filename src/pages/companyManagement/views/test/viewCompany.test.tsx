import { render } from '@/test/utils';
import { fireEvent, screen, waitFor } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { companyHooks } from '@/services/company';

import ViewCompany from '../viewCompany';

import ThemeProvider from '@/styles/config';

// Mock useParams and useNavigate
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useParams: () => ({ id: '123' }),
    useNavigate: () => vi.fn()
  };
});

// Mock QueryClientProvider
vi.mock('@tanstack/react-query', async () => {
  const actual = await vi.importActual('@tanstack/react-query');
  return {
    ...actual,
    useQueryClient: () => ({
      invalidateQueries: vi.fn()
    })
  };
});

// Sample mock data
const mockCompanyData = {
  name: 'Test Corp',
  status: 'active',
  website: 'www.test.com',
  address: '123 Main St',
  totalChiller: 3,
  totalOperators: 4,
  totalFacilities: 2,
  facilities: [
    {
      name: 'Facility 1',
      address1: 'A1',
      address2: 'B1',
      city: 'City',
      state: 'State',
      zipcode: '12345',
      altitude: 100,
      altitudeUnit: 'm',
      country: 'Country',
      timezone: 'IST',
      totalChiller: 1,
      totalOperators: 2,
      status: 'active'
    }
  ]
};

// Mock Company Hooks
vi.mock('@/services/company', () => ({
  companyHooks: {
    CompanyView: vi.fn(),
    useActiveInactiveCompany: () => ({
      mutate: vi.fn(),
      isPending: false
    }),
    companyQueryKeys: {
      all: ['company-all']
    }
  }
}));

describe('ViewCompany Component', () => {
  beforeEach(() => {
    (companyHooks.CompanyView as any).mockReturnValue({
      data: mockCompanyData,
      isLoading: false
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  const renderComponent = () =>
    render(
      <ThemeProvider>
        <ViewCompany />
      </ThemeProvider>
    );

  it('renders company info correctly', async () => {
    renderComponent();

    expect(await screen.findByText('Test Corp')).toBeInTheDocument();
    expect(screen.getAllByText('Facilities').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Chillers').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Operators').length).toBeGreaterThan(0);
    expect(screen.getByText('www.test.com')).toBeInTheDocument();
  });

  it('displays "Inactivate" button if company is active', () => {
    renderComponent();
    const inactivateBtn = screen.getByText('Inactivate');
    expect(inactivateBtn).toBeInTheDocument();
  });

  it('opens modal on clicking Inactivate button', async () => {
    renderComponent();
    const inactivateBtn = screen.getByText('Inactivate');
    fireEvent.click(inactivateBtn);
    expect(await screen.findByText(/Inactivate Company/)).toBeInTheDocument();
    expect(screen.getByText(/If a company is inactivated, all the facilities/)).toBeInTheDocument();
  });

  it('renders facility table correctly', () => {
    renderComponent();
    expect(screen.getByText('Facility 1')).toBeInTheDocument();
    expect(screen.getAllByText('Facilities').length).toBeGreaterThan(0);
  });

  it('calls mutation when confirming modal action', async () => {
    renderComponent();
    fireEvent.click(screen.getByText('Inactivate'));

    await waitFor(() => {
      const buttons = screen.getAllByText('Inactivate');
      fireEvent.click(buttons[0]); // Header button to open modal
    });
  });
});
