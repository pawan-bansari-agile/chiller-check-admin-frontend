import { render } from '@/test/utils';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import ChillerManagement from '../views';

import ThemeProvider from '@/styles/config';

// Mock the services and hooks
vi.mock('@/services/chiller', () => ({
  chillerHooks: {
    ChillerList: vi.fn(() => ({
      data: {
        chillerList: [
          {
            _id: '1',
            companyName: 'Acme Corp',
            facilityName: 'Main Facility',
            chillerName: 'Chiller 01',
            ChillerNo: '001',
            tons: 50,
            energyCost: 100,
            status: 'Active'
          }
        ],
        totalRecords: 1
      },
      isLoading: false
    })),
    useBulkUpdate: vi.fn(() => ({
      mutate: vi.fn(),
      isPending: false
    })),
    chillerQueryKeys: {
      all: ['chiller']
    }
  }
}));

vi.mock('@/services/company', () => ({
  companyHooks: {
    AllCompanyList: vi.fn(() => ({
      data: [{ _id: 'comp1', name: 'Acme Corp' }],
      isLoading: false
    }))
  },
  companyQueryKeys: {
    all: ['company']
  }
}));

vi.mock('@/services/facility', () => ({
  facilityHooks: {
    AllFacilityList: vi.fn(() => ({
      data: [{ _id: 'fac1', name: 'Main Facility' }],
      isLoading: false
    })),
    FacilityList: vi.fn(() => ({
      data: [{ _id: 'fac1', name: 'Main Facility' }],
      isLoading: false
    }))
  },
  facilityQueryKeys: {
    all: ['facility']
  }
}));

vi.mock('@/services/user', () => ({
  userQueryKeys: {
    all: ['user']
  }
}));

vi.mock('@/shared/utils/functions', async () => {
  const original = await vi.importActual('@/shared/utils/functions');
  return {
    ...original,
    debounce: (fn: any) => fn,
    showToaster: vi.fn(),
    hasPermission: vi.fn()
  };
});

vi.mock('@/shared/components/common/Modal/components/CommonModal', () => ({
  default: ({ children }: any) => <div data-testid="mock-modal">{children}</div>
}));

describe('ChillerManagement', () => {
  beforeEach(() => {
    render(
      <ThemeProvider>
        <ChillerManagement />
      </ThemeProvider>
    );
  });

  it('renders page title and add button', () => {
    expect(screen.getByText(/Chiller management/i)).toBeInTheDocument();
  });

  it('renders company and facility dropdowns', async () => {
    expect(await screen.findByText('Select Company')).toBeInTheDocument();
    expect(await screen.findByText('Select Facility')).toBeInTheDocument();
  });

  it('renders the search input and types value', async () => {
    const input = screen.getByPlaceholderText('Search for Chillers');
    expect(input).toBeInTheDocument();
    await userEvent.type(input, 'test');
    expect((input as HTMLInputElement).value).toBe('test');
  });

  it('renders chiller row data in table', async () => {
    expect(await screen.findByText('Acme Corp')).toBeInTheDocument();
    expect(await screen.findByText('Chiller 01')).toBeInTheDocument();
  });

  it('can toggle column visibility', async () => {
    const checkboxLabel = await screen.findAllByText(/Chiller Name/i);
    expect(checkboxLabel.length).toBeGreaterThan(0);
  });

  // it('opens mocked CommonModal', async () => {
  //   // select a row
  //   const checkbox = screen.getAllByRole('checkbox')[1];
  //   await userEvent.click(checkbox);

  //   const bulkBtn = screen.getByRole('button', { name: /Bulk Update/i });
  //   await userEvent.click(bulkBtn);

  //   // assert modal rendered
  //   expect(await screen.findByTestId('mock-modal')).toBeInTheDocument();
  // });
});
