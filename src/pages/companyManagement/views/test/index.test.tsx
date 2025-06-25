import CompanyManagement from '..';
import { render } from '@/test/utils';
import { fireEvent, screen } from '@testing-library/react';
import { vi } from 'vitest';

import ThemeProvider from '@/styles/config';

vi.mock('@/shared/utils/functions', () => ({
  debounce: (fn: any) => fn,
  getSortOrder: vi.fn((order) => (order === 'ascend' ? 'ASC' : order === 'descend' ? 'DESC' : '')),
  hexToRGBA: vi.fn(),
  capitalizeFirstLetter: vi.fn(),
  getAntDSortOrder: vi.fn(),
  buildSearchParams: vi.fn()
}));

vi.mock('@/services/company', () => ({
  companyHooks: {
    CompanyList: vi.fn(() => ({
      data: { companyList: [], totalRecords: 0 },
      isLoading: false
    }))
  }
}));

describe('CompanyManagement Page', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders CompanyManagement and company data', async () => {
    render(
      <ThemeProvider>
        <CompanyManagement />
      </ThemeProvider>
    );

    // Title check
    expect(await screen.findByText(/Company management/i)).toBeInTheDocument();

    // Data check
  });

  it('shows empty state when no companies found', async () => {
    render(
      <ThemeProvider>
        <CompanyManagement />
      </ThemeProvider>
    );
    screen.findByText((content) => content.includes('No Company Found'));
  });

  it('handles search input', async () => {
    render(
      <ThemeProvider>
        <CompanyManagement />
      </ThemeProvider>
    );
    const searchInput = screen.getByPlaceholderText('Search for Company');
    fireEvent.change(searchInput, { target: { value: 'abc corp' } });
  });

  it('displays Add Company button', () => {
    render(
      <ThemeProvider>
        <CompanyManagement />
      </ThemeProvider>
    );
    const addBtn = screen.getByText(/Add Company/i);
    expect(addBtn).toBeInTheDocument();
  });
});
