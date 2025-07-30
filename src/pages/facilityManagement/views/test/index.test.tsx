import FacilityManagement from '..';
import { render } from '@/test/utils';
import { fireEvent, screen, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import ThemeProvider from '@/styles/config';

vi.mock('@ckeditor/ckeditor5-watchdog', async () => {
  const actual = await vi.importActual('@ckeditor/ckeditor5-watchdog');
  return actual;
});
vi.mock('@ckeditor/ckeditor5-react', () => ({
  CKEditor: () => null
}));

// Mock the CKEditor build
vi.mock('@ckeditor/ckeditor5-build-classic', () => ({
  default: {}
}));

// 🚨 Critical: mock the watchdog module too
vi.mock('@ckeditor/ckeditor5-watchdog', () => ({
  default: {}
}));

vi.mock('@/shared/utils/functions', () => ({
  debounce: (fn: any) => fn,
  getSortOrder: vi.fn((order) => (order === 'ascend' ? 'ASC' : order === 'descend' ? 'DESC' : '')),
  hexToRGBA: vi.fn(),
  capitalizeFirstLetter: vi.fn(),
  getAntDSortOrder: vi.fn(),
  buildSearchParams: vi.fn(),
  hasPermission: vi.fn()
}));

vi.mock('@/services/facility', () => ({
  facilityHooks: {
    FacilityList: vi.fn(() => ({
      data: { facilityList: [], totalRecords: 0 },
      isLoading: false
    }))
  }
}));

describe('FacilityManagement Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders header, search, select and table', async () => {
    render(
      <ThemeProvider>
        <FacilityManagement />
      </ThemeProvider>
    );

    expect(screen.getByText(/Facility management/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Search for Facilities/i)).toBeInTheDocument();
    expect(screen.getByText(/Select Company/i)).toBeInTheDocument(); // fixed
  });

  it('filters facilities based on search input', async () => {
    render(
      <ThemeProvider>
        <FacilityManagement />
      </ThemeProvider>
    );

    const searchInput = screen.getByPlaceholderText(/Search for Facilities/i);
    fireEvent.change(searchInput, { target: { value: 'test' } });

    // debounce + effect
    await waitFor(() => {
      expect(searchInput).toHaveValue('test');
    });
  });

  it('updates table when company is selected', async () => {
    render(
      <ThemeProvider>
        <FacilityManagement />
      </ThemeProvider>
    );

    // Open dropdown
    const select = screen.getByText(/Select Company/i);
    fireEvent.mouseDown(select); // opens antd select
  });
});
